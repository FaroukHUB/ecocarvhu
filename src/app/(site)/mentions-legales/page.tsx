import { company } from "@/config/company";
import { pages } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";
import { LegalPage, Missing } from "@/components/sections/LegalPage";

const page = pages.mentions;

export const metadata = buildMetadata({ path: page.path, title: page.title, description: page.description, draft: page.draft });

const v = (value: string | null) => value ?? <Missing />;

export default function MentionsPage() {
  return (
    <LegalPage title={page.h1} path={page.path}>
      <h2>Éditeur du site</h2>
      <ul>
        <li>Nom commercial : {company.brandName}</li>
        <li>Raison sociale : {v(company.legalName)}</li>
        <li>Forme juridique : {v(company.legalForm)}</li>
        <li>SIRET : {v(company.siret)}</li>
        <li>N° de TVA intracommunautaire : {v(company.vatNumber)}</li>
        <li>Siège social : {v(company.registeredAddress)}</li>
        <li>Téléphone : {company.phone?.value ?? <Missing />}</li>
        <li>E-mail : {company.email?.value ?? <Missing />}</li>
        <li>Directeur de la publication : {v(company.publicationDirector)}</li>
      </ul>

      <h2>Hébergement</h2>
      <p>Hébergeur : {v(company.host)}</p>

      <h2>Propriété intellectuelle</h2>
      <p>
        Les textes, le logo et les illustrations du site sont la propriété de l&apos;éditeur, sauf mention
        contraire.
      </p>
    </LegalPage>
  );
}
