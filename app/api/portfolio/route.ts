import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

type CloudinaryResource = {
  asset_id: string;
  public_id: string;
  secure_url: string;
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

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression("resource_type:image AND tags=wevesnap-portfolio")
      .sort_by("created_at", "desc")
      .max_results(100)
      .with_field("context")
      .with_field("tags")
      .execute();

    const resources = (result.resources || []) as CloudinaryResource[];

    const items = resources.map((item) => {
      const hall = getTagValue(item.tags, "hall_");
      const category = getTagValue(item.tags, "category_");

      return {
        id: item.asset_id,
        hall: item.context?.custom?.hall || hall || "위브스냅",
        category: item.context?.custom?.category || category || "전체",
        image: item.secure_url,
        title: item.context?.custom?.title || "",
        description: item.context?.custom?.description || "",
      };
    });

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Cloudinary portfolio fetch error:", error);

    return NextResponse.json(
      {
        message: "포트폴리오를 불러오지 못했어.",
        error:
          error instanceof Error ? error.message : "알 수 없는 에러",
      },
      { status: 500 }
    );
  }
}