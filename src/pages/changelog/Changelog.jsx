import { useEffect, useState } from "react";
import { Globe, Smartphone } from "lucide-react";
import logo from "@/assets/logo.svg";
import { CHANGELOG_RELEASES } from "@/data/changelog";

const CATEGORY_FILTERS = ["All", "Mobile app", "Consumer web"];

function CategoryIcon({ category }) {
  if (category === "Mobile app") {
    return <Smartphone className="h-4 w-4 text-brand" />;
  }
  return <Globe className="h-4 w-4 text-brand" />;
}

export function Changelog() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "CropTags Changelog";

    let robotsMeta = document.querySelector('meta[name="robots"]');
    const createdMeta = !robotsMeta;
    const previousRobots = robotsMeta?.getAttribute("content") ?? null;

    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute("content", "noindex, nofollow");

    return () => {
      document.title = previousTitle;
      if (createdMeta) {
        robotsMeta.remove();
      } else if (previousRobots !== null) {
        robotsMeta.setAttribute("content", previousRobots);
      } else {
        robotsMeta.removeAttribute("content");
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <header className="sticky top-0 z-10 border-b border-border-default bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="CropTags" className="h-6 w-auto" />
            <span className="h-4 w-px bg-border-default" aria-hidden="true" />
            <span className="label-2-medium text-text-secondary">Changelog</span>
          </div>

          <nav aria-label="Jump to version" className="flex items-center gap-1.5">
            {CHANGELOG_RELEASES.map((release) => (
              <a
                key={release.version}
                href={`#${release.version}`}
                className="rounded-full border border-border-default bg-surface-subtle px-2.5 py-1 text-xs font-medium text-text-primary transition-colors hover:border-brand hover:text-brand"
              >
                {release.version}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="heading-h5-bold text-text-primary sm:text-[28px] sm:leading-9">
              Release changelog
            </h1>
            <p className="body-3-regular mt-1 text-text-secondary">
              Updates across the CropTags mobile app and consumer tree page.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter updates by product"
            className="inline-flex self-start rounded-xl border border-border-default bg-white p-1"
          >
            {CATEGORY_FILTERS.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(category)}
                  className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "bg-brand text-white"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          {CHANGELOG_RELEASES.map((release) => {
            const visibleSections =
              selectedCategory === "All"
                ? release.sections
                : release.sections.filter(
                    (section) => section.category === selectedCategory
                  );

            if (visibleSections.length === 0) {
              return null;
            }

            return (
              <article
                key={release.version}
                id={release.version}
                className="scroll-mt-20 overflow-hidden rounded-2xl border border-border-default bg-white"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-default bg-surface-subtle/60 px-5 py-4 sm:px-6">
                  <div className="flex items-center gap-2.5">
                    <h2 className="heading-h6-bold text-text-primary">
                      {release.version}
                    </h2>
                    {release.latest && (
                      <span className="rounded-full border border-success-border bg-success-bg px-2.5 py-0.5 text-xs font-medium text-success-text">
                        Latest
                      </span>
                    )}
                  </div>
                  <time
                    dateTime={release.date}
                    className="body-3-regular text-text-secondary"
                  >
                    {release.date}
                  </time>
                </div>

                <div className="divide-y divide-border-default">
                  {visibleSections.map((section) => (
                    <section
                      key={section.category}
                      className="px-5 py-5 sm:px-6"
                    >
                      <div className="mb-4 flex items-center gap-2">
                        <CategoryIcon category={section.category} />
                        <h3 className="label-2-medium text-text-primary">
                          {section.category}
                        </h3>
                      </div>

                      <div className="space-y-5">
                        {section.groups.map((group) => (
                          <div key={group.title}>
                            <h4 className="mb-2 text-xs font-semibold tracking-wide text-text-secondary uppercase">
                              {group.title}
                            </h4>
                            <ul className="space-y-2">
                              {group.items.map((item) => (
                                <li
                                  key={item}
                                  className="body-3-regular flex items-start gap-2.5 text-text-primary"
                                >
                                  <span
                                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                                    aria-hidden="true"
                                  />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}
