import Link from "next/link";

const items = [
  "ZERO WAVES REQUIRED",
  "ELECTRIC POWERED",
  "UP TO 35 KM/H",
  "SILENT MOTOR",
  "BEGINNER-FRIENDLY",
  "INSTRUCTOR INCLUDED",
  "THE OCEAN JUST GOT AN UPGRADE",
  "ALL SKILL LEVELS",
  "ZERO WAVES REQUIRED",
  "ELECTRIC POWERED",
  "UP TO 35 KM/H",
  "SILENT MOTOR",
  "BEGINNER-FRIENDLY",
  "INSTRUCTOR INCLUDED",
  "THE OCEAN JUST GOT AN UPGRADE",
  "ALL SKILL LEVELS",
];

export default function TickerStrip() {
  return (
    <Link href="/shop" className="block overflow-hidden bg-cyan py-4 lg:py-5 cursor-pointer group">
      <div className="flex whitespace-nowrap animate-ticker group-hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 font-heading font-bold text-ocean text-sm lg:text-base tracking-[0.1em] px-6"
          >
            {item}
            <span className="text-coral text-lg">✱</span>
          </span>
        ))}
      </div>
    </Link>
  );
}
