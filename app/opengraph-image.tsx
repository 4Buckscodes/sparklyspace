import { ImageResponse } from "next/og";

export const alt =
  "Sparkly Space — We Clean, So You Can Focus on What Matters. Professional home and commercial cleaning across Bournemouth, Poole and Christchurch.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#071B3A", color: "#fff", fontFamily: "Arial, sans-serif" }}>
        <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&auto=format&fit=crop&q=85" width="660" height="630" style={{ position: "absolute", right: 0, top: 0, objectFit: "cover" }} />
        <div style={{ position: "absolute", right: 0, top: 0, width: 700, height: 630, background: "linear-gradient(90deg, #071B3A 0%, rgba(7,27,58,.88) 15%, rgba(7,27,58,.12) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(7,27,58,.92) 0%, transparent 42%)" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "48px 62px", width: "100%", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", borderRadius: 16, padding: "8px 16px", width: 230, height: 88 }}>
              <img src="https://sparklyspace.co.uk/logo.png" width="198" height="72" style={{ objectFit: "contain" }} />
            </div>
            <div style={{ display: "flex", marginLeft: 20, fontSize: 18, fontWeight: 700, letterSpacing: 1.5, color: "#F5C451" }}>PROFESSIONAL CLEANING SERVICES</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
            <div style={{ display: "flex", fontSize: 65, lineHeight: 1.08, fontWeight: 800, letterSpacing: -2 }}>We Clean, So You Can</div>
            <div style={{ display: "flex", fontSize: 68, lineHeight: 1.08, fontWeight: 800, letterSpacing: -2, color: "#F5C451" }}>Focus on What Matters.</div>
            <div style={{ display: "flex", marginTop: 22, fontSize: 24, color: "#F1F5F9" }}>Reliable home and commercial cleaning, made simple.</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "2px solid rgba(255,255,255,.3)", paddingTop: 18, fontSize: 20 }}>
            <div style={{ display: "flex", color: "#F1F5F9" }}>Bournemouth · Poole · Christchurch</div>
            <div style={{ display: "flex", color: "#F5C451", fontWeight: 800 }}>sparklyspace.co.uk</div>
          </div>
        </div>
        <div style={{ position: "absolute", right: 48, bottom: 112, display: "flex", background: "#F5C451", color: "#071B3A", borderRadius: 40, padding: "14px 24px", fontSize: 20, fontWeight: 800 }}>BOOK YOUR CLEAN TODAY</div>
      </div>
    ),
    { ...size }
  );
}
