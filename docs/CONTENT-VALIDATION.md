# Validation des contenus — EcocarVHU V1

État au 13/10/2026. Pour changer un statut, modifiez les fichiers de `src/config/` et `src/content/`, puis mettez à jour ce document.

## 1. Faits connus et leur source

| Fait | Valeur | Source | Statut |
|---|---|---|---|
| Nom de marque | EcocarVHU | Brief | **Provisoire** |
| Téléphone | 07 53 08 62 18 | Porteur de projet, message du 13/10/2026 | Fourni ; vérifier que la ligne est bien attribuée à l'entreprise |
| Situation VHU | Partenariat avec un centre VHU agréé | Porteur de projet, 13/10/2026 | **Déclaré, non justifié** |
| N° d'agrément du centre partenaire | « à venir » | Porteur de projet | **Manquant** |
| Zone visée | Région PACA (04, 05, 06, 13, 83, 84) | Brief + message du 13/10/2026 (« on vise le PACA ») | Cible, **service non confirmé** |
| Villes citées | Marseille, Aubagne, La Ciotat, Cassis, Nice | Brief (« une idée ») | Cibles |
| « Auban » | Interprété comme Aubagne (13400) | Hypothèse | **À confirmer** |
| Enlèvement gratuit | Gratuit pour un véhicule complet (moteur, pot catalytique, batterie) et accessible dans des conditions normales | Demande du porteur de projet (« gratuit » plus présent) ; condition reprise de la pratique du secteur | **Condition à confirmer** par l'entreprise |

## 2. Informations manquantes (rien n'a été inventé)

Elles sont toutes `null` dans `src/config/company.ts` et s'affichent comme « à compléter » ou « à venir » sur les pages légales, ou sont masquées ailleurs.

- Raison sociale, forme juridique, SIRET, TVA, siège, directeur de la publication.
- E-mail de contact, WhatsApp (à n'activer que si le canal est réellement suivi), horaires.
- Adresse d'accueil du public, s'il en existe une. Sinon, l'entreprise reste « zone de service ».
- Centre VHU partenaire : raison sociale, numéro d'agrément préfectoral ou d'enregistrement ICPE, autorité de délivrance et commune. Il faut aussi un justificatif (arrêté, convention de partenariat).
- Conditions de gratuité ou tarifs réellement appliqués à l'enlèvement.
- Capacités logistiques : plateau, treuil, véhicule sans roues, hauteur maximale en sous-sol, délais habituels.
- Statut réel des activités : dépollution et démontage (faits par le partenaire ?), vente de pièces (qui vend, retrait ou envoi, garantie), rachat (le service existe-t-il ?).
- Hébergeur du site, prestataire d'e-mail et durée de conservation des demandes.
- Preuves commerciales : avis vérifiables, interventions documentées, photos réelles autorisées. Le bloc « preuves » est masqué tant qu'il est vide.
- Domaine définitif.

## 3. Sources réglementaires

**Limite importante.** Pendant le développement, l'accès réseau de l'environnement bloquait ces sites. Les contenus ont été rédigés à partir des **extraits indexés** de ces pages (moteur de recherche, 13/10/2026), et non d'une lecture directe. Avant publication, une personne doit relire chaque page en direct, corriger `src/content/regulatory.ts` si besoin, puis renseigner `checkedOn`.

| Contenu du site | Source | Relu en direct ? |
|---|---|---|
| Documents de remise : carte grise barrée « vendu/cédé le … pour destruction », cerfa 15776 (exemplaire 2), certificat de situation administrative de moins de 15 jours | service-public.gouv.fr/particuliers/vosdroits/F1468 | Non |
| Cas particuliers : perte, vol, gage ou opposition, véhicule étranger | F1468 (+ F34107 pour le gage) | Non |
| Gratuité de la remise d'un véhicule complet ; transport éventuellement à la charge du détenteur | F1468 | Non |
| REP depuis 2024 : collecte sans frais des véhicules complets sur leur lieu de détention, organisée par les producteurs | ecologie.gouv.fr/politiques-publiques/vehicules-hors-dusage-vhu | Non |
| Enregistrement ICPE depuis le 01/01/2025 ; anciens agréments valables tant qu'ils ne sont ni retirés ni suspendus | ecologie.gouv.fr (article R. 543-155-1 cité) | Non |
| Pièce d'identité « pouvant être demandée » | Pratique observée chez des acteurs du secteur, **pas** sur F1468 | À confirmer avec le centre partenaire |
| Étapes du traitement en centre VHU (dépollution, démontage, recyclage) | Connaissance générale de la filière | À faire valider par le centre partenaire |

Points à éclaircir avec le centre partenaire :
- Quelles pièces exige-t-il exactement ?
- Enregistre-t-il lui-même la déclaration de cession ?
- Est-il sous contrat avec l'éco-organisme ou des systèmes individuels de la REP ?
- Un arrêt du Conseil d'État du 30/07/2026 est signalé par une source secondaire (non vérifiée) sur les contrats avec les systèmes individuels.

Le mot « agréé » n'apparaît que dans l'encart du partenaire, conformément à la déclaration du porteur de projet. Il n'est **jamais** appliqué à la marque EcocarVHU. Si le partenaire relève du régime d'enregistrement ICPE (et non d'un ancien agrément), il faudra adapter la formulation : « centre VHU enregistré ».

## 4. Statut des pages

| Page | Publiée en production | Indexable | Remarque |
|---|---|---|---|
| `/`, `/enlevement-epave`, `/centre-vhu`, `/pieces-auto-occasion`, `/demande-piece`, `/professionnels`, `/contact`, `/zones-intervention` | Oui | Oui (si domaine et `SITE_ENV=production`) | Textes prudents ; conditions renvoyées à la confirmation |
| `/rachat-vehicule` | Oui | Oui | **Confirmer que le service existe.** Sinon, passer la page en brouillon |
| `/mentions-legales`, `/confidentialite`, `/conditions` | Oui (liens obligatoires) | **Non** (`draft: true`) | Champs « à compléter » visibles, bandeau « document provisoire » |
| `/conseils` et 4 guides | Non (404) | Non | Rédigés, en attente de relecture |
| `/demande/resultat/*` | Oui | Non | Pages techniques |

## 5. Statut des secteurs

> 13/10/2026 : le porteur de projet a confirmé le service et autorisé la publication de la région PACA et des 5 villes. brouillon séparé. Les éléments listés dans la colonne « Ce qui manque » restent utiles pour enrichir ces pages.

Statuts : **C** = cible souhaitée · **S** = service confirmé · **V** = contenu vérifié · **P** = publication autorisée.

| Secteur | C | S | V | P | Ce qui manque |
|---|---|---|---|---|---|
| PACA (région) | ✔ | ✔ | ✔ | ✔ | Départements et communes réellement desservis, centre de destination, conditions par zone |
| Marseille | ✔ | ✔ | ✔ | ✔ | Service confirmé et délais, moyens (sous-sols, hauteur), centre de destination, conditions, matière locale vérifiée |
| Aubagne | ✔ | ✔ | ✔ | ✔ | Idem + confirmation de l'hypothèse « Auban = Aubagne » |
| La Ciotat | ✔ | ✔ | ✔ | ✔ | Idem Marseille |
| Cassis | ✔ | ✔ | ✔ | ✔ | Idem Marseille |
| Nice | ✔ | ✔ | ✔ | ✔ | Idem + organisation propre aux Alpes-Maritimes |
| Var, Vaucluse, 04, 05 (départements) | ✔ | ✘ | — | — | Pas de page dédiée : section de la page PACA |

### Matière locale

Les pages de ville contiennent uniquement :
- des faits administratifs vérifiables : département, codes postaux, nombre d'arrondissements de Marseille ;
- des conseils pour décrire l'accès, formulés comme des questions à se poser (et non comme des affirmations sur la ville) ;
- des FAQ liées au secteur : arrondissement, sous-sol, fourrière, propriétaire absent.

Elles ne contiennent **pas** :
- d'anecdote touristique, de chiffre de population ou de liste de quartiers ;
- d'adresse locale, de point Google Maps ou de « centre VHU à {ville} » ;
- de faux cas client, de délai ou de nombre d'interventions.

Pour qu'une page de ville devienne réellement locale, il faudra ajouter :
- des contraintes d'accès constatées lors d'interventions réelles ;
- des questions effectivement reçues ;
- des photos autorisées ;
- l'organisation logistique confirmée (jours de passage, délai habituel).

### Publier une ville

1. Le service est confirmé par écrit : `serviceConfirmed: true`.
2. Le contenu est relu, les faits sont vérifiés et le texte est enrichi de matière réelle : `contentVerified: true`.
3. La publication est validée : `publicationApproved: true`.
4. Lancer `npm test`, faire une build de production, puis `npm run check:site`.

## 6. Accueil enrichi : informations à confirmer

L'accueil ne publie que des informations formulées comme vérifiées au cas par cas. Pour aller plus loin, il faudra fournir :

- **Logo** : fourni par le porteur de projet et intégré dans l'en-tête et le pied de page (`public/logo-ecocarvhu.png`).
- **Types de véhicules acceptés** (voitures, utilitaires, deux-roues, camping-cars, poids lourds) : non précisés sur le site tant qu'ils ne sont pas confirmés.
- **Rachat** : types de véhicules étudiés et confirmation que le service est proposé.
- **Professionnels** : modalités réelles (retrait, livraison, fréquence). Aucun tarif préférentiel ni délai prioritaire n'est annoncé.
- **Interlocuteur identifié** : nom ou fonction à afficher, si vous le souhaitez.
- **Photos réelles autorisées** (véhicule, camion, centre) : le hero utilise une illustration marquée « Illustration ». Une photo déposée dans `public/hero.*` la remplace.
- **Centre partenaire** : seules les informations fournies s'affichent. Sinon, une phrase indique qu'elles seront publiées.
- **Avis clients** : aucun n'est affiché. Le bloc `company.proofs` reste vide tant qu'il n'y a pas de preuve réelle et utilisable.
