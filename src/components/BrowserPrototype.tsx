import { useState } from "react";
import { iconMap } from "./BrowserIcons";
import { browserSections, toolbarSections, APPLE_SVG } from "./BrowserData";

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(" ");

const BrowserPrototype = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [activeToolbar, setActiveToolbar] = useState<number | null>(null);

  const section = browserSections[activeSection];
  const isToolbarActive = activeToolbar !== null;
  const displayGradient = isToolbarActive ? toolbarSections[activeToolbar].gradient : section.gradient;
  const displayAccent = isToolbarActive ? toolbarSections[activeToolbar].accentHsl : section.accentHsl;
  const displayTitle = isToolbarActive ? toolbarSections[activeToolbar].title : null;
  const displaySubtitle = isToolbarActive ? toolbarSections[activeToolbar].subtitle : null;
  const heroIconName = isToolbarActive ? toolbarSections[activeToolbar].icon : section.heroIcon;
  const HeroIcon = iconMap[heroIconName];

  const handleSidebarClick = (i: number) => { setActiveSection(i); setActiveToolbar(null); };
  const handleToolbarClick = (i: number) => { setActiveToolbar(i === activeToolbar ? null : i); };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen relative">
      {/* Full-screen browser window with small margin for the bottom button */}
      <div className="relative w-full h-full" style={{ padding: "1rem 1rem 2.5rem 1rem" }}>
        <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-[0_8px_60px_-12px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06)]">
          <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-700 ease-in-out ${displayGradient}`} />
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-700"
            style={{
              background: `radial-gradient(ellipse 60% 50% at 55% 40%, ${displayAccent.replace(")", ",0.18)")}, transparent)`,
            }}
          />

          {/* Title bar */}
          <div className="relative z-10 flex items-center h-10 px-6 bg-black/30 backdrop-blur-md border-b border-white/5 rounded-t-[2.5rem]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[hsl(0,70%,55%)]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[hsl(40,80%,55%)]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[hsl(130,60%,45%)]" />
            </div>
            <div className="flex-1" />
            <div className="flex items-center gap-1 ml-auto">
              {toolbarSections.map((t, i) => {
                const TIcon = iconMap[t.icon];
                const isActive = activeToolbar === i;
                return (
                  <div key={t.label} className="relative group">
                    <button
                      onClick={() => handleToolbarClick(i)}
                      className={cn(
                        "w-6 h-6 rounded-md flex items-center justify-center transition-colors",
                        isActive ? "bg-white/20" : "hover:bg-white/10"
                      )}
                    >
                      <TIcon
                        className={cn(
                          "w-3.5 h-3.5 transition-colors",
                          isActive ? "text-white" : "text-white/40 group-hover:text-white"
                        )}
                      />
                    </button>
                    <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/80 text-[9px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                      {t.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 flex" style={{ height: "calc(100% - 40px)" }}>
            {/* Sidebar */}
            <div className="flex flex-col items-center py-4 px-2 gap-1 bg-black/20 backdrop-blur-md border-r border-white/5 w-14 shrink-0 rounded-bl-[2.5rem] z-20 relative">
              {browserSections.map((s, i) => {
                const Icon = iconMap[s.icon];
                const isActive = i === activeSection && !isToolbarActive;
                return (
                  <div key={s.id} className="relative group">
                    <button
                      onClick={() => handleSidebarClick(i)}
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                        isActive ? "bg-white/15 shadow-lg" : "hover:bg-white/[0.08]"
                      )}
                      style={
                        isActive
                          ? { boxShadow: `0 0 20px ${section.accentHsl.replace(")", ",0.3)")}` }
                          : {}
                      }
                    >
                      <Icon
                        className={cn(
                          "w-4 h-4 transition-all duration-300",
                          isActive ? "text-white" : "text-white/40 group-hover:text-white/70"
                        )}
                      />
                    </button>
                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-black/80 text-[9px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-16 py-8 relative -ml-8 md:-ml-16">
              {/* Glass hexagon icon */}
              <div className="mb-8 lg:mb-10 relative transition-all duration-500">
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52 -z-10 blur-3xl rounded-full transition-all duration-700"
                  style={{ background: displayAccent, opacity: 0.35 }}
                />
                <svg
                  viewBox="0 0 200 200"
                  className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 transition-all duration-500"
                  style={{
                    filter: `drop-shadow(0 8px 30px ${displayAccent.replace(")", ",0.4)")}) drop-shadow(0 2px 8px rgba(0,0,0,0.5))`,
                  }}
                >
                  <defs>
                    <linearGradient id="glass-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={displayAccent.replace(")", ",0.7)")} />
                      <stop offset="50%" stopColor={displayAccent.replace(")", ",0.4)")} />
                      <stop offset="100%" stopColor={displayAccent.replace(")", ",0.65)")} />
                    </linearGradient>
                    <linearGradient id="glass-border" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                      <stop offset="50%" stopColor={displayAccent.replace(")", ",0.3)")} />
                      <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
                    </linearGradient>
                    <radialGradient id="glass-shine" cx="50%" cy="25%" r="50%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </radialGradient>
                  </defs>
                  <path
                    d="M100 8 C108 8, 115 12, 170 45 C180 51, 184 58, 184 72 L184 128 C184 142, 180 149, 170 155 L108 192 C102 196, 98 196, 92 192 L30 155 C20 149, 16 142, 16 128 L16 72 C16 58, 20 51, 30 45 Z"
                    fill="url(#glass-border)"
                  />
                  <path
                    d="M100 16 C106 16, 112 19, 164 50 C172 55, 176 60, 176 72 L176 128 C176 140, 172 145, 164 150 L106 184 C102 187, 98 187, 94 184 L36 150 C28 145, 24 140, 24 128 L24 72 C24 60, 28 55, 36 50 Z"
                    fill="url(#glass-bg)"
                  />
                  <ellipse cx="100" cy="60" rx="55" ry="35" fill="url(#glass-shine)" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <HeroIcon
                    className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-white transition-all duration-500"
                    strokeWidth={1.5}
                    style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.4))" }}
                  />
                </div>
              </div>

              {/* Hero copy */}
              {!isToolbarActive ? (
                <>
                  {activeSection === 0 ? (
                    <>
                      <p className="text-2xl sm:text-3xl lg:text-5xl font-light text-white tracking-tight text-center">
                        Secure Network Protocol for the Next Web.
                      </p>
                      <p className="text-2xl sm:text-3xl lg:text-5xl font-light text-white tracking-tight mt-1 text-center">
                        Agentic Web3 AI Browser
                      </p>
                      <p className="text-sm sm:text-base lg:text-lg uppercase tracking-[0.3em] text-white/40 mt-4 lg:mt-6 text-center">
                        RWA's · Web3AI · Cyber · Data · Compliance
                      </p>
                      <div className="flex items-center justify-center gap-2 mt-3">
                        <span className="text-xs sm:text-sm lg:text-base uppercase tracking-[0.3em] text-white/40">
                          MADE EXCLUSIVELY FOR MAC
                        </span>
                        <div
                          className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 animated-gradient-icon-bright"
                          style={{
                            WebkitMaskImage: `url("${APPLE_SVG}")`,
                            WebkitMaskSize: "contain",
                            WebkitMaskRepeat: "no-repeat",
                            WebkitMaskPosition: "center",
                            maskImage: `url("${APPLE_SVG}")`,
                            maskSize: "contain",
                            maskRepeat: "no-repeat",
                            maskPosition: "center",
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-2xl sm:text-3xl lg:text-5xl font-light text-white tracking-tight text-center transition-all duration-500">
                        {section.title}
                      </p>
                      <p className="text-xl sm:text-2xl lg:text-4xl font-light text-white/45 tracking-tight mt-3 lg:mt-4 text-center max-w-3xl transition-all duration-500 whitespace-pre-line leading-snug">
                        {section.subtitle}
                      </p>
                    </>
                  )}
                </>
              ) : (
                <>
                  <p className="text-2xl sm:text-3xl lg:text-5xl font-light text-white tracking-tight text-center transition-all duration-500">
                    {displayTitle}
                  </p>
                  <p className="text-xl sm:text-2xl lg:text-4xl font-light text-white/45 tracking-tight mt-3 lg:mt-4 text-center max-w-3xl transition-all duration-500 whitespace-pre-line leading-snug">
                    {displaySubtitle}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Glowing branded circle — positioned at bottom of the browser window */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20">
          <div
            className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center"
            style={{
              background: `linear-gradient(160deg, ${displayAccent.replace(")", ",0.12)")}, ${displayAccent.replace(")", ",0.06)")})`,
              border: "1.5px solid rgba(255,255,255,0.5)",
              boxShadow: `0 0 15px rgba(255,255,255,0.25), 0 0 40px rgba(255,255,255,0.1), 0 0 60px ${displayAccent.replace(")", ",0.2)")}`,
              backdropFilter: "blur(12px)",
              transition: "all 0.5s ease",
            }}
          >
            <div
              className="w-10 h-10 md:w-12 md:h-12 shrink-0 animated-gradient-icon-bright"
              style={{
                WebkitMaskImage: 'url("/images/plato-icon.webp")',
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskImage: 'url("/images/plato-icon.webp")',
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowserPrototype;
