# EcocarVHU — site public V1

Site d'acquisition d'EcocarVHU (nom de marque provisoire) pour la région Provence-Alpes-Côte d'Azur. Il couvre l'enlèvement de véhicules hors d'usage, la remise à un centre VHU partenaire, la recherche de pièces auto d'occasion, l'étude de rachat de véhicules et les demandes des professionnels.

**Périmètre de cette V1 :** site public et parcours de demande. Pas de CMS, de base de données, d'authentification, de dashboard, de stock connecté, de paiement ni de démarches SIV. Voir [Plus tard](#plus-tard-hors-périmètre-v1).

## Démarrage

Prérequis : Node.js 20.9 ou plus récent (testé avec Node 22).

```bash
npm install
cp .env.example .env.local     # SITE_ENV=development, FORM_TRANSPORT=demo
npm run dev                    # http://localhost:3000
```

| Script | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` / `npm start` | Build et serveur de production |
| `npm run lint` | ESLint (config Next.js) |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |
| `npm test` | Tests unitaires Vitest : publication, sitemap, robots, formulaires, fichiers |
| `npm run check:site` | Contrôle du HTML rendu sur un serveur en marche (voir plus bas) |
| `npm run check:launch` | Échoue tant qu'une information bloquante manque pour publier |

Avant le premier `tsc`, lancez une fois `npm run build` ou `npx next typegen` : Next.js génère les types des routes (`PageProps<...>`).

## Stack

- **Next.js 16.4** (App Router, Turbopack), **React 19.3**, **TypeScript**, **Tailwind CSS 4**.
- **Cache Components** et **Partial Prefetching** sont activés (configuration par défaut de `create-next-app` 16.4, documentée comme stable). Toutes les pages éditoriales sont pré-rendues en HTML statique.
- **Zod 4** pour la validation serveur, **Vitest 4** pour les tests.
- Police unique : Archivo (variable, auto-hébergée par `next/font`). Aucune bibliothèque d'animation, aucune carte, aucun script tiers.
- La documentation Next.js de la version installée se trouve dans `node_modules/next/dist/docs/` (voir `AGENTS.md`).

## Organisation

```
src/
  config/
    company.ts        Informations de l'entreprise : SOURCE UNIQUE ; null = inconnu
    env.ts            Environnement (production / preview / development), domaine
  content/            Données et textes (futur CMS)
    pages.ts          Slugs, title, description, H1, intention des pages principales
    sectors/          Secteurs (PACA, villes, Monaco) avec leurs 4 statuts de publication
    guides.ts         Espace conseils
    regulatory.ts     Documents, cas particuliers, gratuité, sources officielles
    home.ts           Familles de pièces, FAQ d'accueil
  lib/
    publication.ts    Règles de publication, sitemap, noindex, liens vers les brouillons
    routes.ts         Segments dynamiques connus (vrai 404 via le proxy)
    seo.ts            Métadonnées, canonical, BreadcrumbList, Organization
    forms/            Schémas, contrôle des fichiers, anti-spam, transport e-mail
    analytics.ts      Événements de conversion (désactivés par défaut)
    launch-readiness.ts  Liste des points bloquants avant publication
  components/         layout/, sections/, forms/, ui/
  app/                Routes (pages serveur), api/demandes, robots.ts, sitemap.ts
  proxy.ts            Protection de la prévisualisation + 404 des segments inconnus
tests/                Tests Vitest
scripts/              check-site.mjs (HTML rendu), e2e-forms.mjs (navigateur)
docs/                 Stratégie SEO, validation des contenus, checklist de lancement
```

Il y a trois couches séparées : les **données** (`config/`, `content/`), l'**affichage** (`app/`, `components/`) et la **transmission** (`lib/forms/`). Pour brancher plus tard un CMS, on remplace la lecture des fichiers `content/`. Pour un dashboard, on ajoute un adaptateur dans `lib/forms/transport.ts`.

## Environnements et indexation

| | `development` | `preview` | `production` |
|---|---|---|---|
| Brouillons (villes, Monaco, guides) | visibles | visibles (bandeau) | **404** |
| `<meta name="robots">` | noindex | noindex | index (sauf brouillons légaux) |
| En-tête `X-Robots-Tag` | noindex | noindex | — |
| `robots.txt` | Disallow: / | Disallow: / | Allow + sitemap |
| `sitemap.xml` | vide | vide | URL publiées uniquement |
| Formulaires en mode `demo` | autorisé | refusé | refusé |

- **Une build sans `SITE_ENV` est traitée comme `preview`.** Le site ne peut donc pas être indexé par accident.
- L'indexation exige `SITE_ENV=production` **et** un `NEXT_PUBLIC_SITE_URL` en https, différent de localhost et d'une adresse IP.
- Ces valeurs sont lues **au build**. Il faut reconstruire après un changement.
- **La prévisualisation doit être protégée.** Utilisez la protection native de l'hébergeur, ou `PREVIEW_BASIC_AUTH=utilisateur:motdepasse`. Un `robots.txt` ne protège rien et ne garantit pas la désindexation.

### Publier un secteur ou un guide

Dans `src/content/sectors/data.ts`, chaque secteur a quatre statuts : `targeted`, `serviceConfirmed`, `contentVerified` et `publicationApproved`. La page de secteur n'est indexable, présente dans le sitemap et liée depuis le site de production que si **les quatre** valent `true`. Le principe est le même pour les guides (`contentVerified` + `publicationApproved`). Le suivi se fait dans `docs/CONTENT-VALIDATION.md`.

## Formulaires

Il y a cinq parcours : enlèvement (3 étapes), pièce (3 étapes), rachat (3 étapes), professionnels et contact. Ils sont tous envoyés à `POST /api/demandes`.

- **Validation serveur** (Zod) : erreurs renvoyées champ par champ, focus sur le premier champ en erreur, saisie conservée en cas d'échec.
- **Photos** :
  - formats JPEG, PNG, WebP et HEIC, contrôlés par **signature binaire** (et non par l'extension) ;
  - 4 photos au maximum pour l'enlèvement, 3 pour une pièce, 6 pour le rachat ;
  - 3 Mo par photo et 4 Mo par demande, configurables ;
  - le navigateur réduit les photos avant l'envoi (1600 px, JPEG) ;
  - les noms de fichiers sont neutralisés (`photo-1.jpg`) ;
  - aucun document d'identité n'est demandé.
- **Anti-spam** : champ piège, temps de remplissage minimal et limitation de débit en mémoire (6 envois par 10 minutes et par IP, sur une seule instance). En production, complétez avec le pare-feu de l'hébergeur ou un captcha respectueux de la vie privée.
- **Sans JavaScript**, les formulaires s'envoient quand même. Le serveur répond par une redirection 303 vers `/demande/resultat/<statut>`, une page en noindex sans aucune donnée personnelle dans l'URL.
- **Transport** (`FORM_TRANSPORT`) :
  - `resend` : appel HTTP à l'API Resend avec `RESEND_API_KEY`, `FORM_TO_EMAIL` et `FORM_FROM_EMAIL` (domaine d'envoi vérifié chez Resend). L'e-mail contient le type de demande, le secteur et la page d'origine, tous les champs avec leurs libellés lisibles, les photos en pièces jointes et l'adresse de réponse du client si elle est fournie. Resend limite la taille totale d'un e-mail (pièces jointes encodées comprises) : vérifiez la limite en vigueur avant d'augmenter `FORM_MAX_TOTAL_MB`.
  - `demo` : **uniquement** avec `SITE_ENV=development`. L'interface affiche « Mode démonstration : rien n'a été transmis ».
  - Absent ou incomplet : la demande est refusée (HTTP 503) avec un message explicite et le numéro de téléphone. **Aucun succès n'est jamais affiché sans acceptation par le prestataire.** Un succès signifie que le prestataire a accepté l'e-mail, pas que l'entreprise l'a lu.
- Les demandes ne sont stockées nulle part sur le serveur. Leur centralisation viendra avec le futur dashboard.

### Changer de prestataire d'envoi

Ajoutez un cas dans `resolveTransport()` et `deliver()` (`src/lib/forms/transport.ts`). Le reste du traitement (`process.ts`) ne change pas.

## Téléphone, WhatsApp et contact

- Le numéro `07 53 08 62 18` (fourni le 13/10/2026) est défini dans `src/config/company.ts`. Il est affiché en grand avec un effet relief en CSS pur : dans le bandeau mobile sous l'en-tête, l'en-tête sur ordinateur, l'accueil, les bandeaux d'appel, le pied de page et la page 404.
- Le **bouton d'appel flottant** (mobile, en bas à droite) s'efface pendant la saisie dans un formulaire, pour ne masquer ni les champs ni le clavier.
- **WhatsApp** n'est pas affiché tant que `company.whatsapp` vaut `null`. Une fois renseigné, le lien `wa.me` ouvre une conversation. Il ne transmet aucun formulaire et ne confirme aucune réception.
- Si le téléphone est retiré de la configuration, tous les boutons d'appel deviennent des liens vers `/contact`. Aucun faux lien n'est affiché.

## Mesure

`src/lib/analytics.ts` définit les événements `call_click`, `whatsapp_click`, `form_start`, `form_submit_accepted` et `form_submit_error`. Ils portent le type de demande, la page et l'emplacement, **jamais de donnée personnelle**.

Rien n'est chargé ni envoyé tant que `NEXT_PUBLIC_ANALYTICS_ENABLED` ne vaut pas `true`. Avant de l'activer :

1. Choisir un outil.
2. Vérifier s'il peut être configuré dans les conditions d'exemption de consentement décrites par la CNIL (finalité limitée, données anonymes, pas de recoupement ni de transmission, durées limitées). Aucun outil n'est « certifié CNIL ».
3. Sinon, mettre en place un recueil du consentement **avant** tout dépôt.
4. Mettre à jour `/confidentialite`.

Pour l'interprétation : un clic sur « Appeler » n'est pas un appel reçu, un clic WhatsApp n'est pas une conversation, et une demande transmise n'est pas une vente.

## Vérifications

```bash
npm run lint && npm run typecheck && npm test

# Prévisualisation
SITE_ENV=preview NEXT_PUBLIC_SITE_URL=https://preview.exemple npm run build
npm start -- -p 3100 &
BASE_URL=http://localhost:3100 EXPECT=preview npm run check:site

# Production (avec le vrai domaine)
SITE_ENV=production NEXT_PUBLIC_SITE_URL=https://www.domaine.fr npm run build
npm start -- -p 3100 &
BASE_URL=http://localhost:3100 EXPECT=production SITE_URL=https://www.domaine.fr npm run check:site

# Parcours navigateur (Playwright à installer ou à fournir ; redémarrer le serveur avant)
BASE_URL=http://localhost:3100 node scripts/e2e-forms.mjs
```

`check:site` vérifie notamment :

- le statut de chaque page, un H1 unique, le title, la description et `lang="fr"` ;
- les canonicals et le robots selon l'environnement ;
- le sitemap : URL publiées, en 200, indexables, avec un canonical identique ;
- les brouillons en 404 en production ;
- les liens internes sans 404 et les vrais 404 ;
- la validité du JSON-LD ;
- l'absence de `aggregateRating`, de `LocalBusiness` et de valeurs de démonstration.

## Plus tard (hors périmètre V1)

Rien de ce qui suit n'est codé dans cette V1 :

- Payload (CMS) et PostgreSQL ;
- dashboard métier et centralisation des demandes ;
- stock de pièces connecté et pages par marque, modèle ou référence ;
- devis, espace professionnel, e-commerce et paiement.

## Documentation

- [`docs/SEO-STRATEGY.md`](docs/SEO-STRATEGY.md) : benchmark, intentions, arborescence, maillage, cartes de pages, plan.
- [`docs/CONTENT-VALIDATION.md`](docs/CONTENT-VALIDATION.md) : faits connus, sources, éléments à confirmer, statut des pages et secteurs.
- [`docs/LAUNCH-CHECKLIST.md`](docs/LAUNCH-CHECKLIST.md) : conditions de publication et vérifications réellement effectuées.
- [`docs/RESEARCH-NOTES-2026-10-13.md`](docs/RESEARCH-NOTES-2026-10-13.md) : notes brutes du benchmark et de la recherche réglementaire, avec leurs limites.
