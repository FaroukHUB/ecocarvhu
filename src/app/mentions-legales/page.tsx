import { company } from "@/config/company";
import { pages } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";
import { LegalPage, Missing } from "@/components/sections/LegalPage";

const page = pages.mentions;

export const metadata = buildMetadata({ path: page.path, title: page.title, description: page.description, draft: page.draft });

const v = (value: string | null) => value ?? <Missing />;

export default function MentionsPage() {
  const p = company.vhu.partner;
  return (
    <LegalPage title={page.h1} path={page.path}>
      <h2>Éditeur du site</h2>
      <ul>
        <li>Nom commercial : {company.brandName}{company.brandIsProvisional ? " (provisoire)" : ""}</li>
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

      <h2>Centre VHU partenaire</h2>
      <ul>
        <li>Raison sociale : {v(p.name)}</li>
        <li>N° d&apos;agrément ou d&apos;enregistrement : {p.agrementNumber ?? <Missing>à venir</Missing>}</li>
        <li>Autorité de délivrance : {v(p.issuingAuthority)}</li>
      </ul>

      <h2>Propriété intellectuelle</h2>
      <p>
        Les textes, le logo et les illustrations du site sont la propriété de l&apos;éditeur, sauf mention
        contraire. Les illustrations ne sont pas des photographies de l&apos;entreprise.
      </p>
    </LegalPage>
  );
}
