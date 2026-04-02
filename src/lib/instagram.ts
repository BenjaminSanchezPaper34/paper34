export type PortfolioItem = {
  id: number;
  title: string;
  category: string;
  type: "image" | "video";
  src: string;
  thumbnail?: string;
  size: "small" | "wide" | "tall" | "featured";
  permalink?: string;
};

// Mapping hashtags → catégories
const HASHTAG_MAP: Record<string, string> = {
  "paper34design": "Design",
  "paper34print": "Print",
  "paper34web": "Web",
  "paper34social": "Réseaux sociaux",
  "paper34video": "Vidéo",
  "paper34photo": "Photo",
  "design": "Design",
  "logo": "Design",
  "identitevisuelle": "Design",
  "branding": "Design",
  "chartegraphique": "Design",
  "print": "Print",
  "flyer": "Print",
  "impression": "Print",
  "cartesdevisite": "Print",
  "website": "Web",
  "siteweb": "Web",
  "webdesign": "Web",
  "ecommerce": "Web",
  "reseauxsociaux": "Réseaux sociaux",
  "socialmedia": "Réseaux sociaux",
  "communitymanagement": "Réseaux sociaux",
  "instagram": "Réseaux sociaux",
  "video": "Vidéo",
  "motion": "Vidéo",
  "motiondesign": "Vidéo",
  "drone": "Vidéo",
  "reel": "Vidéo",
  "photo": "Photo",
  "photographie": "Photo",
  "shooting": "Photo",
  "packshot": "Photo",
};

// Pattern de tailles bento cyclique
const SIZE_PATTERN: PortfolioItem["size"][] = [
  "featured",
  "small",
  "small",
  "tall",
  "small",
  "small",
  "small",
  "small",
  "tall",
  "small",
  "featured",
  "small",
];

function extractCategory(hashtags: string[]): string {
  if (!hashtags || hashtags.length === 0) return "Design";

  for (const tag of hashtags) {
    const lower = tag.toLowerCase().replace("#", "");
    if (HASHTAG_MAP[lower]) return HASHTAG_MAP[lower];
  }

  return "Design";
}

function extractTitle(caption: string | null): string {
  if (!caption) return "Projet";

  // Prend la première ligne avant les hashtags
  const firstLine = caption.split("\n")[0].trim();
  const cleaned = firstLine.replace(/#\S+/g, "").replace(/📸|🎨|🎬|📷|🖨️|💻|📱/g, "").trim();

  if (cleaned.length > 0 && cleaned.length <= 60) return cleaned;
  if (cleaned.length > 60) return cleaned.substring(0, 57) + "...";

  return "Projet";
}

type BeholdPost = {
  id: string;
  timestamp: string;
  permalink: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string;
  thumbnailUrl?: string;
  caption?: string;
  prunedCaption?: string;
  hashtags?: string[];
  isReel?: boolean;
  sizes?: {
    small?: { mediaUrl: string };
    medium?: { mediaUrl: string };
    large?: { mediaUrl: string };
    full?: { mediaUrl: string };
  };
  children?: { mediaUrl: string; mediaType: string; sizes?: { medium?: { mediaUrl: string } } }[];
};

// Items statiques fallback
const FALLBACK_ITEMS: PortfolioItem[] = [
  { id: 1, title: "Pampa Restaurant", category: "Design", type: "image", src: "/images/portfolio/placeholder.jpg", size: "featured" },
  { id: 2, title: "Villa Margot", category: "Print", type: "image", src: "/images/portfolio/placeholder.jpg", size: "small" },
  { id: 3, title: "Spot vidéo surf", category: "Vidéo", type: "video", src: "/videos/videosd-paper34.mp4", size: "small" },
  { id: 4, title: "Site vitrine restaurant", category: "Web", type: "image", src: "/images/portfolio/placeholder.jpg", size: "tall" },
  { id: 5, title: "Domaine viticole", category: "Photo", type: "image", src: "/images/portfolio/placeholder.jpg", size: "small" },
  { id: 6, title: "Community management", category: "Réseaux sociaux", type: "image", src: "/images/portfolio/placeholder.jpg", size: "small" },
  { id: 7, title: "Brasserie du port", category: "Design", type: "image", src: "/images/portfolio/placeholder.jpg", size: "small" },
  { id: 8, title: "Festival Agde", category: "Print", type: "image", src: "/images/portfolio/placeholder.jpg", size: "small" },
  { id: 9, title: "E-commerce mode", category: "Web", type: "image", src: "/images/portfolio/placeholder.jpg", size: "tall" },
  { id: 10, title: "Campagne Instagram", category: "Réseaux sociaux", type: "image", src: "/images/portfolio/placeholder.jpg", size: "small" },
  { id: 11, title: "Clip promotionnel", category: "Vidéo", type: "video", src: "/videos/videosd-paper34.mp4", size: "featured" },
  { id: 12, title: "Landing page", category: "Web", type: "image", src: "/images/portfolio/placeholder.jpg", size: "small" },
];

const BEHOLD_FEED_URL = "https://feeds.behold.so/bzM9Xy3v2nDyimNXOoy9";

export async function fetchInstagramFeed(): Promise<PortfolioItem[]> {
  try {
    const res = await fetch(BEHOLD_FEED_URL, {
      next: { revalidate: 3600 }, // Cache 1 heure
    });

    if (!res.ok) {
      console.error(`[Instagram/Behold] Erreur: ${res.status}`);
      return FALLBACK_ITEMS;
    }

    const data = await res.json();
    const posts: BeholdPost[] = data.posts || [];

    if (posts.length === 0) return FALLBACK_ITEMS;

    const items: PortfolioItem[] = posts.map((post, index) => {
      const isVideo = post.mediaType === "VIDEO" || post.isReel === true;

      // Pour les images, prendre la meilleure résolution dispo
      let imageSrc = post.mediaUrl;
      if (!isVideo && post.sizes) {
        imageSrc = post.sizes.large?.mediaUrl || post.sizes.medium?.mediaUrl || post.mediaUrl;
      }

      // Pour les carrousels, prendre la première image
      if (post.mediaType === "CAROUSEL_ALBUM" && post.children && post.children.length > 0) {
        const firstChild = post.children[0];
        imageSrc = firstChild.sizes?.medium?.mediaUrl || firstChild.mediaUrl || imageSrc;
      }

      return {
        id: index + 1,
        title: extractTitle(post.caption || post.prunedCaption || null),
        category: extractCategory(post.hashtags || []),
        type: isVideo ? "video" as const : "image" as const,
        src: isVideo ? post.mediaUrl : imageSrc,
        thumbnail: isVideo ? (post.thumbnailUrl || post.sizes?.medium?.mediaUrl) : undefined,
        size: SIZE_PATTERN[index % SIZE_PATTERN.length],
        permalink: post.permalink,
      };
    });

    return items;
  } catch (error) {
    console.error("[Instagram/Behold] Erreur de fetch:", error);
    return FALLBACK_ITEMS;
  }
}

export { FALLBACK_ITEMS };
