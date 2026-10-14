"use client";

import { useEffect, useRef } from "react";
import {
  ACCESS_OPTIONS,
  BUYBACK_DOC_OPTIONS,
  CONDITION_OPTIONS,
  HOLDER_OPTIONS,
  MARSEILLE_ARRONDISSEMENTS,
  MECHANICAL_OPTIONS,
  MOVABLE_OPTIONS,
  PRO_ACTIVITY_OPTIONS,
  PRO_REQUEST_OPTIONS,
  REGISTRATION_DOC_OPTIONS,
  WHEELS_OPTIONS,
  VEHICLE_CHECK_KEY,
  YES_NO_UNKNOWN_OPTIONS,
} from "@/lib/forms/options";
import { ChoiceGroup, PhotoField, SelectField, TextArea, TextField } from "./fields";
import { FormShell } from "./FormShell";
import { VehicleFields } from "./VehicleFields";

export interface FileLimitsProps {
  maxFileBytes: number;
  maxTotalBytes: number;
}

const POSTAL = { inputMode: "numeric" as const, pattern: "[0-9]{5}", maxLength: 5, autoComplete: "postal-code" };
const PHONE_HINT = "Pour vous rappeler et confirmer les conditions.";

function ContactFields({ phoneRequired = true, emailHint }: { phoneRequired?: boolean; emailHint?: string }) {
  return (
    <>
      <TextField name="name" label="Nom" required autoComplete="name" />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          name="phone"
          label="Téléphone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required={phoneRequired}
          hint={phoneRequired ? PHONE_HINT : "Téléphone ou e-mail : au moins l'un des deux."}
        />
        <TextField name="email" label="E-mail" type="email" inputMode="email" autoComplete="email" hint={emailHint} />
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Enlèvement                                                          */
/* ------------------------------------------------------------------ */

export function PickupForm({
  pagePath,
  sector,
  defaultCity,
  defaultPostalCode,
  askArrondissement,
  limits,
}: {
  pagePath: string;
  sector?: string;
  defaultCity?: string;
  defaultPostalCode?: string;
  askArrondissement?: boolean;
  limits: FileLimitsProps;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);

  // Reprend les réponses du module "état et accès" s'il a été utilisé.
  useEffect(() => {
    let saved: Record<string, string> = {};
    try {
      saved = JSON.parse(sessionStorage.getItem(VEHICLE_CHECK_KEY) ?? "{}");
    } catch {
      return;
    }
    const form = wrapRef.current?.querySelector("form");
    if (!form) return;
    const set = (name: string, value?: string) => {
      const el = form.elements.namedItem(name) as RadioNodeList | HTMLInputElement | null;
      if (el && value && !el.value) el.value = value;
    };
    set("wheels", saved.wheels);
    set("keys", saved.keys);
    set("movable", saved.movable);
    set("access", saved.access === "sous-sol" || saved.access === "difficile" ? saved.access : undefined);
    set("registrationDoc", saved.registration === "oui" ? "oui" : undefined);
  }, []);

  return (
    <div ref={wrapRef}>
      <FormShell
        formType="enlevement"
        sector={sector}
        pagePath={pagePath}
        submitLabel="Envoyer ma demande d'enlèvement"
        successTitle="Votre demande a été transmise"
        successText="Elle a été acceptée par notre service d'envoi et transmise à l'équipe. Ce n'est pas encore un rendez-vous : vous serez recontacté pour confirmer la faisabilité, les conditions et la date. Pour une situation urgente, appelez directement."
        steps={[
          {
            title: "Le véhicule et son emplacement",
            content: (
              <>
                <div className="grid gap-5 sm:grid-cols-[10rem_1fr]">
                  <TextField name="postalCode" label="Code postal" required defaultValue={defaultPostalCode} {...POSTAL} />
                  <TextField name="city" label="Commune" required defaultValue={defaultCity} autoComplete="address-level2" />
                </div>
                {askArrondissement ? (
                  <SelectField
                    name="arrondissement"
                    label="Arrondissement (Marseille)"
                    options={MARSEILLE_ARRONDISSEMENTS}
                    hint="Facultatif : l'adresse exacte n'est demandée qu'au moment du rendez-vous."
                  />
                ) : null}
                <TextField
                  name="locationDetail"
                  label="Précision sur l'emplacement"
                  hint="Quartier, nom de la résidence, zone d'activités… pas besoin du numéro de rue à ce stade."
                />
                <VehicleFields />
                <ChoiceGroup name="condition" legend="État du véhicule" options={CONDITION_OPTIONS} required columns={4} />
                <TextArea name="conditionDetail" label="Précision sur l'état" rows={2} placeholder="ex. choc avant, moteur cassé, immobilisé depuis 2 ans…" />
              </>
            ),
          },
          {
            title: "État et accès",
            content: (
              <>
                <ChoiceGroup name="wheels" legend="Les roues sont-elles présentes ?" options={WHEELS_OPTIONS} required columns={3} />
                <ChoiceGroup name="keys" legend="Avez-vous les clés ?" options={YES_NO_UNKNOWN_OPTIONS} required columns={3} />
                <ChoiceGroup name="movable" legend="Le véhicule peut-il être déplacé ?" options={MOVABLE_OPTIONS} required columns={3} />
                <ChoiceGroup name="access" legend="Où se trouve-t-il ?" options={ACCESS_OPTIONS} required columns={2} />
                <TextArea
                  name="accessDetail"
                  label="Précisions sur l'accès"
                  rows={3}
                  placeholder="ex. sous-sol niveau -2, hauteur 1,90 m, badge chez le gardien"
                />
                <PhotoField
                  label="Photos du véhicule et de l'accès"
                  hint="Le véhicule de trois quarts et l'entrée de l'emplacement suffisent. Aucune photo de document."
                  maxFiles={4}
                  {...limits}
                />
              </>
            ),
          },
          {
            title: "Documents et coordonnées",
            content: (
              <>
                <ChoiceGroup
                  name="registrationDoc"
                  legend="Avez-vous la carte grise ?"
                  options={REGISTRATION_DOC_OPTIONS}
                  required
                  columns={3}
                  hint="Ne l'envoyez pas : elle sera vérifiée au rendez-vous."
                />
                <ChoiceGroup name="holder" legend="Qui est titulaire de la carte grise ?" options={HOLDER_OPTIONS} required columns={2} />
                <ChoiceGroup name="pledge" legend="Le véhicule est-il gagé (crédit en cours) ?" options={YES_NO_UNKNOWN_OPTIONS} columns={3} />
                <ContactFields />
                <TextField
                  name="availability"
                  label="Disponibilités souhaitées"
                  hint="Un créneau souhaité n'est pas un rendez-vous confirmé : l'équipe vous propose une date."
                  placeholder="ex. en semaine après 17 h, samedi matin"
                />
                <TextArea name="comment" label="Commentaire" rows={3} />
              </>
            ),
          },
        ]}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pièce                                                               */
/* ------------------------------------------------------------------ */

export function PartForm({ pagePath, limits }: { pagePath: string; limits: FileLimitsProps }) {
  return (
    <FormShell
      formType="piece"
      pagePath={pagePath}
      submitLabel="Envoyer ma demande de pièce"
      successTitle="Votre demande de pièce a été transmise"
      successText="L'équipe vérifie la disponibilité et la compatibilité avant de vous répondre. Aucune pièce n'est réservée ni vendue à ce stade."
      steps={[
        {
          title: "Votre véhicule",
          content: (
            <>
              <VehicleFields showFuel showEngine />
              <TextField
                name="plate"
                label="Immatriculation"
                maxLength={12}
                hint="Facultatif. Elle aide l'équipe à vérifier manuellement la compatibilité ; aucune recherche automatique n'est faite."
              />
            </>
          ),
        },
        {
          title: "La pièce recherchée",
          content: (
            <>
              <TextField name="partName" label="Nom de la pièce" placeholder="ex. rétroviseur gauche, alternateur" hint="Vous ne le connaissez pas ? Décrivez votre besoin ci-dessous." />
              <TextArea
                name="partDescription"
                label="Description du besoin"
                rows={4}
                placeholder="ex. le cache sous le pare-chocs avant côté passager est arraché"
                hint="Obligatoire si vous n'indiquez pas le nom de la pièce."
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField name="oemRef" label="Référence constructeur" hint="Souvent sur une étiquette de la pièce." />
                <TextField name="quantity" label="Quantité" inputMode="numeric" maxLength={3} />
              </div>
              <PhotoField
                label="Photos de la pièce ou de sa référence"
                hint="Une photo nette de l'étiquette ou de l'emplacement aide à identifier la pièce."
                maxFiles={3}
                {...limits}
              />
            </>
          ),
        },
        {
          title: "Vos coordonnées",
          content: (
            <>
              <ContactFields phoneRequired={false} />
              <TextField name="postalCode" label="Code postal" {...POSTAL} hint="Pour étudier le retrait ou l'envoi." />
              <TextArea name="comment" label="Commentaire" rows={3} />
            </>
          ),
        },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Rachat                                                              */
/* ------------------------------------------------------------------ */

export function BuybackForm({ pagePath, limits }: { pagePath: string; limits: FileLimitsProps }) {
  return (
    <FormShell
      formType="rachat"
      pagePath={pagePath}
      submitLabel="Demander l'étude de rachat"
      successTitle="Votre demande d'étude a été transmise"
      successText="L'équipe l'examine et revient vers vous. Une étude n'est pas une offre : aucun prix n'est garanti avant l'examen du véhicule."
      steps={[
        {
          title: "Le véhicule",
          content: (
            <>
              <VehicleFields yearRequired showFuel />
              <div className="sm:max-w-xs">
                <TextField name="mileage" label="Kilométrage" required inputMode="numeric" maxLength={9} placeholder="ex. 185000" />
              </div>
            </>
          ),
        },
        {
          title: "État",
          content: (
            <>
              <ChoiceGroup name="mechanical" legend="État mécanique" options={MECHANICAL_OPTIONS} required columns={2} />
              <TextArea name="damage" label="Dommages et défauts connus" rows={3} placeholder="ex. choc arrière droit, voyant moteur allumé" />
              <ChoiceGroup name="keys" legend="Avez-vous les clés ?" options={YES_NO_UNKNOWN_OPTIONS} required columns={3} />
              <ChoiceGroup name="registrationDoc" legend="Carte grise" options={BUYBACK_DOC_OPTIONS} required columns={3} />
              <PhotoField
                label="Photos du véhicule"
                hint="Avant, arrière, les deux côtés, l'intérieur et le compteur si possible."
                maxFiles={6}
                {...limits}
              />
            </>
          ),
        },
        {
          title: "Vos coordonnées",
          content: (
            <>
              <div className="grid gap-5 sm:grid-cols-[10rem_1fr]">
                <TextField name="postalCode" label="Code postal" required {...POSTAL} />
                <TextField name="city" label="Commune" required autoComplete="address-level2" />
              </div>
              <ContactFields />
              <TextArea name="comment" label="Commentaire" rows={3} />
            </>
          ),
        },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Professionnels                                                      */
/* ------------------------------------------------------------------ */

export function ProForm({ pagePath }: { pagePath: string }) {
  return (
    <FormShell
      formType="pro"
      pagePath={pagePath}
      submitLabel="Envoyer la demande professionnelle"
      successTitle="Votre demande a été transmise"
      successText="Un interlocuteur l'étudie et vous recontacte pour préciser les véhicules, l'accès et les modalités."
      steps={[
        {
          title: "Demande professionnelle",
          content: (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField name="company" label="Entreprise" required autoComplete="organization" />
                <TextField name="contactName" label="Interlocuteur" required autoComplete="name" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <SelectField name="activity" label="Activité" options={PRO_ACTIVITY_OPTIONS} />
                <SelectField name="requestType" label="Objet de la demande" options={PRO_REQUEST_OPTIONS} required />
              </div>
              <TextArea
                name="references"
                label="Liste des véhicules"
                rows={6}
                placeholder={"Une ligne par véhicule, ex. :\nClio IV 2015 — ne roule pas — clés OK — carte grise OK\nKangoo 2009 — accidenté — sans clés"}
              />
              <TextArea name="message" label="Message" rows={4} hint="Obligatoire si vous ne listez pas de véhicules." />
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField name="phone" label="Téléphone" type="tel" inputMode="tel" autoComplete="tel" required />
                <TextField name="email" label="E-mail" type="email" inputMode="email" autoComplete="email" />
              </div>
              <TextField name="postalCode" label="Code postal de l'atelier" {...POSTAL} />
            </>
          ),
        },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export function ContactForm({ pagePath }: { pagePath: string }) {
  return (
    <FormShell
      formType="contact"
      pagePath={pagePath}
      submitLabel="Envoyer le message"
      successTitle="Votre message a été transmis"
      successText="Il a été accepté par notre service d'envoi. L'équipe vous répond dès que possible."
      steps={[
        {
          title: "Votre message",
          content: (
            <>
              <ContactFields phoneRequired={false} />
              <TextField name="subject" label="Sujet" />
              <TextArea name="message" label="Message" required rows={6} />
            </>
          ),
        },
      ]}
    />
  );
}
