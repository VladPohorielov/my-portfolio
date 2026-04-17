import { Helmet } from "react-helmet-async";

/**
 * Читає VITE_SITE_URL з env. Якщо змінна не задана — повертає порожній рядок.
 * Це безпечно: og:image з відносним шляхом краще, ніж протокол-відносний.
 */
const siteUrl = import.meta.env.VITE_SITE_URL ?? "";

interface MetaProps {
  title?: string;
  description?: string;
  /** Шлях до og:image відносно кореня сайту, напр. "/og-image.jpg" */
  ogImage?: string;
  /** Canonical URL сторінки. За замовчуванням — siteUrl */
  canonicalUrl?: string;
}

const DEFAULTS = {
  title: "Владислав Погорєлов — AI Content Creator",
  description:
    "AI short-form відео для Meta Ads, TikTok і Reels. CPA −25%, ROI +30%. Повний цикл: від ідеї до запуску. Відкритий до нових проєктів.",
  ogImage: "/og-image.jpg",
};

export function Meta({
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  ogImage = DEFAULTS.ogImage,
  canonicalUrl = siteUrl,
}: MetaProps) {
  const absoluteImage = ogImage.startsWith("http")
    ? ogImage
    : `${siteUrl}${ogImage}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="uk_UA" />
      {absoluteImage && (
        <meta property="og:image" content={absoluteImage} />
      )}
      {absoluteImage && (
        <meta property="og:image:width" content="1200" />
      )}
      {absoluteImage && (
        <meta property="og:image:height" content="630" />
      )}
      {canonicalUrl && (
        <meta property="og:url" content={canonicalUrl} />
      )}

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {absoluteImage && (
        <meta name="twitter:image" content={absoluteImage} />
      )}

      {/* Canonical */}
      {canonicalUrl && (
        <link rel="canonical" href={canonicalUrl} />
      )}
    </Helmet>
  );
}
