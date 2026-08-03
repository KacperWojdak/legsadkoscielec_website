import { ImageResponse } from "next/og";

export const alt = "Galeria — GKS Legsad Kościelec";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoUrl = "https://gkslegsadkoscielec.netlify.app/images/logo-pink.png";
  const brushUrl = "https://gkslegsadkoscielec.netlify.app/images/effects/brush-diagonal.png";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(135deg, #0d0d0d 0%, #2a0509 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <img
          src={brushUrl}
          width={700}
          height={1008}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            opacity: 0.3,
            objectFit: "cover",
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
          <div
            style={{
              display: "flex",
              width: 180,
              height: 180,
              borderRadius: "50%",
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <img src={logoUrl} width={140} height={140} style={{ objectFit: "contain" }} />
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 56,
              color: "white",
              fontWeight: 900,
            }}
          >
            Galeria
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#c0132a",
              textTransform: "uppercase",
              letterSpacing: 3,
              marginTop: 16,
            }}
          >
            GKS Legsad Kościelec
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}