import { NextResponse, NextRequest } from "next/server";
import { getDb } from "@/lib/db";





/**
 * GET /api/products
 * Supports pagination + filtering by category & brand
 * Example:
 * /api/products?page=1&limit=10&category=Fitness&brand=Ergoline
 */
export async function GET(
  request
) {
  try {
    const db = (await getDb());
    const { searchParams } = new URL(request.url);

    // --- Pagination ---
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const offset = (page - 1) * limit;

    // --- Filters ---
    const categoryFilter = searchParams.get("category");
    const brandFilter = searchParams.get("brand");
    console.log(categoryFilter, brandFilter);


    // --- Dynamic WHERE Clause ---
    const filters = [];
    const params = [];

    if (categoryFilter) {
      filters.push("category = ?");
      params.push(categoryFilter);
    }
    if (brandFilter) {
      filters.push("brand = ?");
      params.push(brandFilter);
    }

    const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
    console.log(params);

    // --- Queries ---
    const dataQuery = `
      SELECT * FROM products
      ${whereClause}
      LIMIT ? OFFSET ?;
    `;
    params.push(limit, offset);

    const countQuery = `
      SELECT COUNT(id) AS total FROM products
      ${whereClause};
    `;
    const countParams = params.slice(0, params.length - 2);

    // --- Execute Queries ---
    const [dataResults, countResults] = await Promise.all([
      db.all(dataQuery, params),
      db.get(countQuery, countParams),
    ]);

    const totalItems = countResults?.total ?? 0;
    const totalPages = Math.max(1, Math.ceil(totalItems / limit));

    // --- Transform Results ---
    const products = dataResults.map((product) => ({
      id: product.id,
      name: product.name,
      smallDesc: product.smallDesc,
      largeDesc: product.largeDesc,
      brand: product.brand,
      officialPage: product.officialPage,
      category: product.category,
      imageLink: product.imageLinks ?? "/placeholder.png", // single link only
    }));

    // --- Response ---
    return NextResponse.json({
      data: products,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
      filters: {
        category: categoryFilter,
        brand: brandFilter,
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown server error";
    console.error("API Error (GET /products):", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: errorMessage },
      { status: 500 }
    );
  }
}