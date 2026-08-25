import { ImageResponse } from "next/og";

// Route segment config
export const alt =
  "Sparkly Space Cleaning Services — Bournemouth, Poole & Christchurch";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded 1200x630 social-share card, generated at build time.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0f172a 0%, #082f49 55%, #0c4a6e 100%)",
          color: "white",
          fontFamily: "sans-serif",
          padding: "72px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 92,
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          <span style={{ color: "#f59e0b" }}>Sparkly</span>
          <span style={{ color: "#e0f2fe", marginLeft: 22 }}>Space</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 22,
            fontSize: 42,
            fontWeight: 600,
            color: "#7dd3fc",
          }}
        >
          Professional Cleaning Services
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 26,
            fontSize: 32,
            color: "#cbd5e1",
          }}
        >
          Bournemouth · Poole · Christchurch
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 44,
            fontSize: 24,
            color: "#94a3b8",
          }}
        >
          Vetted &amp; Fully Insured · Eco-Friendly Options · BH1–BH23
        </div>
      </div>
    ),
    { ...size }
  );
}
