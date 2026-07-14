import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Nieprawidłowy sekret" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const type = body._type;

    const pathsToRevalidate: string[] = ["/"];

    if (type === "match") {
      pathsToRevalidate.push("/terminarz", "/druzyna");
    }
    if (type === "player" || type === "staff") {
      pathsToRevalidate.push("/druzyna");
    }
    if (type === "news") {
      pathsToRevalidate.push("/aktualnosci");
    }
    if (type === "sponsor") {
      pathsToRevalidate.push("/");
    }
    if (type === "season") {
      pathsToRevalidate.push("/", "/terminarz");
    }

    for (const path of pathsToRevalidate) {
      revalidatePath(path);
    }

    return NextResponse.json({ revalidated: true, paths: pathsToRevalidate });
  } catch (err) {
    return NextResponse.json({ message: "Błąd przetwarzania", error: String(err) }, { status: 500 });
  }
}