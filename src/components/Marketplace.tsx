"use client";

import { FormEvent, useMemo, useState } from "react";
import { categories, workers, type Worker } from "@/data/workers";
import {
  IconCare,
  IconCook,
  IconDriver,
  IconHome,
  IconLeaf,
  IconSpark,
} from "@/components/Icons";

const iconMap = {
  driver: IconDriver,
  home: IconHome,
  cook: IconCook,
  spark: IconSpark,
  care: IconCare,
  leaf: IconLeaf,
};

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Worker | null>(null);
  const [requestSent, setRequestSent] = useState(false);

  const filtered = useMemo(() => {
    return workers.filter((worker) => {
      const matchesCategory =
        activeCategory === "all" || worker.category === activeCategory;
      const haystack = `${worker.name} ${worker.role} ${worker.city}`.toLowerCase();
      const matchesQuery = haystack.includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  function handleHireSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRequestSent(true);
  }

  function closeModal() {
    setSelected(null);
    setRequestSent(false);
  }

  return (
    <div className="grain min-h-screen text-ink">
      <header className="sticky top-0 z-40 border-b border-line/70 bg-[#f7faf8]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-pine">
            Kaam
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-ink-soft md:flex">
            <a href="#services" className="hover:text-pine">
              Services
            </a>
            <a href="#pros" className="hover:text-pine">
              Professionals
            </a>
            <a href="#how" className="hover:text-pine">
              How it works
            </a>
          </nav>
          <a href="#hire" className="btn-primary text-sm">
            Post a hire request
          </a>
        </div>
      </header>

      <main id="top">
        <section className="relative min-h-[92vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2000&q=80)",
            }}
          />
          <div className="hero-veil absolute inset-0" />
          <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:justify-center md:pb-24">
            <p className="animate-rise font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-8xl">
              Kaam
            </p>
            <h1 className="animate-rise-delay mt-4 max-w-xl text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl">
              Hire trusted drivers, housekeepers, cooks, and more.
            </h1>
            <p className="animate-rise-late mt-4 max-w-lg text-base text-white/85 sm:text-lg">
              A simple marketplace connecting households with verified service
              professionals across Pakistan.
            </p>
            <div className="animate-rise-late mt-8 flex flex-wrap gap-3">
              <a href="#pros" className="btn-primary">
                Browse professionals
              </a>
              <a href="#hire" className="btn-ghost">
                Tell us what you need
              </a>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-6xl px-5 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-leaf">
              Services
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-pine md:text-4xl">
              Everyday help, ready when you are
            </h2>
            <p className="mt-3 text-ink-soft">
              Pick a category to shortlist people who already work in your city.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const Icon = iconMap[category.icon];
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category.id);
                    document
                      .getElementById("pros")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`category-tile rounded-2xl border border-line bg-mist/70 p-5 text-left ${
                    isActive ? "bg-white shadow-[0_18px_40px_var(--glow)]" : ""
                  }`}
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-pine text-mint">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-pine">
                    {category.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-soft">{category.blurb}</p>
                  <p className="mt-4 text-sm font-semibold text-leaf">
                    {category.rate}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        <section id="pros" className="border-y border-line bg-mist/60 py-20">
          <div className="mx-auto max-w-6xl px-5">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-leaf">
                  Professionals
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-pine md:text-4xl">
                  Meet people ready for work
                </h2>
              </div>
              <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by name, role, or city"
                  className="w-full rounded-full border border-line bg-white px-4 py-3 text-sm outline-none ring-leaf/30 focus:ring-2"
                />
                <button
                  type="button"
                  onClick={() => setActiveCategory("all")}
                  className="rounded-full border border-line bg-white px-4 py-3 text-sm font-semibold text-pine"
                >
                  Show all
                </button>
              </div>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((worker) => (
                <article
                  key={worker.id}
                  className="worker-card overflow-hidden rounded-3xl border border-line bg-white"
                >
                  <div className="relative h-48 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={worker.image}
                      alt={worker.name}
                      className="h-full w-full object-cover"
                    />
                    {worker.verified ? (
                      <span className="absolute left-3 top-3 rounded-full bg-pine px-3 py-1 text-xs font-semibold text-mint">
                        Verified
                      </span>
                    ) : null}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-pine">
                          {worker.name}
                        </h3>
                        <p className="text-sm text-ink-soft">
                          {worker.role} · {worker.city}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-leaf">
                        {worker.rating.toFixed(1)}
                      </p>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                      {worker.bio}
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-pine">
                          {worker.rate}
                        </p>
                        <p className="text-xs text-ink-soft">
                          {worker.jobs} completed jobs
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelected(worker);
                          setRequestSent(false);
                        }}
                        className="rounded-full bg-pine px-4 py-2 text-sm font-semibold text-white transition hover:bg-pine-deep"
                      >
                        Hire
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 ? (
              <p className="mt-10 text-center text-ink-soft">
                No professionals match that search. Try another city or role.
              </p>
            ) : null}
          </div>
        </section>

        <section id="how" className="mx-auto max-w-6xl px-5 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-leaf">
              How it works
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-pine md:text-4xl">
              Hire in three calm steps
            </h2>
          </div>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Share what you need",
                copy: "Choose a service, city, and schedule that fits your home.",
              },
              {
                step: "02",
                title: "Review verified profiles",
                copy: "Compare ratings, languages, and recent work history.",
              },
              {
                step: "03",
                title: "Confirm and start",
                copy: "Send a hire request. We help coordinate the first day.",
              },
            ].map((item) => (
              <li
                key={item.step}
                className="rounded-3xl border border-line bg-white p-6"
              >
                <p className="font-[family-name:var(--font-display)] text-4xl font-bold text-mint">
                  {item.step}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-pine">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {item.copy}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section id="hire" className="mx-auto max-w-6xl px-5 pb-24">
          <div className="overflow-hidden rounded-[2rem] bg-pine-deep text-white">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12">
                <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
                  Post a hire request
                </h2>
                <p className="mt-3 max-w-md text-white/80">
                  Tell us the role you need. We&apos;ll match you with available
                  professionals in your area.
                </p>
                <form
                  className="mt-8 grid gap-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    alert(
                      "Thanks — your hire request was recorded. A Kaam coordinator will follow up.",
                    );
                    event.currentTarget.reset();
                  }}
                >
                  <input
                    required
                    name="name"
                    placeholder="Your name"
                    className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-white/50 focus:border-sun"
                  />
                  <input
                    required
                    name="city"
                    placeholder="City"
                    className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-white/50 focus:border-sun"
                  />
                  <select
                    required
                    name="role"
                    defaultValue=""
                    className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm outline-none focus:border-sun"
                  >
                    <option value="" disabled>
                      Role needed
                    </option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id} className="text-ink">
                        {category.title}
                      </option>
                    ))}
                  </select>
                  <textarea
                    required
                    name="details"
                    rows={4}
                    placeholder="Hours, neighborhood, and any must-haves"
                    className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-white/50 focus:border-sun"
                  />
                  <button type="submit" className="btn-primary w-fit">
                    Submit request
                  </button>
                </form>
              </div>
              <div
                className="min-h-[280px] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80)",
                }}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-[family-name:var(--font-display)] text-xl font-bold text-pine">
              Kaam
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              Fair work for households and the people who keep them running.
            </p>
          </div>
          <p className="text-sm text-ink-soft">
            © 2026 Kaam. Built for trusted local hiring.
          </p>
        </div>
      </footer>

      {selected ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-pine-deep/50 p-4 backdrop-blur-sm sm:items-center">
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-pine">
                  Hire {selected.name}
                </h3>
                <p className="text-sm text-ink-soft">
                  {selected.role} · {selected.city}
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full px-3 py-1 text-sm text-ink-soft hover:bg-mist"
              >
                Close
              </button>
            </div>

            {requestSent ? (
              <div className="mt-6 rounded-2xl bg-mist p-5">
                <p className="font-semibold text-pine">Request sent</p>
                <p className="mt-2 text-sm text-ink-soft">
                  {selected.name} will receive your request. Expect a response
                  within one business day.
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn-primary mt-5"
                >
                  Done
                </button>
              </div>
            ) : (
              <form className="mt-6 grid gap-3" onSubmit={handleHireSubmit}>
                <input
                  required
                  placeholder="Your name"
                  className="rounded-2xl border border-line px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-leaf/30"
                />
                <input
                  required
                  type="tel"
                  placeholder="Phone / WhatsApp"
                  className="rounded-2xl border border-line px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-leaf/30"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="Start date, hours, and neighborhood"
                  className="rounded-2xl border border-line px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-leaf/30"
                />
                <button type="submit" className="btn-primary mt-2 w-fit">
                  Send hire request
                </button>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
