# Checklist de lancement — EcocarVHU V1

La mise en ligne publique en production **ne fait pas partie de cette étape**. Ce document liste les conditions de publication et ce qui a **réellement** été vérifié le 13/10/2026.

## A. Bloquant avant publication

`npm run check:launch` doit passer. Au 13/10/2026, il échoue avec 16 points bloquants : c'est attendu.

- [ ] Marque EcocarVHU confirmée (`brandIsProvisional: false`).
- [ ] Identité légale complète dans `src/config/company.ts` : raison sociale, forme, SIRET, siège, directeur de la publication, hébergeur, e-mail.
- [ ] Ligne 07 53 08 62 18 confirmée comme ligne de l'entreprise, avec des horaires de réponse définis.
- [ ] **Centre VHU partenaire** : raison sociale, numéro d'agrément ou d'enregistrement, autorité, justificatif. Adapter « agréé » / « enregistré » selon son régime.
- [ ] Conditions de gratuité ou tarifs de l'enlèvement définis (`pickup.freeConditions`).
- [ ] Service de rachat confirmé. Sinon, passer `/rachat-vehicule` en brouillon et retirer les liens.
- [ ] Sources officielles relues **en direct** (F1468, ministère VHU, ANTS) et `checkedOn` renseigné dans `src/content/regulatory.ts`.
- [ ] Pages légales rédigées et validées, puis `draft: false` dans `src/content/pages.ts`.
- [ ] Au moins un secteur publié (4 statuts), idéalement la page PACA.
- [ ] Domaine définitif acheté. Variables de l'hébergeur en production : `SITE_ENV=production` et `NEXT_PUBLIC_SITE_URL=https://…`.
- [ ] Resend configuré :
  - domaine d'envoi vérifié (SPF/DKIM) ;
  - `FORM_TRANSPORT=resend`, `RESEND_API_KEY`, `FORM_TO_EMAIL`, `FORM_FROM_EMAIL` ;
  - **un envoi réel testé** de bout en bout, avec photos ;
  - limite de taille d'e-mail du prestataire vérifiée.
- [ ] Limite de taille des requêtes de l'hébergeur vérifiée. Ajuster `FORM_MAX_*` en conséquence (défaut : 4 Mo par demande).
- [ ] Protection anti-abus de l'hébergeur activée (la limitation de débit intégrée est propre à chaque instance).
- [ ] Prévisualisation protégée (protection de l'hébergeur ou `PREVIEW_BASIC_AUTH`) et `SITE_ENV=preview` sur les déploiements de prévisualisation.

## B. Après la mise en ligne

- [ ] `npm run check:site` sur l'URL de production (`EXPECT=production`).
- [ ] Search Console :
  - propriété de domaine vérifiée par enregistrement DNS TXT ;
  - `sitemap.xml` soumis ;
  - inspection d'URL sur l'accueil et `/enlevement-epave`.
- [ ] Google Business Profile **seulement** si un établissement réel est éligible : une seule fiche, adresse masquée si l'entreprise est une zone de service, zone desservie réelle. Aucune fiche par ville, aucun avis sollicité de façon artificielle.
- [ ] Mesure d'audience : choix de l'outil, configuration (exemption CNIL ou consentement), mise à jour de `/confidentialite`, puis `NEXT_PUBLIC_ANALYTICS_ENABLED=true`.
- [ ] Données terrain Core Web Vitals (rapport Search Console ou CrUX) consultées dès qu'il y a assez de trafic.

## C. Vérifications réellement effectuées (13/10/2026)

Environnement : conteneur Linux, Node 22.22, Next.js 16.4.0, serveur local `next start`.

| Contrôle | Résultat | Détail |
|---|---|---|
| `npm install` | OK | |
| `npm run lint` (ESLint, config Next 16) | OK, 0 erreur | |
| `npm run typecheck` | OK | Après `next build` ou `next typegen` |
| `npm test` (Vitest) | **29 tests OK**, 1 ignoré | Le test ignoré est le contrôle de lancement, lancé par `check:launch` |
| Build preview (`SITE_ENV=preview`) | OK | 42 pages générées |
| Build production (`SITE_ENV=production`, domaine de test `https://ecocarvhu.test`) | OK | |
| `check:site` en preview | OK | 21 pages : noindex partout, `X-Robots-Tag` présent, robots `Disallow: /`, sitemap vide, 24 liens internes sans erreur, vrais 404 |
| `check:site` en production | OK | 12 pages : un H1 par page, title et description, canonical vers la page elle-même, brouillons (villes, Monaco, conseils) en **404**, pages légales en noindex, sitemap de 9 URL toutes en 200, indexables avec un canonical identique, aucun localhost, JSON-LD valide, pas de `LocalBusiness` ni d'`aggregateRating` |
| Statuts HTTP | OK | Routes inconnues et segments dynamiques inconnus (`/zones-intervention/ville-inconnue`, `/conseils/inconnu`…) en 404. **Un défaut a été trouvé puis corrigé** : avec Cache Components, un segment inconnu pouvait répondre 200. La correction passe par le proxy (`src/lib/routes.ts`) |
| Parcours navigateur (`scripts/e2e-forms.mjs`, Chromium, viewport mobile 390 px) | **12/12 OK** | Voir le détail ci-dessous |
| Mode démo | OK | Avec `SITE_ENV=development`, réponse « demo » et page « rien n'a été transmis ». Avec `SITE_ENV=preview`, `FORM_TRANSPORT=demo` est refusé (503, « pas encore disponible ») |
| Envoi sans JavaScript | OK | Redirection 303 vers `/demande/resultat/<statut>`, sans donnée dans l'URL |
| Limitation de débit | Constatée | Après 6 envois en 10 minutes depuis la même IP, réponse `rate-limited` |
| Vérification visuelle | OK | Captures mobile (390 px) et ordinateur (1366 px) : accueil, enlèvement, Marseille, demande de pièce, centre VHU |
| Accessibilité (Lighthouse) | 100 sur les 6 pages mesurées | Deux défauts corrigés en cours de route : contraste d'un sous-titre de bouton, `aria-label` du téléphone différent du texte visible |

Détail des 12 contrôles navigateur :

1. Une étape vide ne permet pas d'avancer.
2. Le focus va au premier champ invalide.
3. Si le service d'envoi est absent, un message d'indisponibilité s'affiche avec le téléphone.
4. Dans ce cas, les champs sont conservés.
5. Dans ce cas, aucun faux succès ne s'affiche.
6. Un fichier texte renommé `.jpg` est refusé par le serveur.
7. Le succès s'affiche seulement sur une réponse « accepted ».
8. Une erreur serveur est reliée au bon champ (`aria-invalid`).
9. Le focus va au champ en erreur.
10. Le premier Tab atteint le lien « Aller au contenu ».
11. Le bouton d'appel flottant est visible sur mobile.
12. Il s'efface pendant la saisie.

### Mesures de performance (laboratoire uniquement)

Lighthouse 12.8.2, profil mobile par défaut (limitation réseau et CPU simulée), Chromium headless, serveur local de production sans CDN, conteneur à 4 CPU partagés.

| Page | Performance | LCP | CLS | TBT |
|---|---|---|---|---|
| `/` (4 passages) | 98–99 | 2,0–2,4 s | 0 | 50–90 ms |
| `/enlevement-epave` | 99 | 2,0 s | 0 | 70 ms |
| `/centre-vhu` | 98 | 2,2 s | 0 | 70 ms |
| `/pieces-auto-occasion` | 99 | 2,1 s | 0 | 80 ms |
| `/demande-piece` | 98 | 2,3 s | 0,014 | 60 ms |
| `/contact` | 99 | 1,7 s | 0 | 70 ms |

**Limites de ces mesures :**

- Deux passages isolés sur l'accueil ont donné un TBT de 510 ms et 1 000 ms. Ce bruit est probablement dû à la machine partagée, mais il est signalé.
- Ce sont des mesures **de laboratoire**. Elles ne prouvent pas que les seuils Core Web Vitals (LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 au 75e percentile) seront atteints chez les vrais visiteurs.
- L'INP ne se mesure pas en laboratoire : le TBT n'en est qu'un indicateur indirect.
- Il faudra mesurer à nouveau sur l'hébergement réel.

### Non vérifié (et pourquoi)

- **Envoi réel par Resend** : aucun compte ni aucune clé n'étaient disponibles. Le comportement est couvert par des tests avec un `fetch` simulé (succès, erreur 500, erreur réseau), mais un envoi réel reste à faire.
- **Relecture directe des sources officielles et des sites concurrents** : l'accès réseau de l'environnement bloquait ces domaines (voir `RESEARCH-NOTES-2026-10-13.md`).
- **Comportement sur l'hébergement cible** (limite de corps de requête, protection de la prévisualisation, en-têtes) : l'hébergeur n'est pas choisi.
- **Navigateurs réels iOS/Android et lecteurs d'écran** : seul Chromium headless a été utilisé, avec une émulation mobile. À tester sur appareil, notamment la prise de photo et le format HEIC sur iPhone.
- **Parcours Playwright sur ordinateur** : vérification visuelle seulement, le script tourne en viewport mobile.
