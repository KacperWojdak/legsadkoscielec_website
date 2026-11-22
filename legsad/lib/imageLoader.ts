type LoaderArgs = { src: string; width: number; quality?: number };

export default function imageLoader({ src, width, quality }: LoaderArgs): string {
  if (src.startsWith("https://cdn.sanity.io/")) {
    const url = new URL(src);
    const origW = Number(url.searchParams.get("w"));
    const origH = Number(url.searchParams.get("h"));

    url.searchParams.set("w", String(width));

    if (origW > 0 && origH > 0) {
      url.searchParams.set("h", String(Math.round((origH * width) / origW)));
    } else {
      url.searchParams.delete("h");
    }

    url.searchParams.set("q", String(quality ?? 75));
    url.searchParams.set("auto", "format");
    return url.toString();
  }

  return src;
}