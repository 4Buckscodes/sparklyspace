import { ImageResponse } from "next/og";

export const alt =
  "Sparkly Space — professional home and commercial cleaning across Bournemouth, Poole and Christchurch.";
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
          padding: "64px 76px",
          background:
            "linear-gradient(125deg, #071B3A 0%, #0B3762 58%, #0D5570 100%)",
          color: "#FFFFFF",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 18,
              background: "#F5C451",
              color: "#071B3A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 37,
              fontWeight: 900,
            }}
          >
            ✦
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 31, fontWeight: 800, letterSpacing: 1.5 }}>
              SPARKLY SPACE
            </div>
            <div style={{ fontSize: 15, letterSpacing: 4, color: "#C7D9E8" }}>
              CLEANING SERVICES
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
          <div
            style={{
              display: "flex",
              fontSize: 67,
              lineHeight: 1.08,
              fontWeight: 800,
              letterSpacing: -2,
            }}
          >
            A cleaner space.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 67,
              lineHeight: 1.08,
              fontWeight: 800,
              letterSpacing: -2,
              color: "#F5C451",
            }}
          >
            A better feeling.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 27,
              lineHeight: 1.4,
              color: "#E4EDF5",
            }}
          >
            Thoughtful, reliable cleaning for homes and businesses.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.25)",
            paddingTop: 22,
            fontSize: 22,
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
