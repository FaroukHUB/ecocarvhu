"use client";

import { useEffect } from "react";
import { droneHero, type DroneFormat } from "@/config/drone-hero";

/**
 * Anime le hero « vol de drone » : charge la séquence d'images adaptée à
 * l'écran (paysage ou portrait) puis, au défilement, dessine l'image
 * correspondante dans le <canvas> et fait apparaître les textes.
 *
 * Ne fait rien (le hero reste une image fixe) si l'utilisateur a demandé
 * moins d'animations, a activé l'économie de données ou a une connexion lente.
 * Le chargement démarre après le premier affichage pour ne pas retarder la page.
 */

type NetworkInfo = { saveData?: boolean; effectiveType?: string };

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const pad = (i: number) => String(i).padStart(3, "0");

/** Ordre de chargement : quelques images réparties d'abord, puis les autres. */
function loadOrder(n: number): number[] {
  const order: number[] = [];
  const seen = new Set<number>();
  for (let step = 16; step >= 1; step = step >> 1) {
    for (let i = 0; i < n; i += step) {
      if (!seen.has(i)) {
        seen.add(i);
        order.push(i);
      }
    }
  }
  if (!seen.has(n - 1)) order.push(n - 1);
  return order;
}

export function DroneSequence() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>("[data-drone-hero]");
    const canvas = section?.querySelector<HTMLCanvasElement>("[data-drone-canvas]");
    const ctx = canvas?.getContext("2d");
    const stage = section?.querySelector<HTMLElement>(".drone-stage");
    if (!section || !canvas || !ctx || !stage) return;

    const net = (navigator as Navigator & { connection?: NetworkInfo }).connection;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const slow = net?.saveData || ["slow-2g", "2g", "3g"].includes(net?.effectiveType ?? "");
    if (reduced || slow) return;

    const q = <T extends Element>(sel: string) => section.querySelector<T>(sel);
    const open = q<HTMLElement>("[data-drone-open]");
    const land = q<HTMLElement>("[data-drone-land]");
    const scrim = q<HTMLElement>("[data-drone-scrim]");
    const shade = q<HTMLElement>("[data-drone-shade]");
    const beatScrim = q<HTMLElement>("[data-drone-beat-scrim]");
    const cue = q<HTMLElement>("[data-drone-cue]");
    const altValue = q<HTMLElement>("[data-drone-alt-value]");
    const altDot = q<HTMLElement>("[data-drone-alt-dot]");
    const altBox = q<HTMLElement>("[data-drone-alt]");
    const beats = Array.from(section.querySelectorAll<HTMLElement>("[data-drone-beat]"));

    let format: DroneFormat = "desktop";
    let images: (HTMLImageElement | undefined)[] = [];
    let generation = 0;
    let shown = -1;
    let smooth = 0;
    let raf = 0;
    let visible = true;
    let landed = false;

    const pickFormat = (): DroneFormat =>
      window.matchMedia("(orientation: portrait)").matches ? "mobile" : "desktop";

    function load(fmt: DroneFormat) {
      const gen = ++generation;
      const cfg = droneHero[fmt];
      format = fmt;
      images = new Array(cfg.frames);
      shown = -1;
      canvas!.classList.remove("is-ready");
      const queue = loadOrder(cfg.frames);
      let next = 0;
      const worker = async () => {
        while (next < queue.length && gen === generation) {
          const i = queue[next++];
          const img = new Image();
          img.decoding = "async";
          img.src = `${cfg.dir}/${pad(i)}.webp`;
          try {
            await img.decode();
          } catch {
            continue;
          }
          if (gen !== generation) return;
          images[i] = img;
          if (i === 0) {
            draw(true);
            canvas!.classList.add("is-ready");
          }
        }
      };
      for (let k = 0; k < 4; k++) void worker();
    }

    /** Image chargée la plus proche de l'index demandé. */
    function nearest(i: number): number {
      for (let d = 0; d < images.length; d++) {
        if (images[i - d]) return i - d;
        if (images[i + d]) return i + d;
      }
      return -1;
    }

    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas!.getBoundingClientRect();
      canvas!.width = Math.min(Math.round(r.width * dpr), 2048);
      canvas!.height = Math.min(Math.round(r.height * dpr), 2048);
      draw(true);
    }

    function cover(img: HTMLImageElement, alpha: number) {
      const cfg = droneHero[format];
      const W = canvas!.width;
      const H = canvas!.height;
      const s = Math.max(W / cfg.width, H / cfg.height) * (1 + 0.05 * (1 - smooth));
      const w = cfg.width * s;
      const h = cfg.height * s;
      ctx!.globalAlpha = alpha;
      ctx!.drawImage(img, (W - w) / 2, (H - h) / 2, w, h);
      ctx!.globalAlpha = 1;
    }

    function draw(force = false) {
      const n = images.length;
      if (!n) return;
      const t = smooth * (n - 1);
      const a = nearest(Math.floor(t));
      if (a < 0) return;
      const key = Math.round(t * 20);
      if (!force && key === shown) return;
      shown = key;
      cover(images[a]!, 1);
      // Fondu vers l'image suivante : mouvement fluide avec une image sur deux.
      const b = Math.floor(t) + 1;
      const frac = t - Math.floor(t);
      if (a === Math.floor(t) && images[b] && frac > 0.02) cover(images[b]!, frac);
    }

    function progress() {
      // La scène est collée sous l'en-tête (4.5rem) : la piste se parcourt
      // entre « haut de section sous l'en-tête » et « bas de scène en bas d'écran ».
      const header = parseFloat(getComputedStyle(stage!).top) || 0;
      const r = section!.getBoundingClientRect();
      const run = section!.offsetHeight - stage!.offsetHeight;
      return clamp((header - r.top) / Math.max(run, 1));
    }

    function frame() {
      raf = 0;
      const p = progress();
      const target = seg(p, 0, 0.8);
      smooth += (target - smooth) * 0.14;
      if (Math.abs(target - smooth) < 0.0005) smooth = target;
      draw();

      const out = seg(p, 0.02, 0.12);
      if (open) {
        open.style.opacity = String(1 - out);
        open.style.transform = `translateY(${-out * 40}px)`;
        open.style.visibility = out >= 1 ? "hidden" : "visible";
      }
      const b1 = Math.min(seg(smooth, 0.14, 0.22), 1 - seg(smooth, 0.36, 0.44));
      const b2 = Math.min(seg(smooth, 0.46, 0.54), 1 - seg(smooth, 0.68, 0.76));
      [b1, b2].forEach((v, i) => {
        const el = beats[i];
        if (!el) return;
        el.style.opacity = String(v);
        el.style.transform = `translateY(${(1 - v) * 18}px)`;
      });
      if (beatScrim) beatScrim.style.opacity = String(Math.max(b1, b2));
      const l = seg(smooth, 0.86, 0.97);
      if (shade) shade.style.opacity = String(l);
      if (scrim) scrim.style.opacity = String(Math.max(1 - out, l * 0.4));
      if (land) {
        land.style.opacity = String(l);
        land.style.transform = `translateY(${(1 - l) * 24}px)`;
        if (l > 0.5 !== landed) {
          landed = l > 0.5;
          land.inert = !landed;
        }
      }
      if (cue) cue.style.opacity = p > 0.015 ? "0" : "1";
      if (altValue) altValue.textContent = `${Math.round(300 * (1 - ease(smooth)) + 3)} m`;
      if (altDot) altDot.style.top = `${ease(smooth) * 100}%`;
      if (altBox) altBox.style.opacity = String(1 - l);

      if (visible || Math.abs(target - smooth) > 0.0005) raf = requestAnimationFrame(frame);
    }

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) kick();
    });

    const onResize = () => {
      const fmt = pickFormat();
      if (fmt !== format) load(fmt);
      size();
      kick();
    };

    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      section.classList.add("is-live");
      if (land) land.inert = true;
      load(pickFormat());
      size();
      io.observe(section);
      window.addEventListener("scroll", kick, { passive: true });
      window.addEventListener("resize", onResize);
      kick();
    };

    // Après le premier affichage : la photo fixe reste l'élément principal du chargement.
    const hasIdle = "requestIdleCallback" in window;
    let idle = 0;
    const onLoad = () => {
      idle = hasIdle ? window.requestIdleCallback(start, { timeout: 1500 }) : window.setTimeout(start, 300);
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    return () => {
      generation++;
      window.removeEventListener("load", onLoad);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", onResize);
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      if (idle) {
        if (hasIdle) window.cancelIdleCallback(idle);
        else window.clearTimeout(idle);
      }
      section.classList.remove("is-live");
    };
  }, []);

  return null;
}
