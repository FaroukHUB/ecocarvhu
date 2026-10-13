import { FeatureList } from "@/components/ui/FeatureList";

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

export function RequestSteps({
  steps = DEFAULT_STEPS,
  tone = "light",
  columns = 4,
}: {
  steps?: { title: string; text: string }[];
  tone?: "light" | "dark";
  columns?: 2 | 4;
}) {
  return <FeatureList items={steps} numbered tone={tone} columns={columns} />;
}
