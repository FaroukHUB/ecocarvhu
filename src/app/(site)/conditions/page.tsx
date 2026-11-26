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

      <h2>Destruction des véhicules</h2>
      <p>
        La prise en charge pour destruction est réalisée par un centre VHU agréé, qui délivre le
        certificat de destruction.
      </p>
    </LegalPage>
  );
}
