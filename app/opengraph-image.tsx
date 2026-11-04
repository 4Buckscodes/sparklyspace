import { ImageResponse } from "next/og";

export const alt =
  "Sparkly Space — We Clean, So You Can Focus on What Matters. Professional home and commercial cleaning across Bournemouth, Poole and Christchurch.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "54px 76px",
          background:
            "linear-gradient(125deg, #071B3A 0%, #0B3762 58%, #0D5570 100%)",
          color: "#FFFFFF",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#FFFFFF",
              borderRadius: 18,
              padding: "12px 20px",
              width: 250,
              height: 105,
            }}
          >
            <img
              src="https://sparklyspace.co.uk/logo.png"
              width="210"
              height="80"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1040 }}>
          <div
            style={{
              display: "flex",
              fontSize: 62,
              lineHeight: 1.13,
              fontWeight: 800,
              letterSpacing: -1.8,
            }}
          >
            We Clean, So You Can
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              lineHeight: 1.13,
              fontWeight: 800,
              letterSpacing: -2,
              color: "#F5C451",
            }}
          >
            Focus on What Matters.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 25,
              lineHeight: 1.35,
              color: "#E4EDF5",
            }}
          >
            Reliable home and commercial cleaning, made simple.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.25)",
            paddingTop: 20,
            fontSize: 21,
            color: "#E4EDF5",
          }}
        >
          <div style={{ display: "flex" }}>
            Bournemouth · Poole · Christchurch
          </div>
          <div style={{ display: "flex", color: "#F5C451", fontWeight: 700 }}>
            sparklyspace.co.uk
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
