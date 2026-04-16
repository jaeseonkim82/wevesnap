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

function sortByPublicIdAsc(
  a: CloudinaryResource,
  b: CloudinaryResource
): number {
  return a.public_id.localeCompare(b.public_id, undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

export async function GET() {
  try {
    const result = await cloudinary.api.resources_by_tag("wevesnap-portfolio", {
      max_results: 300,
      context: true,
      tags: true,
      resource_type: "image",
    });

    const rawResources = Array.isArray(result.resources)
      ? result.resources
      : [];

    const resources: CloudinaryResource[] = rawResources
      .map((item: any) => ({
        asset_id: item.asset_id ?? "",
        public_id: item.public_id ?? "",
        secure_url: item.secure_url ?? "",
        created_at: item.created_at ?? "",
        tags: Array.isArray(item.tags) ? item.tags : [],
        context: item.context,
      }))
      .sort(sortByPublicIdAsc);

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

    return NextResponse.json({ items });
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