# Stratégie SEO — EcocarVHU V1 (PACA)

Version du 13/10/2026. Ce document décrit des **hypothèses de travail**. Aucun volume de recherche, score de difficulté ou classement n'a été mesuré : aucun outil SEO n'a été consulté pour cette V1. Les priorités seront revues avec Search Console après la mise en ligne.

## 1. Benchmark

### Méthode et limites

- La recherche date du 13/10/2026. Les notes complètes se trouvent dans `RESEARCH-NOTES-2026-10-13.md`.
- **Aucune page n'a pu être ouverte directement.** Depuis l'environnement de développement, le proxy réseau refusait les domaines visés. Les constats viennent des **extraits indexés** renvoyés par un moteur de recherche : titres, URL et résumés.
- Il faut les relire en navigation directe avant d'en tirer des conclusions définitives.
- Rien n'est connu du trafic, des conversions, des positions ou des logiciels des sites étudiés.

### Constats visibles (extraits indexés)

| Site | Constats |
|---|---|
| autopieces-des-mureaux.fr (référence, 78) | Trois groupes de pages : `epaviste/` par département, `casse-auto/` par ville et `centre-vhu/`. Numéro d'agrément préfectoral affiché. Contact par téléphone, SMS et formulaire de rendez-vous. Gratuité présentée comme conditionnelle. Pièces à retirer sur place, sans vente en ligne. Pages-villes éloignées rattachées à une seule adresse. Horaires et durée de validité du non-gage incohérents d'une page à l'autre. |
| manycar.fr (Marignane/Gignac, 13) | « Casse agréée VHU » sans numéro visible dans les extraits. Très nombreuses pages longue traîne aux slugs quasi identiques (pièce + marque + Marseille). Recherche de pièce par téléphone. |
| inter-car.fr (réseau, pages Marseille et Nice) | Pages `services/epaviste-automobile-{ville}`. Annonce « 24-48 h » et certificat de destruction. Gratuité sous condition de véhicule complet. Prix de rachat divergents selon les pages. |
| rapid-epaviste-marseille.fr (Aubagne) | Gratuité « dans la plupart des cas », frais possibles en sous-sol ou sans roues. Zones et horaires incohérents. Contact par mobile et adresse Gmail. |

### Hypothèses tirées de ces constats (non mesurées)

- Le secteur promet beaucoup (« gratuit », « 24-48 h », « agréé ») et prouve peu. Les numéros d'agrément sont rarement affichés et les informations se contredisent d'une page à l'autre.
- Les pages-villes en masse sont courantes. Elles exposent au risque « pages satellites » et « contenu à grande échelle » décrit par Google.
- Les contraintes réelles (sous-sol, roues, clés, documents) apparaissent rarement **avant** la prise de contact.
- Aucun site examiné ne propose d'aide pour décrire une pièce dont on ignore le nom.

### Décisions de conception qui en découlent

1. **Une seule source de vérité** (`src/config/company.ts`) pour le téléphone, la zone, le partenaire VHU et les conditions. Aucune incohérence possible entre les pages.
2. **Encart « Partenariat avec un centre VHU agréé »** avec numéro d'agrément, raison sociale et autorité. Les champs restent en « à venir » tant qu'ils ne sont pas fournis. Le rôle de l'entreprise et celui du centre sont distingués.
3. **Gratuité formulée honnêtement** : la remise d'un véhicule complet au centre est gratuite, mais le transport dépend de l'accès, de l'état et de la distance. Les conditions sont annoncées avant le rendez-vous.
4. **Module « état et accès »** sur l'accueil : cinq questions et les points à signaler avant le déplacement. Les réponses sont reprises dans le formulaire.
5. **Formulaire d'enlèvement en 3 étapes**, orienté qualification : roues, clés, déplaçable, type d'accès, photos de l'accès, situation de la carte grise **sans** copie de document.
6. **Demande de pièce sans connaître son nom** : description et photo de l'emplacement ou de l'étiquette. Les informations de compatibilité sont expliquées.
7. **Peu de pages locales**, chacune ancrée dans des faits vérifiables et publiée seulement après confirmation du service. Monaco est traité à part.
8. **Aucun délai, prix ou avis** affiché sans preuve. Le bloc « preuves » est masqué tant qu'il est vide.
9. **Téléphone très visible et répété**, en relief, avec un bouton d'appel flottant sur mobile, à la demande du porteur de projet. Pas de widget WhatsApp lourd.

## 2. Carte des intentions

| Intention | Exemples de formulations (hypothèses) | Destination principale | Remarques |
|---|---|---|---|
| Faire enlever un véhicule (générique) | enlèvement épave, épaviste, enlèvement voiture non roulante | `/enlevement-epave` | Page pivot transactionnelle |
| Enlèvement + ville | enlèvement épave Marseille, épaviste Nice | `/zones-intervention/{ville}` (après validation) | Pas de page publiée sans service confirmé |
| Enlèvement gratuit (+ ville) | enlèvement épave gratuit | Section « gratuité » de `/enlevement-epave` | Conditions réelles, sans promesse universelle |
| Centre VHU (+ secteur) | centre VHU, centre VHU agréé, certificat de destruction | `/centre-vhu` | **Pas** de page « centre VHU à {ville} » : aucun centre n'est implanté par l'entreprise |
| Pièce d'occasion (générique) | pièces auto occasion, casse auto pièces | `/pieces-auto-occasion` | Catégories et aide, sans faux catalogue |
| Demander une pièce | demande pièce auto occasion | `/demande-piece` | Formulaire |
| Marque, modèle ou référence | pièce Clio 4 alternateur, référence OEM | (futur) pages générées depuis le stock réel | **Non créé en V1** |
| Rachat véhicule en panne ou accidenté | rachat voiture en panne, rachat voiture accidentée | `/rachat-vehicule` | Étude, sans estimation automatique ; service à confirmer |
| Professionnels | pièces occasion garage, enlèvement épaves garage | `/professionnels` | Demande groupée |
| Questions qui freinent | documents destruction voiture, carte grise perdue épave, sous-sol | Guides `/conseils/*` (brouillons) et sections documents | Pages publiées après relecture |

Règle : **une intention, une destination principale.** Les autres pages renvoient vers elle au lieu de la concurrencer.

## 3. Priorités PACA

1. **Région** : `/zones-intervention/paca`. C'est la page locale la plus utile tant que la couverture commune par commune n'est pas confirmée. Elle doit être publiée en premier, dès que les départements desservis sont confirmés.
2. **Villes du brief** : Marseille, Aubagne, La Ciotat, Cassis, Nice. Le porteur de projet les présente comme « une idée ». Elles ne sont publiées qu'avec un service confirmé et de la matière locale vérifiée.
3. **Départements** (13, 83, 06, 84, 04, 05) : ils sont pour l'instant des sections de la page PACA. Une page départementale ne se justifie que si elle apporte une information distincte (organisation, délais, centre de destination).
4. **Arrondissements de Marseille** : un champ facultatif dans le formulaire suffit. **Pas de pages par arrondissement** sans valeur distincte.
5. **Monaco** : un brouillon séparé, jamais présenté comme une commune de PACA (voir `CONTENT-VALIDATION.md`).
6. **Autres secteurs du Sud** : il suffit d'ajouter un objet dans `src/content/sectors/data.ts`. Aucune campagne nationale.

Hypothèse à confirmer : « Auban » a été interprété comme **Aubagne (13400)**.

## 4. Arborescence V1

```
/                                   Accueil
/enlevement-epave                   Service + formulaire d'enlèvement (#demande)
/centre-vhu                         Rôle du centre VHU partenaire, statut, documents
/pieces-auto-occasion               Catégories, compatibilité, aide
/demande-piece                      Formulaire de pièce
/rachat-vehicule                    Étude de rachat + formulaire
/professionnels                     Demandes groupées + formulaire
/contact                            Téléphone + formulaire de contact
/zones-intervention                 Hub des secteurs
/zones-intervention/paca            Brouillon
/zones-intervention/marseille       Brouillon
/zones-intervention/aubagne         Brouillon
/zones-intervention/la-ciotat       Brouillon
/zones-intervention/cassis          Brouillon
/zones-intervention/nice            Brouillon
/zones-intervention/monaco          Brouillon séparé (État distinct)
/conseils (+ 4 guides)              Brouillons (le hub n'existe en production qu'avec au moins un guide publié)
/mentions-legales, /confidentialite, /conditions   Brouillons légaux (noindex)
/demande/resultat/{statut}          Résultat d'envoi sans JavaScript (noindex)
```

Toutes les URL sont en minuscules, sans slash final, stables et sans paramètre indexable. Aucun filtre ni aucune recherche ne génère d'URL.

## 5. Maillage interne

- **En-tête** : enlèvement, pièces, rachat, professionnels, zones, contact.
- **Pied de page** : les services, le centre VHU, la demande de pièce, les zones, les conseils (si visibles) et les pages légales.
- **Accueil** : deux entrées dominantes (`/enlevement-epave#demande`, `/demande-piece`), une entrée secondaire (`/rachat-vehicule`) et des liens vers les pièces, les zones et le centre VHU.
- **Services** :
  - enlèvement ↔ centre VHU ↔ rachat, dans les deux sens ;
  - pièces → demande de pièce → professionnels ;
  - chaque page de service → zones.
- **Secteurs** :
  - ville → PACA (fil d'Ariane), villes voisines liées, `/enlevement-epave`, `/centre-vhu`, `/demande-piece`, `/rachat-vehicule` ;
  - PACA → villes.
- **Garde-fou** : en production, aucun lien n'est émis vers un brouillon (`guideHref`, `visibleSectors`). Le script `check:site` vérifie tous les liens internes.

## 6. Cartes des pages

Les title, descriptions et H1 exacts se trouvent dans `src/content/pages.ts` et `src/content/sectors/data.ts`.

| Page | Intention | Requête principale (hyp.) | Proposition au visiteur | Liens sortants clés | Appel à l'action | À vérifier |
|---|---|---|---|---|---|---|
| `/` | Choisir le service | enlèvement épave PACA | Comprendre en 5 s quoi demander, vérifier son véhicule | enlèvement, demande de pièce, rachat, zones, centre VHU | 2 entrées + téléphone | Secteurs confirmés, preuves |
| `/enlevement-epave` | Obtenir un enlèvement | enlèvement épave | Situations, formulaire qualifiant, gratuité honnête, documents | centre VHU, rachat, zones, guide accès | Formulaire `#demande` + appel | Conditions de gratuité, capacités logistiques |
| `/centre-vhu` | Comprendre la prise en charge | centre VHU | Qui fait quoi, agrément/enregistrement, documents, devenir du véhicule | enlèvement, demande de pièce | Demander un enlèvement | **Partenaire : nom, n°, autorité** |
| `/pieces-auto-occasion` | Chercher une pièce | pièces auto occasion | 3 façons de demander, compatibilité, catégories | demande de pièce, professionnels, guide référence | Demander une pièce | Modalités de retrait/envoi, garantie |
| `/demande-piece` | Envoyer une demande | demande pièce auto occasion | Formulaire en 3 étapes, photo d'étiquette | pièces, professionnels | Envoyer | — |
| `/rachat-vehicule` | Céder un véhicule | rachat voiture en panne | Étude sans faux prix | enlèvement | Demander une étude | **Le service est-il confirmé ?** |
| `/professionnels` | Demande B2B | pièces occasion garage | Liste de références, lots d'enlèvement | — | Formulaire | Offre pro réelle |
| `/contact` | Joindre | — | Téléphone, raccourcis vers les bons formulaires | 3 formulaires | Appel / message | E-mail, horaires |
| `/zones-intervention` | Savoir si sa commune est couverte | épaviste PACA | Départements, règles d'annonce d'un secteur | secteurs visibles | Demande avec code postal | Couverture réelle |
| `/zones-intervention/paca` | Locale régionale | épaviste PACA | Les 6 départements, accès, FAQ | villes | Formulaire prérempli | Départements desservis |
| `/zones-intervention/marseille` | Locale | enlèvement épave Marseille | Arrondissement, sous-sols, fourrière | Aubagne, La Ciotat, Cassis, PACA | Formulaire (arrondissement) | Voir `CONTENT-VALIDATION.md` |
| `/zones-intervention/aubagne` | Locale | enlèvement épave Aubagne | Terrain privé, véhicule sans clés | Marseille, La Ciotat, Cassis | Formulaire (13400) | Hypothèse « Auban » |
| `/zones-intervention/la-ciotat` | Locale | enlèvement épave La Ciotat | Véhicule immobilisé, propriétaire absent | Cassis, Aubagne, Marseille | Formulaire (13600) | Idem |
| `/zones-intervention/cassis` | Locale | enlèvement épave Cassis | Faisabilité honnête, voie étroite à décrire | La Ciotat, Aubagne, Marseille | Formulaire (13260) | Idem |
| `/zones-intervention/nice` | Locale | enlèvement épave Nice | Département différent, véhicule monégasque | PACA | Formulaire | Organisation 06 |

Chaque page a un seul H1, une hiérarchie H2/H3 logique, un fil d'Ariane visible cohérent avec le JSON-LD `BreadcrumbList`, un canonical vers elle-même (dès que le domaine est connu) et une meta description propre.

## 7. Choix techniques SEO

- **HTML pré-rendu** pour toutes les pages éditoriales. Le JavaScript client se limite au menu mobile, aux formulaires, au module de vérification et au bouton d'appel.
- **Données structurées** :
  - `BreadcrumbList` sur les pages intérieures ;
  - `Organization` seulement quand l'identité légale est confirmée et la marque définitive (désactivée aujourd'hui) ;
  - **pas de `LocalBusiness`** : aucun établissement réel n'a d'adresse publiée, et une zone desservie n'est pas une succursale ;
  - ni `aggregateRating`, ni `FAQPage`, ni `Product`.
- **Pas de « fichier magique » pour l'IA** (pas de llms.txt). Selon la documentation Google consultée indirectement, aucune optimisation spéciale n'est requise.
- **Statuts HTTP** :
  - vrai 404 (y compris pour les segments dynamiques, via `src/proxy.ts`) ;
  - pas de redirection des erreurs vers l'accueil ;
  - pas de redirection permanente : aucun ancien site connu.
- **Images** : l'illustration est en SVG inline aux dimensions fixées. L'image de partage est générée au build. Aucune photo stock.

## 8. Plan des prochains mois (sans garantie de résultat)

**Avant la mise en ligne**
- Compléter `company.ts` et faire passer `npm run check:launch` au vert.
- Publier au minimum la page PACA.

**Mois 1**
- Vérifier le domaine dans Search Console (propriété de domaine via enregistrement DNS TXT) et soumettre `sitemap.xml`.
- Contrôler la couverture d'indexation.
- Créer la fiche Google Business Profile **uniquement** si un établissement réel est éligible. Pour une entreprise de zone de service : adresse masquée et zone desservie renseignée, aucune fiche par ville.

**Mois 1 à 3**
- Lire les **requêtes agrégées** de Search Console (pas de requête individuelle par prospect).
- Améliorer en priorité les pages qui obtiennent des impressions avec un CTR faible.
- Analyser les demandes réellement reçues (type, secteur, freins) pour enrichir les FAQ.

**Mois 2 à 4**
- Publier les villes dont le service est confirmé, avec des preuves autorisées : photos réelles, contraintes rencontrées, questions reçues.
- Publier les guides après relecture.

**Ensuite**
- Ouvrir de nouveaux secteurs du Sud sur le même modèle.
- Créer des pages par marque, modèle ou référence **uniquement** à partir du stock réel.
- Construire des partenariats locaux (garages, carrossiers, dépanneurs, assureurs) et obtenir des liens éditoriaux légitimes. Pas d'achat de liens.

Aucun objectif de position, de trafic ou de nombre de demandes n'est promis.

## 9. Accueil enrichi (mise à jour)

**Intention dominante** : présenter l'offre EcocarVHU et générer des demandes en PACA. L'enlèvement est l'entrée principale, les pièces la seconde, le rachat une entrée secondaire.

**Structure** (environ 2 500 mots visibles, sans viser de nombre de mots) :

| Section | Titre | Lien principal |
|---|---|---|
| Hero | H1 « Enlèvement d'épave gratuit en Provence-Alpes-Côte d'Azur » + condition de gratuité dans le texte | `/enlevement-epave#demande`, `/demande-piece`, `/rachat-vehicule` |
| Rôles + 4 étapes | « Un interlocuteur pour préparer la prise en charge de votre véhicule » | `/centre-vhu`, guide documents (si publié) |
| Situations | « Quels véhicules faire enlever, et quoi nous indiquer » + cas à vérifier (sans clés, sans roues, sans carte grise) | guide accès difficile (si publié) |
| Gratuité | « Enlèvement d'épave gratuit : à quelles conditions ? » + distinction remise au centre / collecte de la filière | Service-Public, ministère |
| Questionnaire | « Préparez votre demande en 5 questions » (outil existant conservé) | formulaire d'enlèvement |
| Pièces | « Pièces auto d'occasion : la bonne pièce, vérifiée avant toute proposition » | `/demande-piece`, `/pieces-auto-occasion`, guide référence (si publié) |
| Rachat + Pros | « Rachat de véhicule : demander une étude » / « Garages, carrossiers, dépanneurs : vos demandes groupées » | `/rachat-vehicule`, `/professionnels` |
| Région | « Épaviste en Provence-Alpes-Côte d'Azur : vérifiez votre commune » | `/zones-intervention` et secteurs, seulement s'ils sont visibles |
| Confiance | « Des engagements que vous pouvez contrôler » + encart du centre partenaire | `/centre-vhu` |
| FAQ | 9 questions, dont 6 avec un lien vers la page détaillée | pages de service |

**Règles de maillage** :
- Les liens vers les guides et les secteurs passent par `guideHref` et `SectorList`.
- En production, aucun lien ne pointe vers un brouillon. C'est vérifié par `check:site` (12 liens internes, aucun vers `/conseils` ou une ville).
