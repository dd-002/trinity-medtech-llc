import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(request, context) {
  try {
    // Await params to extract productID correctly
    const { productID } = await context.params;

    const db = await getDb();

    const product = await db.get(
      `SELECT * FROM products WHERE id = ? LIMIT 1;`,
      [productID]
    );

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    const result = {
      id: product.id,
      name: product.name,
      smallDesc: product.smallDesc,
      largeDesc: product.largeDesc,
      brand: product.brand,
      officialPage: product.officialPage,
      category: product.category,
      imageLink: product.imageLinks ?? "/placeholder.png",
    };

    return NextResponse.json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown server error";
    console.error("API Error (GET /products/[productID]):", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: errorMessage },
      { status: 500 }
    );
  }
}
