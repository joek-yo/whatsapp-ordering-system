// src/app/product/[id]/page.tsx
import React from "react";
import { getAllProducts, getBundles, getBusinessData } from "@/lib/getBusinessData";
import ProductDetail from "@/components/features/products/ProductDetail";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = getBusinessData() as any;
  const products = getAllProducts();
  const bundles = getBundles();
  const allItems = [...products, ...bundles];
  const item = allItems.find((p: any) => p.id?.toString() === id);
  if (!item) return { title: "Product Not Found" };
  return {
    title: `${item.name} | ${business.name}`,
    description: item.description,
  };
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const products = getAllProducts();
  const bundles = getBundles();
  const allItems = [...products, ...bundles];
  const item = allItems.find((p: any) => p.id?.toString() === id);
  if (!item) notFound();

  const isBundle = bundles.some((b: any) => b.id?.toString() === id);

  return (
    <main className="min-h-screen bg-background">
      <ProductDetail product={{ ...item, isBundle }} />
    </main>
  );
};

export default Page;
