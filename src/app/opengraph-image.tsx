import { ImageResponse } from "next/og";

export const alt = "EcocarVHU — enlèvement d'épave et pièces auto d'occasion en Provence-Alpes-Côte d'Azur";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Image de partage générée au build (aucune photo, aucune donnée inventée). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#1b1f23",
          color: "white",
        }}
      >
        <div style={{ display: "flex", fontSize: 76, fontWeight: 800 }}>
          Ecocar<span style={{ color: "#3fd17a" }}>VHU</span>
        </div>
        <div style={{ marginTop: 28, fontSize: 44, lineHeight: 1.2, maxWidth: 950 }}>
          Enlèvement d&apos;épave et pièces auto d&apos;occasion en Provence-Alpes-Côte d&apos;Azur
        </div>
        <div style={{ marginTop: 40, fontSize: 30, color: "#bfe9cf" }}>
          Conditions confirmées avant tout déplacement
        </div>
      </div>
    ),
    size,
  );
}
