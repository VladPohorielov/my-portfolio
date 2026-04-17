import { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { VideoModal } from "@/components/ui/VideoModal";
import s from "./VideoRail.module.css";

function PlayIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * YouTube maxresdefault.jpg може повертати 404 для коротких відео.
 * Fallback: hqdefault.jpg (завжди доступний).
 */
function handleThumbError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (img.src.includes("maxresdefault")) {
    img.src = img.src.replace("maxresdefault", "hqdefault");
  }
}

export function VideoRail() {
  const { videos } = portfolioData;
  const [embedSrc, setEmbedSrc] = useState<string | null>(null);

  return (
    <section id="portfolio" className={s.section}>
      <div className={s.wrap}>
        <SectionReveal>
          <div className={s.railHeader}>
            <div className={s.railTitleRow}>
              <p className={s.eyebrow}>Відеопортфоліо</p>
              <span className={s.railCount}>{videos.length}</span>
            </div>
            <span className={s.railHint}>прокрути →</span>
          </div>
          <h2 className={s.h2}>Відео, які продають</h2>
          <p className={s.lead}>
            Short-form контент на реальних кейсах — від продуктових рілс до AI-відео.
          </p>
        </SectionReveal>
      </div>

      <div className={s.railWrap}>
        <div className={s.rail}>
          {videos.map((video) => (
            <button
              key={video.embed}
              type="button"
              className={s.card}
              onClick={() => setEmbedSrc(video.embed)}
              aria-label={`Дивитись: ${video.title}`}
            >
              <span className={s.thumb}>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className={s.thumbImg}
                  loading="lazy"
                  decoding="async"
                  onError={handleThumbError}
                />
                <span className={s.play} aria-hidden>
                  <PlayIcon />
                </span>
              </span>
              <span className={s.info}>
                <span className={s.tag}>{video.tag}</span>
                <span className={s.name}>{video.title}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <VideoModal src={embedSrc} onClose={() => setEmbedSrc(null)} />
    </section>
  );
}
