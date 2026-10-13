"use client";

import { useState } from "react";
import { FUEL_OPTIONS } from "@/lib/forms/options";
import { OTHER, VEHICLE_BRANDS, VEHICLE_MODELS, YEAR_OPTIONS } from "@/content/vehicles";
import { SelectField, TextField } from "./fields";

const BRAND_OPTIONS = [
  ...VEHICLE_BRANDS.map((b) => ({ value: b, label: b })),
  { value: OTHER, label: "Autre marque" },
];

/**
 * Marque, modèle, année (et, selon le formulaire, énergie et motorisation)
 * en listes déroulantes. « Autre » ouvre un champ libre : personne n'est
 * bloqué par une liste incomplète. Les noms de champs envoyés restent
 * `brand`, `model`, `year`, `fuel`, `engine` (validation serveur inchangée).
 */
export function VehicleFields({
  yearRequired = false,
  showFuel = false,
  showEngine = false,
}: {
  yearRequired?: boolean;
  showFuel?: boolean;
  showEngine?: boolean;
}) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  const brandIsOther = brand === OTHER;
  const models = brand && !brandIsOther ? VEHICLE_MODELS[brand] ?? [] : [];
  const modelOptions = [
    ...models.map((m) => ({ value: m, label: m })),
    { value: OTHER, label: "Autre modèle" },
  ];
  const modelIsOther = brandIsOther || model === OTHER;

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-3">
          <SelectField
            name={brandIsOther ? "brandChoice" : "brand"}
            label="Marque"
            required
            options={BRAND_OPTIONS}
            placeholder="Choisir la marque…"
            onValueChange={(v) => {
              setBrand(v);
              setModel("");
            }}
          />
          {brandIsOther ? <TextField name="brand" label="Précisez la marque" required /> : null}
        </div>
        <div className="space-y-3">
          {brandIsOther ? (
            <TextField name="model" label="Modèle" required placeholder="ex. le nom sur la carte grise" />
          ) : (
            <SelectField
              key={brand || "aucune"}
              name={modelIsOther ? "modelChoice" : "model"}
              label="Modèle"
              required
              disabled={!brand}
              options={modelOptions}
              placeholder={brand ? "Choisir le modèle…" : "Choisissez d'abord la marque"}
              onValueChange={setModel}
            />
          )}
          {!brandIsOther && modelIsOther ? <TextField name="model" label="Précisez le modèle" required /> : null}
        </div>
      </div>

      <div className={`grid gap-5 ${showFuel ? "sm:grid-cols-2" : "sm:max-w-xs"}`}>
        <SelectField
          name="year"
          label="Année"
          required={yearRequired}
          options={YEAR_OPTIONS}
          placeholder={yearRequired ? "Choisir l'année…" : "Je ne sais pas"}
          hint="Date de 1re mise en circulation (carte grise, rubrique B)."
        />
        {showFuel ? <SelectField name="fuel" label="Énergie" options={FUEL_OPTIONS} /> : null}
      </div>

      {showEngine ? (
        <TextField
          name="engine"
          label="Motorisation"
          placeholder="ex. 1.5 dCi 85 ch, boîte manuelle"
          hint="Puissance ou cylindrée si vous la connaissez : indispensable pour les pièces moteur et mécaniques."
        />
      ) : null}
    </>
  );
}
