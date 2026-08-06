// src/lib/getBusinessData.ts
import menuData from "@/data/menu.json"; // ✅ Fixed path using alias

// 🔹 Returns business info
export function getBusinessData() {
  return menuData.business;
}

// 🔹 Returns all categories
export function getCategories() {
  return menuData.categories;
}

// 🔹 Returns all products across categories
export function getAllProducts() {
  return menuData.categories.flatMap(cat => cat.items);
}

// 🔹 Returns top N best-selling products globally
export function getBestSellers(limit = 3) {
  return getAllProducts()
    .filter(p => p.bestSelling)
    .slice(0, limit);
}

// 🔹 Returns all of Jaby's favorite products
export function getJabysFavorites() {
  return getAllProducts().filter(p => p.jabysFavorite);
}

// 🔹 Returns all bundles
export function getBundles() {
  return menuData.bundles || [];
}

// 🔹 Returns trust bar features
export function getTrustBar() {
  return menuData.trustBar || [];
}

// 🔹 Returns a single product or bundle by id (checks products first, then bundles)
export function getProductById(id: string | number) {
  const targetId = typeof id === "string" ? parseInt(id, 10) : id;
  const allProducts = getAllProducts();
  const found = allProducts.find((p: any) => p.id === targetId);
  if (found) return { ...found, isBundle: false };

  const bundle = getBundles().find((b: any) => b.id === targetId);
  if (bundle) return { ...bundle, isBundle: true };

  return null;
}

// 🔹 Returns products that share a category with the given product, excluding itself
export function getRelatedProducts(currentId: string | number, categoryId?: string, limit = 4) {
  const targetId = typeof currentId === "string" ? parseInt(currentId, 10) : currentId;

  if (categoryId) {
    const category = getCategories().find((c: any) => c.id === categoryId);
    if (category) {
      return category.items.filter((p: any) => p.id !== targetId).slice(0, limit);
    }
  }

  // Fallback: just return other bestsellers/favorites excluding the current item
  return getAllProducts()
    .filter((p: any) => p.id !== targetId && (p.bestSelling || p.jabysFavorite))
    .slice(0, limit);
}

// 🔹 Returns products currently on flash sale
export function getFlashSaleProducts() {
  return getAllProducts().filter(
    (p) => ((p.discountPercent ?? 0) > 0 || p.onFlashSale === true) && p.available !== false
  );
}

// 🔹 Returns UI config (announcement bar, per-page copy, etc.)
export function getUIConfig() {
  return {
    announcement: menuData.announcement || { active: false, text: "" },
    menuPage: (menuData as any).menuPage || { tagline: "", title: "", subtitle: "" },
    ...(menuData.ui || {}),
  };
}

// 🔹 Returns FAQs (global, shown on every product detail page)
export function getFaqs() {
  return (menuData as any).faqs || [];
}

// 🔹 Returns placeholder/sample testimonials for a given category
// NOTE: these are SAMPLE testimonials seeded for dev/layout purposes.
// Swap menuData.testimonials in menu.json for real customer reviews before launch.
export function getTestimonialsFor(category: string) {
  const all = (menuData as any).testimonials || {};
  return all[category] || [];
}

// 🔹 Returns a friendly category label for a product/bundle (falls back safely)
export function getCategoryLabel(product: any) {
  return product?.category || (product?.isBundle ? "Bundle" : "House of Jaby");
}

// 🔹 Cross-sell logic: suggests complementary items from a paired category
// Cakes/Pastries pair with Drinks, Drinks pair with Pastries, Bundles pair with Drinks
const PAIRING_MAP: Record<string, string> = {
  Cakes: "Drinks",
  Pastries: "Drinks",
  Drinks: "Pastries",
  Bundle: "Drinks",
};

export function getPairingSuggestions(product: any, limit = 3) {
  const category = product?.category;
  const pairedCategoryName = PAIRING_MAP[category];
  if (!pairedCategoryName) return [];

  const pairedCategory = getCategories().find(
    (c: any) => c.name === pairedCategoryName
  );
  if (!pairedCategory) return [];

  const candidates = pairedCategory.items.filter((p: any) => p.id !== product?.id);

  // Prefer bestSelling / jabysFavorite items first, then fill with the rest.
  // NOTE: deterministic on purpose — this runs during SSR. Randomization for
  // display variety is applied client-side only, in ProductDetail's useEffect,
  // to avoid hydration mismatches.
  const preferred = candidates.filter((p: any) => p.bestSelling || p.jabysFavorite);
  const rest = candidates.filter((p: any) => !p.bestSelling && !p.jabysFavorite);

  return [...preferred, ...rest].slice(0, limit);
}

// 🔹 Returns a curated cross-category mix of testimonials for homepage social proof
export function getFeaturedTestimonials(limit = 6) {
  const all = (menuData as any).testimonials || {};
  const categories = Object.keys(all);
  const picked: any[] = [];

  // Take the highest-rated testimonial from each category first, then fill remaining slots
  categories.forEach((cat) => {
    const sorted = [...(all[cat] || [])].sort((a, b) => b.rating - a.rating);
    if (sorted[0]) picked.push({ ...sorted[0], category: cat });
  });

  categories.forEach((cat) => {
    const sorted = [...(all[cat] || [])].sort((a, b) => b.rating - a.rating);
    if (sorted[1]) picked.push({ ...sorted[1], category: cat });
  });

  return picked.slice(0, limit);
}

// 🔹 Returns the intro/outro copy for the synthetic Bundles category
// (Bundles isn't a real category object in menu.json, so it can't use
// activeCategory.intro/outro like other categories — it needs its own accessor)
export function getBundlesCopy() {
  return (menuData as any).bundlesCopy || { intro: "", outro: "" };
}
