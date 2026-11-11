import Link from "next/link";
import { getImageProps } from "next/image";
import { droneHero } from "@/config/drone-hero";
import { pages } from "@/content/pages";
import { PhoneBig } from "@/components/ui/PhoneBig";
import { CoinsIcon, TruckIcon } from "@/components/ui/icons";
import { DroneSequence } from "./DroneSequence";

/**
 * Hero immersif de l'accueil : un vol de drone au-dessus de Marseille, piloté
 * par le défilement, qui se pose sur la dépanneuse.
 *
 * - Premier affichage : image fixe (première image du vol), titre H1 et
 *   boutons rendus côté serveur. Rien ne dépend du JavaScript pour lire la
 *   page ou demander un enlèvement.
 * - Avec JavaScript, sans « mouvement réduit » ni économie de données :
 *   `DroneSequence` charge la séquence d'images après le premier affichage et
 *   anime la scène. La section devient alors plus haute (piste de défilement).
 */
export function HeroDrone() {
  const common = { alt: droneHero.posterAlt, sizes: "100vw", quality: 60 } as const;
  const d = droneHero.desktop;
  const m = droneHero.mobile;
  const {
    props: { srcSet: desktopSet },
  } = getImageProps({ ...common, src: d.poster, width: d.posterWidth, height: d.posterHeight });
  const {
    props: { srcSet: mobileSet, ...img },
  } = getImageProps({ ...common, src: m.poster, width: m.posterWidth, height: m.posterHeight });

  return (
    <section data-drone-hero className="drone-hero relative isolate bg-ink text-white" aria-labelledby="hero-title">
      <div className="drone-stage">
        <picture>
          <source media="(orientation: landscape)" srcSet={desktopSet} />
          {/* eslint-disable-next-line jsx-a11y/alt-text -- alt fourni par getImageProps */}
          <img
            {...img}
            srcSet={mobileSet}
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
        </picture>
        <canvas data-drone-canvas aria-hidden="true" className="drone-canvas" />

        {/* Voiles : lisibilité du texte sur la ville */}
        <div aria-hidden="true" className="drone-vignette" />
        <div aria-hidden="true" data-drone-scrim className="drone-scrim" />
        <div aria-hidden="true" data-drone-shade className="drone-shade" />
        <div aria-hidden="true" data-drone-beat-scrim className="drone-beat-scrim" />

        {/* 1. Ouverture, au-dessus de Marseille */}
        <div data-drone-open className="drone-open">
          <p className="drone-kicker">Épaviste · Rachat de véhicules · PACA</p>
          <h1 id="hero-title" className="drone-title">
            Enlèvement d&apos;épave <span className="drone-glow">gratuit</span>
            <span className="drone-title-sub">en Provence-Alpes-Côte d&apos;Azur</span>
          </h1>
          <p className="drone-lead">
            Véhicule complet et accessible : nous l&apos;enlevons <strong>gratuitement</strong> et le remettons à un
            centre VHU partenaire. Conditions confirmées avant le déplacement.
          </p>
          <div className="drone-ctas">
            <Link href="/enlevement-epave#demande" className="btn btn-lime min-h-14 px-6 text-lg">
              <TruckIcon className="h-6 w-6" />
              Demander un enlèvement
            </Link>
            <Link
              href={pages.rachat.path}
              className="btn btn-glass mr-[5rem] min-h-12 bg-ink/50 sm:mr-0 sm:min-h-14 sm:px-6 sm:text-lg"
            >
              <CoinsIcon className="h-5 w-5 text-lime" />
              Faire étudier le rachat
            </Link>
          </div>
        </div>

        {/* 2. Légendes pendant la descente (décoratives : le texte utile est ailleurs) */}
        <div aria-hidden="true" data-drone-beat className="drone-beat">
          <span className="drone-beat-title">
            Toute la région <em>PACA</em>
          </span>
          <span className="drone-beat-sub">Des Bouches-du-Rhône aux Hautes-Alpes</span>
        </div>
        <div aria-hidden="true" data-drone-beat className="drone-beat">
          <span className="drone-beat-title">
            On vient <em>jusqu&apos;à vous</em>
          </span>
          <span className="drone-beat-sub">Rue, parking, cour : la faisabilité est vérifiée avant le déplacement</span>
        </div>

        {/* 3. Atterrissage sur la dépanneuse */}
        <div data-drone-land className="drone-land" inert>
          <p className="drone-land-title">
            Votre épave, <span className="text-lime">on s&apos;en charge.</span>
          </p>
          <p className="drone-land-text">
            L&apos;équipe vérifie l&apos;accès, l&apos;état du véhicule et les documents, puis organise
            l&apos;enlèvement vers un centre VHU partenaire.
          </p>
          <div className="drone-ctas">
            <Link href="/enlevement-epave#demande" className="btn btn-lime mr-[5rem] min-h-14 px-6 text-lg sm:mr-0">
              <TruckIcon className="h-6 w-6" />
              Demander un enlèvement
            </Link>
            <div className="hidden sm:block">
              <PhoneBig placement="hero" size="md" caption="Appel direct" />
            </div>
          </div>
        </div>

        <div aria-hidden="true" data-drone-cue className="drone-cue">
          <i />
          Faites défiler
        </div>
        <div aria-hidden="true" data-drone-alt className="drone-alt">
          <span className="drone-alt-rec">Vol</span>
          <span>Altitude</span>
          <b data-drone-alt-value>300 m</b>
          <span className="drone-alt-bar">
            <i data-drone-alt-dot />
          </span>
        </div>
      </div>
      <DroneSequence />
    </section>
  );
}
