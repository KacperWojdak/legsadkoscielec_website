import { ImageResponse } from "next/og";
import { getSeasons } from "../../lib/queries";

export const alt = "Terminarz — GKS Legsad Kościelec";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const seasons = await getSeasons();
  const currentSeason = seasons.find((s: any) => s.isCurrent);

  const logoUrl = "https://gkslegsadkoscielec.netlify.app/images/logo-pink.png";

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
            width: 180,
            height: 180,
            borderRadius: "50%",
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
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
          Aktualności
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
          {currentSeason?.league ?? "GKS Legsad Kościelec"}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}