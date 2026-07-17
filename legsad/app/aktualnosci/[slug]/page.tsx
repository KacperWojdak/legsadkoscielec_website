import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { getNewsBySlug } from "../../../lib/queries";
import { urlFor } from "../../../lib/sanity";
import PageHeaderAccent from "@/app/components/PageHeaderAccent";
import FadeInSection from "@/app/components/FadeInSection";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-base leading-relaxed text-white/70">{children}</p>
    ),
  },
  types: {
    image: ({ value }: any) => (
      <div className="relative my-4 aspect-video w-full overflow-hidden rounded-xl border border-brand-border">
        <Image
          src={urlFor(value).width(800).url()}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
        />
      </div>
    ),
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article) {
    return {
      title: "Aktualność nie znaleziona | GKS Legsad Kościelec",
    };
  }

  const imageUrl = article.mainImage ? urlFor(article.mainImage).width(1200).height(630).url() : undefined;

  return {
    title: `${article.title} | GKS Legsad Kościelec`,
    description: article.lead,
    openGraph: {
      title: article.title,
      description: article.lead,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : undefined,
      type: "article",
      publishedTime: article.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.lead,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article) notFound();

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-b from-brand-crimson/20 to-brand-black pt-32 pb-20">
      <PageHeaderAccent />
      <div className="relative mx-auto max-w-5xl px-6">

        <Link
          href="/aktualnosci"
          className="mb-6 inline-block text-xs uppercase tracking-widest text-brand-muted transition-colors hover:text-white"
        >
          ← Wróć do aktualności
        </Link>

        <FadeInSection>
          <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-xl border border-brand-border">
            <Image
              src={urlFor(article.mainImage).width(1200).url()}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 1024px"
              priority
              className="object-cover"
            />
          </div>

          <div className="mb-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="text-xs text-brand-muted">{formatDate(article.publishedAt)}</span>
            </div>
            <h1 className="font-bebas text-4xl leading-tight text-white md:text-5xl">
              {article.title}
            </h1>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.15}>
          <div className="flex flex-col gap-4 border-t border-brand-border pt-6">
            <PortableText value={article.body} components={portableTextComponents} />
          </div>
        </FadeInSection>

      </div>
    </main>
  );
}