import { getImageProps } from "next/image";
import { heroAlt, heroImages } from "@/config/media";

/**
 * Image de fond du hero : image portrait pour les écrans en portrait (téléphones,
 * tablettes debout), image paysage sinon : balise <picture> avec les images optimisées par Next.js.
 * Chargée en priorité (fetchPriority) : c'est l'élément principal du premier écran.
 * <picture> ne télécharge que la source retenue, donc une seule image.
 */
export function HeroBackground() {
  const imgs = heroImages();
  if (!imgs) return null;

  const common = { alt: heroAlt, sizes: "100vw", quality: 60 } as const;
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, src: imgs.desktop, width: 1672, height: 941 });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    src: imgs.mobile ?? imgs.desktop,
    width: imgs.mobile ? 941 : 1672,
    height: imgs.mobile ? 1672 : 941,
  });

  return (
    <picture>
      <source media="(orientation: landscape)" srcSet={desktop} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt fourni par getImageProps */}
      <img
        {...rest}
        srcSet={mobile}
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_60%] portrait:object-[50%_85%]"
      />
    </picture>
  );
}
