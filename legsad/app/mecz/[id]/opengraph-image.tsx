import { ImageResponse } from "next/og";
import { getMatchById } from "../../../lib/queries";

export const alt = "Wynik meczu GKS Legsad Kościelec";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const match = await getMatchById(id);

  const home = match?.homeIsLegsad ? "Legsad Kościelec" : match?.opponent?.name ?? "?";
  const away = match?.homeIsLegsad ? match?.opponent?.name ?? "?" : "Legsad Kościelec";
  const score = match?.status === "finished" ? `${match.scoreHome} : ${match.scoreAway}` : "VS";

  const legsadLogoUrl = "https://gkslegsadkoscielec.netlify.app/images/logo-legsad.png";
  const opponentLogoUrl = match?.opponent?.logoUrl ?? legsadLogoUrl;

  const homeLogoUrl = match?.homeIsLegsad ? legsadLogoUrl : opponentLogoUrl;
  const awayLogoUrl = match?.homeIsLegsad ? opponentLogoUrl : legsadLogoUrl;

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
            fontSize: 24,
            color: "#c0132a",
            textTransform: "uppercase",
            letterSpacing: 4,
            marginBottom: 20,
          }}
        >
          {match?.league} · Kolejka {match?.round}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 60,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              width: 280,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 120,
                height: 120,
                borderRadius: "50%",
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={homeLogoUrl}
                width={90}
                height={90}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 32,
                color: "white",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              {home}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 72,
              color: "#c0132a",
              fontWeight: 900,
            }}
          >
            {score}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              width: 280,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 120,
                height: 120,
                borderRadius: "50%",
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={awayLogoUrl}
                width={90}
                height={90}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 32,
                color: "white",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              {away}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 20,
            color: "rgba(255,255,255,0.4)",
            marginTop: 40,
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          GKS Legsad Kościelec
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}