# EcocarVHU : benchmark et cadre réglementaire (recherche du 2026-10-13)

## 0. Avertissement méthodologique (à lire en premier)

- **Aucune page n'a pu être ouverte directement.** Dans cet environnement, WebFetch échoue (`getaddrinfo ENOTFOUND`) et curl est refusé par le proxy de sortie (`CONNECT tunnel failed, response 403`, politique réseau de l'environnement). C'est le cas pour tous les domaines testés : service-public.gouv.fr, ecologie.gouv.fr, autopieces-des-mureaux.fr, developers.google.com, support.google.com, web.dev, cnil.fr, nextjs.org et monservicepublic.gouv.mc.
- **Seul l'outil de recherche web fonctionnait.** Il renvoie des titres, des URL et des extraits résumés des pages indexées, souvent filtrés par domaine officiel. Les constats ci-dessous sont donc des **« constats indirects (extrait d'index, 2026-10-13) »** et non des lectures de page. Ils sont marqués :
  - **[C-ind]** : l'information figure dans l'extrait indexé de la page citée.
  - **[H]** : hypothèse ou interprétation.
  - **[À VÉRIFIER]** : il faut ouvrir la page en direct avant publication.
- Aucune donnée de trafic, de classement ou de conversion n'est avancée.
- **Action recommandée :** ajouter les domaines ci-dessus aux « Allowed domains » de l'environnement (réglages réseau de l'environnement cloud), puis relire en direct les pages de la partie B avant d'écrire les textes juridiques du site.

---

## PARTIE A : benchmark

### A.1 autopieces-des-mureaux.fr (Les Mureaux, 78)

Les URL relevées dans l'index sont :
- `/` (accueil)
- `/contact.html`
- `/mentions-legales.html`
- `/blog/`
- `/enlevement-epave-sans-carte-grise.html`
- `/epaviste/` (Paris et Île-de-France), avec des déclinaisons départementales : `/epaviste/yvelines-78.html`, `/epaviste/essonne-91.html`, `/epaviste/seine-et-marne-77.html`, `/epaviste/paris-75.html`, `/epaviste/hauts-de-seine-92.html`
- `/casse-auto/{ville}.html` : mureaux, plaisir, montreuil, etampes, suresnes, mouroux, ainsi que `yvelines-78`
- `/centre-vhu/saint-germain-les-arpajon.html`
- un article de blog `/blog/centre-vhu-agree-enlevement-epave-gratuit.html`

| Critère | Constat indirect [C-ind] |
|---|---|
| Organisation des services | Trois silos d'URL : `epaviste/` (par département), `casse-auto/` (par ville), `centre-vhu/` (par ville). S'y ajoutent une page thématique « sans carte grise » et un blog. |
| Preuve de confiance | Le numéro d'agrément préfectoral **PR7800005D** est affiché. Le site décrit les activités de dépollution, démontage et valorisation des pièces. |
| Contact mobile | Un fixe et un mobile sont affichés. Une page départementale mentionne le contact par **SMS ou téléphone** et un **formulaire en ligne de prise de rendez-vous**. Aucune mention de WhatsApp n'apparaît dans les extraits. |
| Informations demandées pour l'enlèvement | Carte grise originale, pièce d'identité, certificat de non-gage. **Incohérence** : une page indique « moins de 3 mois », une autre « moins de 15 jours ». Le formulaire VGE est mentionné pour les véhicules accidentés. Une page traite de l'enlèvement sans carte grise. |
| Gratuité | Le site la présente comme conditionnelle : elle dépend du type et de l'état du véhicule, de son accessibilité et de la distance. |
| Pièces | Le stock comprend notamment moteurs, boîtes de vitesses, carrosserie et jantes. Il faut vérifier la disponibilité avant de se déplacer. Le retrait se fait sur place, **sans vente en ligne ni livraison**. Aucun moteur de recherche de pièces n'apparaît dans les extraits. |
| Avis | Rien de visible dans les extraits [À VÉRIFIER]. |
| Pages locales | Plusieurs pages « casse auto {ville} » visent des villes éloignées (Montreuil, Étampes, Suresnes, Plaisir) mais renvoient toutes à l'adresse des Mureaux. Le résumé de l'index les qualifie de contenu générique [H : risque de pages satellites au sens de Google, voir B.4]. |
| Cohérence | Les horaires divergent selon les pages (lun-sam 9h-12h/13h30-18h, « 7j/7 », « sauf dimanche jusqu'à 18h30 »). L'adresse des mentions légales diffère de l'adresse affichée. |

Pour EcocarVHU, cela donne trois enseignements [H] :
1. L'agrément affiché est un bon signal de confiance.
2. Les silos par service sont lisibles.
3. Les pages-villes dupliquées, les incohérences d'horaires et de délais du non-gage, et l'adresse divergente sont les défauts à éviter.

### A.2 Acteurs PACA (Bouches-du-Rhône et Alpes-Maritimes)

**1. Many Car (manycar.fr), Marignane / Gignac-la-Nerthe (13)** [C-ind]
- Se présente comme « casse auto agréée VHU ». Aucun numéro d'agrément n'apparaît dans les extraits [À VÉRIFIER].
- La localisation est incohérente entre les pages (Marignane ou Gignac-la-Nerthe).
- Offre : pièces toutes marques et stock annoncé de moteurs et boîtes de vitesses avec garantie. Livraison annoncée dans toute la France.
- Recherche de pièces : par contact direct (téléphone). Aucun catalogue ni formulaire de recherche n'apparaît dans les extraits.
- Structure d'URL : très nombreuses pages longue traîne aux slugs du type `/pieces+auto+mecaniques+d+occasion+pas+cher+...+marseille-z35`, ou une page par marque (`...audi+marseille-z89`). [H] Cette production de pages en masse quasi identiques est un contre-modèle (B.4).

**2. InterCar (inter-car.fr), réseau national avec pages Marseille et Nice** [C-ind]
- URL : `/services/epaviste-automobile-marseille`, `/services/rachat-voiture-marseille`, `/services/epaviste-automobile-nice`, `/plan-du-site`, blog.
- Se dit « centre agréé préfectoral ». Aucun numéro d'agrément n'apparaît dans les extraits.
- Délai annoncé : intervention sous 24 à 48 h. Un certificat de destruction est annoncé.
- Gratuité conditionnelle, selon l'état du véhicule et s'il est complet (moteur, catalyseur, batterie).
- Liste de pièces publiée : carte grise barrée avec « cédé pour destruction », pièce d'identité, non-gage de moins de 15 jours.
- Les prix de rachat divergent selon les pages (« à partir de 109 € » contre « 49 € »), tout comme la taille annoncée du réseau.
- [H] Mélanger un réseau national et des pages-villes rend la promesse confuse. Des chiffres incohérents abîment la confiance.

**3. Rapid Épaviste Marseille / MK Auto (rapid-epaviste-marseille.fr), Aubagne (13)** [C-ind]
- URL : `/`, `/epaviste-aubagne/`, `/contact-et-devis-gratuit/`.
- Zone annoncée : 13 et 83, plus le Gard sur la page devis (incohérence).
- Gratuité « dans la plupart des cas » si le véhicule est complet et accessible. Des frais sont possibles pour un véhicule en sous-sol, sans roues ou d'accès difficile.
- Délai : 24 à 48 h. Dépollution dans un centre agréé à Aubagne et remise d'un certificat de destruction.
- Contact : un mobile et une adresse Gmail. Les horaires divergent (« 7j/7 » contre « lun-sam 8h-19h »).

**Nice (06), repéré mais non examiné en détail** [C-ind]
- Domicar Nice (domicar-nice.com) : dépôt annoncé dans un centre de la liste préfectorale.
- Manocar (`manocar.fr/nice/`) et une page InterCar Nice.
- Annuaires PagesJaunes Nice / Saint-Isidore, et Europ'Casse Nice via casse-auto.org.
- Aucun numéro d'agrément n'a été vérifié.

**Annuaires privés repérés** : centres-vhu-agrees.fr, centres-vhu-france.fr, casseautos.com.
- Ils listent des numéros au format **PR13000xxD** pour le 13.
- **Les numéros divergent d'un annuaire à l'autre pour un même exploitant** : ces sites ne sont pas fiables. Le seul référentiel à utiliser est la liste préfectorale ou officielle [À VÉRIFIER : un site tiers cite une liste publiée par France Titres].

**Constat transversal** [H fondée sur les extraits] :
- Promesses récurrentes : « gratuit », « 24-48 h », « certificat de destruction ».
- Défauts récurrents : numéros d'agrément rarement affichés, horaires, zones et prix incohérents, pages-villes en masse.
- Le recours à WhatsApp ne ressort d'aucun extrait.

### A.3 Décisions de conception pour EcocarVHU (tirées des observations)

1. **Afficher le statut réglementaire exact et vérifiable.** Indiquer le numéro d'agrément ou d'enregistrement ICPE du centre partenaire et sa raison sociale, avec un lien vers la source officielle. Dans le pied de page, la page « Qui sommes-nous » et le formulaire, distinguer clairement « EcocarVHU » de « centre VHU partenaire ».
2. **Une seule source de vérité pour les données d'entreprise** : horaires, zone, téléphone, délais, documents. Elles sont injectées dans toutes les pages, le JSON-LD et les mentions légales, pour éviter les incohérences constatées chez tous les concurrents.
3. **Un formulaire d'enlèvement en 3 étapes adapté au mobile** :
   - véhicule : immatriculation, marque et modèle, complet ou non, roule ou non ;
   - lieu et accès : commune ou code postal, sous-sol, roues, clés ;
   - documents : carte grise présente, perdue ou étrangère ; gage connu.
   Ajouter un envoi de photos facultatif. Une **qualification honnête de la gratuité** s'affiche selon les réponses (véhicule complet : moteur, catalyseur, batterie).
4. **Barre de contact collante sur mobile** : Appeler, SMS ou WhatsApp, Formulaire. Les liens `tel:` et `sms:` utilisent un seul numéro canonique. Proposer WhatsApp seulement si le canal est réellement suivi.
5. **Une checklist de documents conforme à service-public.gouv.fr** (B.1) : mention « vendu/cédé le … pour destruction », cerfa 15776, certificat de situation administrative de **moins de 15 jours**, ainsi que les cas perte, vol, véhicule étranger et gage. Ajouter un lien vers la fiche officielle et la date de dernière vérification. Ne jamais écrire « 3 mois ».
6. **Une page « Gratuité et conditions » factuelle.** Elle explique ce qu'est la remise gratuite d'un véhicule complet et quand des frais de transport ou d'accès peuvent s'appliquer. Aucune promesse de rachat chiffrée sans grille validée.
9. **Une recherche de pièces structurée** : marque, modèle, année, type de pièce et référence d'origine si connue, avec photo facultative. La disponibilité est confirmée par un humain. Indiquer clairement le mode de retrait ou de livraison et la garantie, seulement s'ils sont réels.
10. **Une preuve de traçabilité** : expliquer le certificat de destruction remis par le centre VHU et la déclaration de cession, avec un exemple anonymisé. Afficher des avis seulement s'ils sont vérifiables (fiche Google Business Profile liée), jamais d'avis auto-attribués en balisage.
11. **JSON-LD** : `AutomotiveBusiness` ou un sous-type de LocalBusiness avec `address`, `telephone`, `openingHoursSpecification` et `geo`. `areaServed` couvre les départements desservis, en cohérence avec une fiche GBP en zone de service. Pas d'`aggregateRating` auto-attribué.
12. **Performance et vie privée** : viser les seuils CWV « bons » au p75 mobile (B.6). Choisir une mesure d'audience configurée pour l'exemption CNIL (B.5), sans bannière inutile, sans prétendre à une « certification CNIL ».

---

## PARTIE B : faits officiels et réglementaires (constats indirects, à relire en direct)

### B.1 service-public.gouv.fr, fiche F1468 « Véhicule à détruire et certificat d'immatriculation »

URL : https://www.service-public.gouv.fr/particuliers/vosdroits/F1468. Sous-fiches indexées : F36516 (véhicule immatriculé en France) et la version anglaise `?lang=en`. L'index indique une mise à jour « il y a environ deux mois » [C-ind].

- **Qui détruit** : seuls les **centres VHU** peuvent détruire un véhicule usagé, considéré comme un déchet. Le propriétaire peut aussi passer par un **organisme agréé par le constructeur**, qui assure la collecte et le transport **sans frais** [C-ind].
- **Gratuité** : la remise d'un véhicule **complet** (moteur, pot catalytique, batterie) à un centre VHU est **gratuite**. Le transport jusqu'au centre peut rester à la charge du propriétaire [C-ind].
- **Avec carte grise** [C-ind] :
  - écrire lisiblement sur le certificat « Vendu le (date) pour destruction » ou « Cédé le (date) pour destruction », puis signer. Tous les cotitulaires signent, sauf procuration ;
  - remettre au centre l'**exemplaire n° 2 du cerfa 15776** (déclaration de cession) ;
  - fournir un **certificat de situation administrative de moins de 15 jours**, qui indique gage et opposition ;
  - le centre remet un **certificat de destruction**.
- **Carte grise perdue** : déclaration de perte et certificat de situation administrative de moins de 15 jours [C-ind].
- **Carte grise volée** : récépissé de plainte (police ou gendarmerie) et certificat de situation de moins de 15 jours [C-ind].
- **Carte grise retirée par les forces de l'ordre** : l'avis de retrait [C-ind].
- **Déclaration de cession** : elle peut en général être enregistrée directement par le centre VHU. Sinon, le propriétaire passe par le téléservice ANTS avec une copie numérique de l'exemplaire n° 1 du cerfa 15776. Le dépôt en préfecture, y compris par courrier, n'est plus possible. Un accompagnement est proposé dans les France services [C-ind].
- **Assurance** : prévenir l'assureur, copie du certificat de destruction à l'appui, pour résilier le contrat [C-ind].
- **Véhicule immatriculé à l'étranger** : remettre au centre VHU le certificat d'immatriculation étranger. En cas de perte, demander un duplicata ou une copie aux autorités du pays d'immatriculation. Les pièces exigées diffèrent [C-ind] [À VÉRIFIER : liste exacte].
- **Gage et opposition** (fiche F34107 liée) [C-ind] :
  - un gage lié à un crédit se lève après remboursement complet ;
  - une opposition VEI/VGE posée par un expert empêche la remise à un simple démolisseur tant que le classement n'est pas revu ;
  - une opposition consécutive à un accident n'empêche pas la cession en l'état à un professionnel ou à l'assureur.
  - [À VÉRIFIER : comment ces règles s'articulent avec la destruction.]
- **Formulaires repérés** [C-ind] : cerfa 15776 (déclaration de cession). Les cerfa 14365 (« déclaration d'achat pour destruction ») et 14366 (« centre VHU ») ont aussi été repérés dans l'index, sans que leur rôle actuel soit confirmé [À VÉRIFIER : sont-ils encore en vigueur ?].
- **Délais** : la seule durée relevée est la validité de **15 jours** du certificat de situation administrative. Aucun autre délai n'a été relevé [À VÉRIFIER].
- **Véhicule sans aucun document** : non couvert par les extraits obtenus [À VÉRIFIER].

### B.2 ecologie.gouv.fr, « Véhicules hors d'usage (VHU) »

URL : https://www.ecologie.gouv.fr/politiques-publiques/vehicules-hors-dusage-vhu [C-ind].

- **Ordres de grandeur** : environ 1,2 million de VHU par an, traités par environ 1 700 centres VHU et 60 broyeurs.
- **REP véhicules** : depuis le **1er janvier 2024**, la REP issue de la loi AGEC (2020) couvre les voitures particulières, camionnettes, deux et trois-roues et quadricycles. Les producteurs financent la collecte et le traitement, soit en **système individuel**, soit via un **éco-organisme**. Texte support : décret n° 2022-1495 du 24 novembre 2022 (Légifrance).
- **Collecte sans frais** : les producteurs doivent reprendre **sans frais le véhicule sur son lieu de détention** et le confier à un centre VHU, lorsque le véhicule est **complet (moteur, pot catalytique, batterie)**. Une « prime au retour » est évoquée dans le rapport CIFREP 2024.
- **Obligations des centres VHU** : reprendre gratuitement tout VHU qui leur est remis, quelle que soit la marque. Depuis le 1er janvier 2025, être sous contrat avec un éco-organisme agréé ou au moins un système individuel agréé.
- **Statut des centres** : depuis le **1er janvier 2025**, les centres VHU doivent être **enregistrés au titre des ICPE** (rubrique 2712). **Disposition transitoire** : un centre titulaire d'un **agrément préfectoral délivré avant le 31 décembre 2024 / 1er janvier 2025** peut continuer à exercer **tant que cet agrément n'est ni retiré ni suspendu** (article R. 543-155-1 du code de l'environnement, cité dans l'index). L'ancien agrément durait 6 ans au maximum, renouvelable.
- **Trouver un centre** : aucun annuaire officiel n'a été identifié avec certitude dans les extraits. Un site tiers cite une liste publiée par **France Titres** (ANTS) [À VÉRIFIER]. Il faut aussi consulter les listes préfectorales et les sites de l'éco-organisme ou des systèmes individuels. Les annuaires privés se contredisent (voir A.2).

### B.3 REP VHU : éco-organisme et systèmes individuels (sources secondaires, pas de page officielle lue)

- **Éco-organisme** : **« Recycler mon véhicule »**, agréé jusqu'au 31 décembre 2029, créé par environ 79 marques selon la presse spécialisée (actu-environnement.com). L'appellation « Recyclauto » n'a été trouvée dans aucune source officielle.
- **Systèmes individuels** : Renault, Volkswagen, Stellantis (Environnement Magazine, juillet 2024), Ford, Kia, Renault Trucks, Tesla (actu-environnement). Leur nombre varie selon les sources (13 ou 20) [À VÉRIFIER auprès de l'ADEME].
- Un cabinet d'avocats rapporte un arrêt du **Conseil d'État du 30 juillet 2026 (n° 502483)**. Selon lui, un centre VHU peut légalement traiter des véhicules relevant d'un système individuel sans contrat avec ce dernier [C-ind source secondaire, À VÉRIFIER sur Légifrance / conseil-etat.fr].
- [H] Conséquence pour le site : ne pas affirmer « enlèvement gratuit garanti partout ». Écrire plutôt « remise gratuite d'un véhicule complet au centre VHU ; collecte sans frais organisée par la filière selon les conditions en vigueur », et faire relire le texte.

### B.4 Google Search Central et Google Business Profile

- **Règles anti-spam** (https://developers.google.com/search/docs/essentials/spam-policies) [C-ind] :
  - les **pages satellites (doorway)** visent notamment les pages régionales ou par ville qui servent seulement à capter des requêtes et renvoient toutes vers une même destination, ainsi que les pages intermédiaires sans valeur propre ;
  - l'**abus de contenu à grande échelle** (politique de mars 2024) consiste à produire beaucoup de pages pour manipuler le classement sans aider l'utilisateur, **quel que soit le mode de production** : IA, humain ou mixte.
- **LocalBusiness** (https://developers.google.com/search/docs/appearance/structured-data/local-business) [C-ind] :
  - propriété **requise** : `address` (PostalAddress). `name` figure aussi dans le tableau [À VÉRIFIER : statut requis ou non] ;
  - propriétés **recommandées** : `geo` (au moins 5 décimales), `openingHoursSpecification`, `telephone` (avec indicatif pays), `priceRange`, `url`… ;
  - `aggregateRating` et `review` ne sont recommandés **que pour les sites qui évaluent d'autres entreprises** ;
  - utiliser le sous-type LocalBusiness le plus précis.
- **Fonctionnalités IA** (https://developers.google.com/search/docs/appearance/ai-features) [C-ind] :
  - aucune exigence ni optimisation spéciale n'est nécessaire pour AI Overviews et AI Mode ;
  - aucun balisage particulier ni fichier llms.txt n'est requis ;
  - les bonnes pratiques SEO de base s'appliquent, et les données structurées restent utiles pour les résultats enrichis.
- **Classement local GBP** (https://support.google.com/business/answer/7091) [C-ind] :
  - trois facteurs : **pertinence**, **distance** et **notoriété** (liens, nombre d'avis et notes, entre autres) ;
  - des informations complètes et exactes aident ;
  - un meilleur classement ne s'achète pas.
  - Fiche liée 10514743 : une **entreprise de zone de service** se déplace chez ses clients sans les recevoir à son adresse. Une entreprise hybride fait les deux.

### B.5 CNIL, mesure d'audience exemptée de consentement

URL : https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience [C-ind].

- Finalité **strictement limitée** à la mesure d'audience, pour le compte exclusif de l'éditeur.
- Production de **statistiques anonymes** uniquement.
- **Pas de recoupement** avec d'autres traitements et **pas de transmission à des tiers**.
- **Pas de suivi** de la navigation sur plusieurs sites ou applications : l'identifiant ne doit pas être commun à plusieurs sites.
- Recommandations : durée de vie des traceurs de **13 mois** au maximum, sans prolongation automatique ; conservation des données **25 mois** au maximum ; **information** des utilisateurs, par exemple dans la politique de confidentialité.
- Points de vigilance :
  - le fournisseur ne doit pas réutiliser les données (engagement contractuel) ;
  - attention aux **transferts hors UE** ;
  - la CNIL propose un **outil d'auto-évaluation** ;
  - le programme d'évaluation des solutions est **clos** ;
  - aucune solution ne peut se présenter comme « certifiée » ou « validée par la CNIL ».
- Textes de référence : lignes directrices de 2020 et recommandation consolidée (PDF CNIL 2026-01).

### B.6 web.dev, Web Vitals

URL : https://web.dev/articles/vitals [C-ind].

| Métrique | Bon | À améliorer | Mauvais |
|---|---|---|---|
| LCP | ≤ 2,5 s | entre les deux | > 4,0 s |
| INP | ≤ 200 ms | entre les deux | > 500 ms |
| CLS | ≤ 0,1 | entre les deux | > 0,25 |

- Une page atteint le seuil si **75 % des visites (p75)** sont « bonnes » pour la métrique, avec une segmentation mobile / ordinateur.
- L'INP se mesure sur le terrain. En laboratoire, le TBT sert d'indicateur de substitution.

### B.8 Next.js 16 (nextjs.org) [C-ind]

- **`generateMetadata`** : `params` (et `searchParams`) sont des **Promise** qu'il faut `await`. Accès synchrone jusqu'à la v14 ; asynchrone depuis la v15, obligatoire en v16.
- **`metadataBase`** : en général dans le layout racine. Une URL relative dans un champ URL de métadonnées sans `metadataBase` provoque une **erreur de build**. Une URL absolue l'ignore.
- **`'use cache'` dans `generateMetadata`** : les objets `URL` ne sont pas supportés par les fonctions de cache. Il faut renvoyer des chaînes.
- **`sitemap.ts`** : en v16, l'argument `id` de `sitemap` (avec `generateSitemaps`) **devient une Promise**. C'est un changement cassant listé dans le guide de mise à jour.
- **`robots.ts`** : aucun changement spécifique à la v16 n'a été relevé [À VÉRIFIER dans la doc embarquée `node_modules/next/dist/docs` si elle est disponible].

---

## Sources (URL vues dans les résultats d'index, consultées indirectement le 2026-10-13)

- **Réglementaire (France)** :
  - service-public.gouv.fr : F1468 (et `?lang=en`), F36516, F34107
  - formulaires.service-public.gouv.fr : cerfa 15776, 14365, 14366
  - ecologie.gouv.fr/politiques-publiques/vehicules-hors-dusage-vhu
  - legifrance.gouv.fr : décret 2022-1495, R543-155 et suivants
- **REP VHU (presse et avocats)** : actu-environnement.com, environnement-magazine.fr, gossement-avocats.com
- **Google** : developers.google.com (spam-policies, local-business, ai-features, ai-optimization-guide) ; support.google.com/business/answer/7091 et 10514743
- **CNIL** : cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience, FAQ, recommandation consolidée
- **web.dev** : web.dev/articles/vitals
- **Next.js** : nextjs.org (generate-metadata, sitemap, upgrading/version-16)
- **Benchmark** : autopieces-des-mureaux.fr, manycar.fr, inter-car.fr, rapid-epaviste-marseille.fr ; domicar-nice.com, manocar.fr (repérés seulement)
