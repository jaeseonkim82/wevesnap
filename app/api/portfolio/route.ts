import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

type CloudinaryResource = {
  asset_id: string;
  public_id: string;
  secure_url: string;
  created_at?: string;
  tags?: string[];
  context?: {
    custom?: Record<string, string>;
  };
};

function getTagValue(tags: string[] | undefined, prefix: string): string {
  if (!tags) return "";

  const tag = tags.find((item) => item.startsWith(prefix));
  return tag ? tag.replace(prefix, "") : "";
}

function normalizeLimit(value: string | null) {
  const parsed = Number(value || 20);

  if (Number.isNaN(parsed)) return 20;
  if (parsed < 1) return 20;
  if (parsed > 50) return 50;

  return parsed;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const limit = normalizeLimit(searchParams.get("limit"));
    const cursor = searchParams.get("cursor");
    const hallParam = searchParams.get("hall");

    let expression = "resource_type:image AND tags=wevesnap-portfolio";

    if (hallParam) {
      const hall = decodeURIComponent(hallParam).trim();
      expression += ` AND tags=hall_${hall}`;
    }

    let query = cloudinary.search
      .expression(expression)
      .sort_by("created_at", "desc")
      .max_results(limit)
      .with_field("context")
      .with_field("tags");

    if (cursor) {
      query = query.next_cursor(cursor);
    }

    const result = await query.execute();

    const resources = (result.resources || []) as CloudinaryResource[];

    const items = resources.map((item) => {
      const hall = getTagValue(item.tags, "hall_");
      const category = getTagValue(item.tags, "category_");

      return {
        id: item.asset_id,
        publicId: item.public_id,
        createdAt: item.created_at || "",
        hall: item.context?.custom?.hall || hall || "위브스냅",
        category: item.context?.custom?.category || category || "전체",
        image: item.secure_url,
        title: item.context?.custom?.title || "",
        description: item.context?.custom?.description || "",
      };
    });

    return NextResponse.json({
      items,
      nextCursor: result.next_cursor || null,
    });
  } catch (error) {
    console.error("Cloudinary portfolio fetch error:", error);

    return NextResponse.json(
      {
        message: "포트폴리오를 불러오지 못했습니다.",
        error: error instanceof Error ? error.message : "알 수 없는 에러",
      },
      { status: 500 }
    );
  }
}