import { ImageResponse } from "next/og";

export const alt = "A cleaner space. A better feeling. — Sparkly Space Professional Cleaning Services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", background: "#071B3A", color: "#fff", fontFamily: "Arial, sans-serif" }}>
        <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&auto=format&fit=crop&q=85" width="1200" height="630" style={{ position: "absolute", inset: 0, objectFit: "cover" }} />
        <div style={{ display: "flex", position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(7,27,58,.97) 0%, rgba(7,27,58,.83) 58%, rgba(7,27,58,.24) 100%)" }} />
        <div style={{ display: "flex", position: "relative", flexDirection: "column", justifyContent: "space-between", padding: "48px 66px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", background: "#fff", borderRadius: 14, padding: "8px 14px", width: 210, height: 82, alignItems: "center", justifyContent: "center" }}>
              <img src="https://sparklyspace.co.uk/logo.png" width="184" height="66" style={{ objectFit: "contain" }} />
            </div>
            <div style={{ display: "flex", marginLeft: 22, color: "#F5C451", fontSize: 18, fontWeight: 800, letterSpacing: 1 }}>PROFESSIONAL CLEANING SERVICES</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
            <div style={{ display: "flex", fontSize: 64, lineHeight: 1.08, fontWeight: 800, letterSpacing: -1.5 }}>A cleaner space. A better feeling.</div>
            <div style={{ display: "flex", marginTop: 24, fontSize: 27, lineHeight: 1.3, color: "#F1F5F9" }}>Meet the team making everyday spaces feel fresh, cared for and welcoming.</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid rgba(255,255,255,.3)", paddingTop: 18, fontSize: 21 }}>
            <div style={{ display: "flex" }}>We Clean, So You Can Focus on What Matters.</div>
            <div style={{ display: "flex", color: "#F5C451", fontWeight: 800 }}>sparklyspace.co.uk</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
