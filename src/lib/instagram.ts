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
  "video": "Vidéo",
  "motion": "Vidéo",
  "motiondesign": "Vidéo",
  "drone": "Vidéo",
  "reel": "Vidéo",
  "photo": "Photo",
  "photographie": "Photo",
  "shooting": "Photo",
  "packshot": "Photo",
  "reportage": "Photo",
  "carnaval": "Photo",
  "evenement": "Photo",
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

function extractCategory(caption: string | null): string {
  if (!caption) return "Photo";

  const lower = caption.toLowerCase();
  // Cherche les hashtags dans la légende
  const hashtags = lower.match(/#(\w+)/g) || [];
  for (const tag of hashtags) {
    const clean = tag.replace("#", "");
    if (HASHTAG_MAP[clean]) return HASHTAG_MAP[clean];
  }

  return "Photo"; // Défaut
}

function extractTitle(caption: string | null): string {
  if (!caption) return "Projet";

  // Prend la première ligne avant les hashtags
  const firstLine = caption.split("\n")[0].trim();
  const cleaned = firstLine
    .replace(/#\S+/g, "")
    .replace(/📸|🎨|🎬|📷|🖨️|💻|📱|🚁|✨|🔥|👉|🎉/g, "")
    .trim();

  if (cleaned.length > 0 && cleaned.length <= 60) return cleaned;
  if (cleaned.length > 60) return cleaned.substring(0, 57) + "...";

  return "Projet";
}

type InstagramPost = {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  caption?: string;
  timestamp: string;
  permalink: string;
};

// Items statiques fallback
const FALLBACK_ITEMS: PortfolioItem[] = [
  { id: 1, title: "Pampa Restaurant", category: "Design", type: "image", src: "/images/portfolio/placeholder.jpg", size: "featured" },
  { id: 2, title: "Villa Margot", category: "Print", type: "image", src: "/images/portfolio/placeholder.jpg", size: "small" },
  { id: 3, title: "Spot vidéo surf", category: "Vidéo", type: "video", src: "/videos/videosd-paper34.mp4", size: "small" },
  { id: 4, title: "Site vitrine restaurant", category: "Web", type: "image", src: "/images/portfolio/placeholder.jpg", size: "tall" },
  { id: 5, title: "Domaine viticole", category: "Photo", type: "image", src: "/images/portfolio/placeholder.jpg", size: "small" },
  { id: 6, title: "Community management", category: "Réseaux sociaux", type: "image", src: "/images/portfolio/placeholder.jpg", size: "small" },
];

export async function fetchInstagramFeed(): Promise<PortfolioItem[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    console.log("[Instagram] Pas de token configuré, utilisation du fallback");
    return FALLBACK_ITEMS;
  }

  try {
    const allPosts: InstagramPost[] = [];
    let nextUrl = `https://graph.instagram.com/v22.0/me/media?fields=id,media_type,media_url,thumbnail_url,caption,timestamp,permalink&limit=100&access_token=${token}`;
    let hasMore = true;

    // Pagination : récupère toutes les pages (max 400 posts)
    while (hasMore && allPosts.length < 400) {
      const response = await fetch(nextUrl, {
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        console.error(`[Instagram] Erreur API: ${response.status}`);
        break;
      }

      const data = await response.json();
      const pagePosts: InstagramPost[] = data.data || [];
      allPosts.push(...pagePosts);

      // Page suivante
      if (data.paging?.next) {
        nextUrl = data.paging.next;
      } else {
        hasMore = false;
      }
    }

    console.log(`[Instagram] ${allPosts.length} posts récupérés`);

    if (allPosts.length === 0) return FALLBACK_ITEMS;

    const posts = allPosts;

    const items: PortfolioItem[] = posts
      .filter((post) => post.media_url) // Exclure les posts sans media
      .map((post, index) => {
        const isVideo = post.media_type === "VIDEO";

        return {
          id: index + 1,
          title: extractTitle(post.caption || null),
          category: extractCategory(post.caption || null),
          type: isVideo ? ("video" as const) : ("image" as const),
          src: post.media_url!,
          thumbnail: isVideo ? post.thumbnail_url : undefined,
          size: SIZE_PATTERN[index % SIZE_PATTERN.length],
          permalink: post.permalink,
        };
      });

    return items;
  } catch (error) {
    console.error("[Instagram] Erreur de fetch:", error);
    return FALLBACK_ITEMS;
  }
}

export { FALLBACK_ITEMS };
