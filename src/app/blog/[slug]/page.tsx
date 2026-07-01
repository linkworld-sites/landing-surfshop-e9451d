import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/posts";
import NavBar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Surfshop Journal`,
    description: post.description,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-sand">
        {/* Header */}
        <div className="bg-ocean pt-32 pb-12 lg:pt-40 lg:pb-16">
          <div className="max-w-3xl mx-auto px-6">
            <Link
              href="/blog"
              className="font-heading text-cyan/70 text-xs tracking-[0.15em] uppercase hover:text-cyan transition-colors inline-flex items-center gap-2 mb-6"
            >
              ← Journal
            </Link>
            {post.date && (
              <p className="font-heading text-coral text-xs tracking-[0.15em] uppercase mb-3">
                {post.date}
              </p>
            )}
            <h1 className="font-heading font-bold text-sand text-[clamp(32px,5vw,60px)] leading-tight">
              {post.title}
            </h1>
            {post.description && (
              <p className="font-body text-sand/60 text-lg mt-4 leading-relaxed">
                {post.description}
              </p>
            )}
          </div>
        </div>

        {/* Post content */}
        <div className="max-w-3xl mx-auto px-6 py-16 lg:py-20">
          <article
            className="post-body font-body text-ocean"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <div className="mt-16 pt-8 border-t border-ocean/10 flex items-center justify-between">
            <Link
              href="/blog"
              className="font-heading font-bold text-ocean/50 text-sm hover:text-ocean transition-colors"
            >
              ← All posts
            </Link>
            <Link
              href="/#booking"
              className="bg-coral text-white font-heading font-bold text-sm px-6 py-3 rounded-full hover:bg-coral/90 transition-colors"
            >
              Book a Session
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
