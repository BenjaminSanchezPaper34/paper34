export type PortfolioItem = {
  id: number;
  title: string;
  category: string;
  type: "image" | "video";
  src: string;
  size: "small" | "wide" | "tall" | "featured";
  permalink?: string;
};

// Mapping hashtags → catégories
const HASHTAG_MAP: Record<string, string> = {
  "#paper34design": "Design",
  "#paper34print": "Print",
  "#paper34web": "Web",
  "#paper34social": "R\u00e9seaux sociaux",
  "#paper34video": "Vid\u00e9o",
  "#paper34photo": "Photo",
  // Fallbacks courants
  "#design": "Design",
  "#logo": "Design",
  "#identitevisuelle": "Design",
  "#print": "Print",
  "#flyer": "Print",
  "#impression": "Print",
  "#website": "Web",
  "#siteweb": "Web",
  "#webdesign": "Web",
  "#reseauxsociaux": "R\u00e9seaux sociaux",
  "#socialmedia": "R\u00e9seaux sociaux",
  "#communitymanagement": "R\u00e9seaux sociaux",
  "#video": "Vid\u00e9o",
  "#motion": "Vid\u00e9o",
  "#motiondesign": "Vid\u00e9o",
  "#drone": "Vid\u00e9o",
  "#photo": "Photo",
  "#photographie": "Photo",
  "#shooting": "Photo",
};

// Pattern de tailles bento cyclique
const SIZE_PATTERN: PortfolioItem["size"][] = [
  "featured", // 1
  "small",    // 2
  "small",    // 3
  "tall",     // 4
  "small",    // 5
  "small",    // 6
  "small",    // 7
  "small",    // 8
  "tall",     // 9
  "small",    // 10
  "featured", // 11
  "small",    // 12
];

function extractCategory(caption: string | null): string {
  if (!caption) return "Design";

  const lower = caption.toLowerCase();
  for (const [hashtag, category] of Object.entries(HASHTAG_MAP)) {
    if (lower.includes(hashtag)) return category;
  }

  return "Design"; // D\u00e9faut
}

function extractTitle(caption: string | null): string {
  if (!caption) return "Projet";

  // Prend la premi\u00e8re ligne avant les hashtags
  const firstLine = caption.split("\n")[0].trim();
  // Retire les hashtags de la premi\u00e8re ligne
  const cleaned = firstLine.replace(/#\S+/g, "").trim();

  if (cleaned.length > 0 && cleaned.length <= 60) return cleaned;
  if (cleaned.length > 60) return cleaned.substring(0, 57) + "...";

  return "Projet";
}

type InstagramMedia = {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  caption?: string;
  timestamp: string;
  permalink: string;
};

// Items statiques fallback (quand l'API n'est pas configur\u00e9e)
const FALLBACK_ITEMS: PortfolioItem[] = [
  { id: 1, title: "Pampa Restaurant", category: "Design", type: "image", src: "/images/portfolio/placeholder.jpg", size: "featured" },
  { id: 2, title: "Villa Margot", category: "Print", type: "image", src: "/images/portfolio/placeholder.jpg", size: "small" },
  { id: 3, title: "Spot vid\u00e9o surf", category: "Vid\u00e9o", type: "video", src: "/videos/videosd-paper34.mp4", size: "small" },
  { id: 4, title: "Site vitrine restaurant", category: "Web", type: "image", src: "/images/portfolio/placeholder.jpg", size: "tall" },
  { id: 5, title: "Domaine viticole", category: "Photo", type: "image", src: "/images/portfolio/placeholder.jpg", size: "small" },
  { id: 6, title: "Community management", category: "R\u00e9seaux sociaux", type: "image", src: "/images/portfolio/placeholder.jpg", size: "small" },
  { id: 7, title: "Brasserie du port", category: "Design", type: "image", src: "/images/portfolio/placeholder.jpg", size: "small" },
  { id: 8, title: "Festival Agde", category: "Print", type: "image", src: "/images/portfolio/placeholder.jpg", size: "small" },
  { id: 9, title: "E-commerce mode", category: "Web", type: "image", src: "/images/portfolio/placeholder.jpg", size: "tall" },
  { id: 10, title: "Campagne Instagram", category: "R\u00e9seaux sociaux", type: "image", src: "/images/portfolio/placeholder.jpg", size: "small" },
  { id: 11, title: "Clip promotionnel", category: "Vid\u00e9o", type: "video", src: "/videos/videosd-paper34.mp4", size: "featured" },
  { id: 12, title: "Landing page", category: "Web", type: "image", src: "/images/portfolio/placeholder.jpg", size: "small" },
];

export async function fetchInstagramFeed(): Promise<PortfolioItem[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    console.log("[Instagram] Pas de token configur\u00e9, utilisation du fallback statique");
    return FALLBACK_ITEMS;
  }

  try {
    const url = `https://graph.instagram.com/v22.0/me/media?fields=id,media_type,media_url,thumbnail_url,caption,timestamp,permalink&limit=30&access_token=${token}`;

    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Cache 1 heure
    });

    if (!res.ok) {
      console.error(`[Instagram] Erreur API: ${res.status} ${res.statusText}`);
      return FALLBACK_ITEMS;
    }

    const data = await res.json();
    const media: InstagramMedia[] = data.data || [];

    if (media.length === 0) {
      return FALLBACK_ITEMS;
    }

    const items: PortfolioItem[] = media.map((post, index) => ({
      id: index + 1,
      title: extractTitle(post.caption || null),
      category: extractCategory(post.caption || null),
      type: post.media_type === "VIDEO" ? "video" as const : "image" as const,
      src: post.media_type === "VIDEO"
        ? post.media_url
        : post.media_url,
      size: SIZE_PATTERN[index % SIZE_PATTERN.length],
      permalink: post.permalink,
    }));

    return items;
  } catch (error) {
    console.error("[Instagram] Erreur de fetch:", error);
    return FALLBACK_ITEMS;
  }
}

export { FALLBACK_ITEMS };
