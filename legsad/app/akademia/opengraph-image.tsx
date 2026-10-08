import { ImageResponse } from "next/og";
import { SITE_URL } from "../../lib/constants";

export const alt = "Akademia Piłkarska Legsad — GKS Legsad Kościelec";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoUrl = `${SITE_URL}/images/logo-white.png`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(135deg, #e02347 0%, #8f0f26 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl}
          width={620}
          height={620}
          style={{
            position: "absolute",
            right: -120,
            bottom: -160,
            opacity: 0.1,
            objectFit: "contain",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoUrl}
            width={170}
            height={170}
            style={{ objectFit: "contain", marginBottom: 28 }}
          />

          <div
            style={{
              display: "flex",
              fontSize: 72,
              color: "white",
              fontWeight: 900,
              textAlign: "center",
            }}
          >
            Akademia Piłkarska Legsad
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "rgba(255,255,255,0.85)",
              textTransform: "uppercase",
              letterSpacing: 4,
              marginTop: 20,
            }}
          >
            Skrzat · Żak · Orlik · Młodzik · Trampkarz
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}