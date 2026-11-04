import { ImageResponse } from "next/og";

export const alt = "The Right Clean for Every Space. — Sparkly Space | We Clean, So You Can Focus on What Matters.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", background: "#071B3A", color: "#fff", fontFamily: "Arial, sans-serif" }}>
        <img src="https://images.unsplash.com/photo-1563453392212-326f5e854473?w=1200&auto=format&fit=crop&q=85" width="1200" height="630" style={{ position: "absolute", inset: 0, objectFit: "cover" }} />
        <div style={{ display: "flex", position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(7,27,58,.97) 0%, rgba(7,27,58,.88) 52%, rgba(7,27,58,.18) 100%)" }} />
        <div style={{ display: "flex", position: "relative", flexDirection: "column", justifyContent: "space-between", padding: "48px 66px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", background: "#fff", borderRadius: 14, padding: "8px 14px", width: 210, height: 82, alignItems: "center", justifyContent: "center" }}>
              <img src="https://sparklyspace.co.uk/logo.png" width="184" height="66" style={{ objectFit: "contain" }} />
            </div>
            <div style={{ display: "flex", marginLeft: 22, color: "#F5C451", fontSize: 17, fontWeight: 800, letterSpacing: 1 }}>"OUR CLEANING SERVICES"</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 850 }}>
            <div style={{ display: "flex", fontSize: 63, lineHeight: 1.08, fontWeight: 800, letterSpacing: -1.5 }}>The Right Clean for Every Space.</div>
            <div style={{ display: "flex", marginTop: 24, fontSize: 26, lineHeight: 1.32, color: "#F1F5F9" }}>Explore home, deep, end-of-tenancy, holiday-let and commercial cleaning services.</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px solid rgba(255,255,255,.32)", paddingTop: 18, fontSize: 19 }}>
            <div style={{ display: "flex", color: "#F1F5F9" }}>We Clean, So You Can Focus on What Matters.</div>
            <div style={{ display: "flex", color: "#F5C451", fontWeight: 800 }}>sparklyspace.co.uk</div>
          </div>
        </div>
        <div style={{ display: "flex", position: "absolute", right: 48, bottom: 112, background: "#F5C451", color: "#071B3A", borderRadius: 36, padding: "13px 22px", fontSize: 18, fontWeight: 800 }}>GET YOUR FREE QUOTE</div>
      </div>
    ),
    { ...size }
  );
}
