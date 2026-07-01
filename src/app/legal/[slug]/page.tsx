import { notFound } from "next/navigation";
import { getLegalPage, getLegalSlugs } from "@/lib/legal";

export function generateStaticParams() {
  return getLegalSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) notFound();
  return (
    <main className="min-h-screen bg-sand">
      <div className="bg-ocean pt-32 pb-12">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="font-heading font-bold text-sand text-[clamp(28px,4vw,48px)] leading-tight capitalize">
            {slug.replace(/-/g, " ")}
          </h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <article
          className="post-body font-body text-ocean"
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
      </div>
    </main>
  );
}
