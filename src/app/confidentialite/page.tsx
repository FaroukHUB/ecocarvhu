import { company } from "@/config/company";
import { pages } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";
import { LegalPage, Missing } from "@/components/sections/LegalPage";

const page = pages.confidentialite;

export const metadata = buildMetadata({ path: page.path, title: page.title, description: page.description, draft: page.draft });

export default function ConfidentialitePage() {
  return (
    <LegalPage title={page.h1} path={page.path}>
      <h2>Responsable du traitement</h2>
      <p>{company.legalName ?? <Missing>raison sociale</Missing>}, éditeur du site {company.brandName}.</p>

      <h2>Données collectées</h2>
      <p>
        Via les formulaires : les informations que vous saisissez (coordonnées, description du véhicule ou
        de la pièce, commune, photos facultatives). Aucune copie de pièce d&apos;identité ni de carte grise
        n&apos;est demandée en ligne.
      </p>

      <h2>Finalité et base légale</h2>
      <p>
        Traiter votre demande (enlèvement, pièce, étude de rachat, demande professionnelle ou message) et
        vous recontacter : mesures précontractuelles prises à votre demande. <Missing>à valider</Missing>
      </p>

      <h2>Transmission</h2>
      <p>
        Les demandes sont transmises par e-mail à l&apos;entreprise via un prestataire d&apos;envoi :{" "}
        <Missing>nom du prestataire, localisation des données, garanties en cas de transfert hors UE</Missing>.
        Elles ne sont pas enregistrées dans une base de données du site.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        <Missing>durée de conservation des e-mails de demande dans la messagerie de l&apos;entreprise</Missing>
      </p>

      <h2>Mesure d&apos;audience et cookies</h2>
      <p>
        Le site ne dépose actuellement aucun cookie de mesure d&apos;audience ni de publicité. Si un outil de
        mesure est ajouté, cette section sera mise à jour et, lorsque l&apos;outil l&apos;exige, votre
        consentement sera demandé avant tout dépôt.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous pouvez demander l&apos;accès, la rectification ou l&apos;effacement de vos données, ou vous
        opposer à leur traitement, en écrivant à <Missing>adresse de contact dédiée</Missing>. Vous pouvez
        également adresser une réclamation à la CNIL (cnil.fr).
      </p>
    </LegalPage>
  );
}
