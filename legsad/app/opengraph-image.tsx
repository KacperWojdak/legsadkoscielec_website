import { ImageResponse } from "next/og";

export const alt = "GKS Legsad Kościelec";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoUrl = "https://gkslegsadkoscielec.netlify.app/images/logo-hero.png";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0d0d0d 0%, #2a0509 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 220,
            height: 220,
            borderRadius: "50%",
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoUrl}
            width={170}
            height={170}
            style={{ objectFit: "contain" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 64,
            color: "white",
            fontWeight: 900,
            textAlign: "center",
            letterSpacing: 2,
          }}
        >
          GKS Legsad Kościelec
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#c0132a",
            textTransform: "uppercase",
            letterSpacing: 4,
            marginTop: 16,
          }}
        >
          Oficjalna strona klubu
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}