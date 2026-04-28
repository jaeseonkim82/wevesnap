import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

type CloudinaryResource = {
  public_id: string;
  secure_url: string;
  created_at?: string;
  tags?: string[];
  context?: {
    custom?: Record<string, string>;
  };
};

function getTagValue(tags: string[] | undefined, prefix: string) {
  if (!tags) return "";
  const tag = tags.find((item) => item.startsWith(prefix));
  return tag ? tag.replace(prefix, "") : "";
}

function sortByPublicIdAsc(a: CloudinaryResource, b: CloudinaryResource) {
  return (a.public_id || "").localeCompare(b.public_id || "", undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression("resource_type:image AND tags=wevesnap-portfolio")
      .sort_by("created_at", "desc")
      .max_results(500)
      .with_field("context")
      .with_field("tags")
      .execute();

    const resources = (result.resources || []) as CloudinaryResource[];

    const grouped = new Map<string, CloudinaryResource[]>();

    for (const item of resources) {
      const hallTag = getTagValue(item.tags, "hall_");
      const hall = item.context?.custom?.hall || hallTag || "위브스냅";

      if (!grouped.has(hall)) {
        grouped.set(hall, []);
      }

      grouped.get(hall)!.push(item);
    }

    const halls = Array.from(grouped.entries()).map(([hall, items]) => {
      const sortedItems = [...items].sort(sortByPublicIdAsc);
      const firstItem = sortedItems[0];

      const categoryTag = getTagValue(firstItem?.tags, "category_");
      const category =
        firstItem?.context?.custom?.category || categoryTag || "전체";

      const latestCreatedAt = items
        .map((item) => item.created_at || "")
        .sort()
        .reverse()[0];

      return {
        hall,
        category,
        coverImage: firstItem?.secure_url || "",
        count: items.length,
        latestCreatedAt,
      };
    });

    halls.sort((a, b) => {
      const aTime = a.latestCreatedAt
        ? new Date(a.latestCreatedAt).getTime()
        : 0;
      const bTime = b.latestCreatedAt
        ? new Date(b.latestCreatedAt).getTime()
        : 0;

      return bTime - aTime;
    });

    return NextResponse.json(halls);
  } catch (error) {
    console.error("Halls API error:", error);

    return NextResponse.json(
      { message: "웨딩홀 목록을 불러오지 못했습니다." },
      { status: 500 }
    );
  }
}