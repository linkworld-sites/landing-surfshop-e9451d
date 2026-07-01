import Link from "next/link";
import { getPosts } from "@/lib/posts";
import NavBar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Journal — Surfshop | Stories from the Water",
  description:
    "Surf stories, eFoil guides, gear reviews, and dispatches from the beach. Written by riders, for riders.",
};

export default function BlogIndex() {
  const posts = getPosts();

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-sand">
        {/* Header */}
        <div className="bg-ocean pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div className="max-w-4xl mx-auto px-6">
            <p className="font-heading text-cyan text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Journal
            </p>
            <h1 className="font-heading font-bold text-sand text-[clamp(40px,6vw,72px)] leading-tight">
              STORIES FROM<br />THE WATER.
            </h1>
            <p className="font-body text-sand/60 text-lg mt-4 max-w-lg">
              Surf tips, eFoil guides, gear picks, and dispatches from our crew at the beach.
            </p>
          </div>
        </div>

        {/* Post list */}
        <div className="max-w-4xl mx-auto px-6 py-16 lg:py-20">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-cyan/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌊</span>
              </div>
              <p className="font-heading font-bold text-ocean text-xl mb-2">New Stories Coming Soon</p>
              <p className="font-body text-ocean/60 text-sm max-w-xs mx-auto">
                We&apos;re writing up our best tips and stories from the water. Check back soon.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-ocean/10">
              {posts.map((p) => (
                <li key={p.slug} className="py-10 first:pt-0">
                  <Link href={`/blog/${p.slug}`} className="group block">
                    {p.date && (
                      <p className="font-heading text-coral text-xs tracking-[0.15em] uppercase mb-2">
                        {p.date}
                      </p>
                    )}
                    <h2 className="font-heading font-bold text-ocean text-[clamp(22px,3vw,36px)] leading-tight group-hover:text-cyan transition-colors duration-300">
                      {p.title}
                    </h2>
                    {p.description && (
                      <p className="font-body text-ocean/60 text-base mt-3 max-w-2xl leading-relaxed">
                        {p.description}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-2 font-heading font-bold text-cyan text-sm mt-4 group-hover:gap-3 transition-all">
                      Read more <span>→</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-12 pt-8 border-t border-ocean/10">
            <Link href="/" className="font-heading font-bold text-ocean/50 text-sm hover:text-ocean transition-colors">
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
