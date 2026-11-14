import { pages } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";
import { LegalPage, Missing } from "@/components/sections/LegalPage";

const page = pages.conditions;

export const metadata = buildMetadata({ path: page.path, title: page.title, description: page.description, draft: page.draft });

export default function ConditionsPage() {
  return (
    <LegalPage title={page.h1} path={page.path}>
      <h2>Nature des demandes en ligne</h2>
      <p>
        Une demande envoyée depuis le site est une prise de contact. Elle ne vaut ni rendez-vous confirmé,
        ni devis, ni offre de rachat, ni autorisation de destruction d&apos;un véhicule.
      </p>

      <h2>Confirmation des conditions</h2>
      <p>
        Les conditions d&apos;un enlèvement (faisabilité, frais éventuels, date) sont communiquées avant le
        rendez-vous et doivent être acceptées par le client. <Missing>modalités d&apos;acceptation</Missing>
      </p>

      <h2>Pièces d&apos;occasion</h2>
      <p>
        La disponibilité, la compatibilité, le prix, la garantie éventuelle et les modalités de retrait ou
        d&apos;envoi sont précisés avec chaque proposition. <Missing>conditions générales de vente</Missing>
      </p>

      <h2>Destruction des véhicules</h2>
      <p>
        La prise en charge pour destruction est réalisée par le centre VHU partenaire, qui délivre le
        certificat de destruction. <Missing>identification du centre et articulation contractuelle</Missing>
      </p>
    </LegalPage>
  );
}
