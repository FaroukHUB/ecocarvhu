import { FeatureList } from "@/components/ui/FeatureList";
import { TruckIcon } from "@/components/ui/icons";

const DEFAULT_STEPS = [
  {
    title: "Vous décrivez",
    text: "Le véhicule, son état, son accès et vos documents. Les photos sont facultatives mais utiles.",
  },
  {
    title: "L'équipe vérifie",
    text: "Faisabilité, matériel à prévoir, situation administrative. Rien n'est engagé à ce stade.",
  },
  {
    title: "Les conditions sont confirmées",
    text: "Vous recevez les conditions et une proposition de rendez-vous. Vous acceptez ou non.",
  },
  {
    title: "Enlèvement et suivi",
    text: "Documents remis, véhicule chargé et conduit au centre VHU partenaire, qui délivre le certificat de destruction.",
  },
];

/** Étapes en cartes numérotées, avec une route animée (dépanneuse) au-dessus sur grand écran. */
export function RequestSteps({
  steps = DEFAULT_STEPS,
  tone = "light",
  columns = 4,
}: {
  steps?: { title: string; text: string }[];
  tone?: "light" | "dark";
  columns?: 2 | 4;
}) {
  const dark = tone === "dark";
  return (
    <div>
      {columns === 4 ? (
        <div aria-hidden="true" className="relative mb-6 hidden h-10 lg:block">
          <svg className="absolute inset-x-0 top-1/2 h-1 w-full -translate-y-1/2" preserveAspectRatio="none" viewBox="0 0 100 2">
            <line
              x1="0"
              y1="1"
              x2="100"
              y2="1"
              className="flow"
              stroke={dark ? "#25d366" : "#0f7a45"}
              strokeOpacity="0.6"
              strokeWidth="2"
              strokeDasharray="1.5 1.5"
              vectorEffect="non-scaling-stroke"
              style={{ strokeDasharray: "6 8" }}
            />
          </svg>
          <span
            className={`drive absolute top-0 flex h-10 w-10 items-center justify-center rounded-full ${
              dark ? "bg-lime text-ink" : "bg-ink text-lime"
            }`}
          >
            <TruckIcon className="h-5 w-5" />
          </span>
        </div>
      ) : null}
      <FeatureList items={steps} numbered tone={tone} columns={columns} />
    </div>
  );
}
