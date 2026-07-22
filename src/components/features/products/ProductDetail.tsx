"use client";

import React, { useState, useEffect } from "react";
import {
  FaShoppingCart, FaWhatsapp, FaShareAlt, FaArrowLeft, FaStar,
  FaPlus, FaMinus, FaClock, FaUsers, FaExclamationTriangle,
  FaChevronDown, FaQuoteLeft, FaGift,
} from "react-icons/fa";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getBusinessData, getPairingSuggestions, getTestimonialsFor, getFaqs, getCategoryLabel } from "@/lib/getBusinessData";
import RelatedProducts from "@/components/features/products/RelatedProducts";
import RecentlyViewed, { logProductView } from "@/components/features/products/RecentlyViewed";
import ProductCard from "@/components/home/ProductCard";

const ProductDetail = ({ product }: { product: any }) => {
  const business = getBusinessData() as any;
  const { cart, addToCart, updateQuantity, removeFromCart, updateItemNote } = useCart();
  const router = useRouter();

  const [showBagToast, setShowBagToast] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(product.image);

  // Gallery: main image + any extra angles the owner has added.
  // If no extraImages exist yet, this simply renders no thumbnail row.
  const galleryImages = [product.image, ...(product.extraImages || [])].filter(Boolean);

  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const displayQty = quantity || 1;

  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = product.discountPercent ||
    (hasDiscount ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0);

  const categoryLabel = getCategoryLabel(product);
  const pairings = getPairingSuggestions(product, 3);
  const testimonials = getTestimonialsFor(categoryLabel);
  const faqs = getFaqs();

  useEffect(() => {
    setActiveImage(product.image);
    logProductView(product.id);
    const handleScroll = () => setIsSticky(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [product.id, product.image]);

  const handleIncrease = () => {
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + 1);
    } else {
      addToCart({ id: product.id, name: product.name, price: product.price, quantity: 1, image: product.image }, { silent: true });
    }
  };

  const handleDecrease = () => {
    if (!cartItem) return;
    if (cartItem.quantity <= 1) removeFromCart(product.id);
    else updateQuantity(product.id, cartItem.quantity - 1);
  };

  const handleAddToBag = () => {
    if (!cartItem) {
      addToCart(
        { id: product.id, name: product.name, price: product.price, quantity: 1, image: product.image },
        { silent: true }
      );
    }
    if (customMessage.trim()) {
      updateItemNote(product.id, customMessage.trim());
    }
    setShowBagToast(true);
    setTimeout(() => setShowBagToast(false), 3000);
  };

  const handleWhatsAppOrder = () => {
    if (!cartItem) {
      addToCart({ id: product.id, name: product.name, price: product.price, quantity: 1, image: product.image }, { silent: true });
    }
    if (customMessage.trim()) {
      updateItemNote(product.id, customMessage.trim());
    }
    const phone = (business.phone || "").replace(/[^0-9]/g, "");
    const noteLine = customMessage.trim() ? `\n*Note:* ${customMessage.trim()}` : "";
    const msg = encodeURIComponent(
      `Hi! I'd like to order:\n*${displayQty}x ${product.name}* (KES ${(product.price * displayQty).toLocaleString()})${noteLine}\n\nIs this available?`
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, url });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    }
  };

  return (
    <div className="bg-background min-h-screen pb-32 pt-4">
      <div className="max-w-6xl mx-auto px-4">

        {/* BREADCRUMB + BACK TO SHOP */}
        <div className="flex items-center justify-between mb-6">
          <nav className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-muted">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href="/menu" className="hover:text-foreground transition-colors">Menu</Link>
            <span>/</span>
            <span className="text-subtext">{categoryLabel}</span>
            <span>/</span>
            <span className="text-foreground truncate max-w-[120px]">{product.name}</span>
          </nav>

          <button
            onClick={() => router.push("/menu")}
            className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-muted hover:text-foreground transition-all cursor-pointer"
          >
            <FaArrowLeft size={8} />
            <span>Back to Menu</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">

          {/* ZONE A: GALLERY */}
          <div className="space-y-4">
            <div className="aspect-square relative rounded-xl bg-surface2 border border-border overflow-hidden">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />

              {discountPercent > 0 && (
                <div className="absolute top-4 left-4 bg-green text-background text-[10px] font-black px-2.5 py-1 rounded-md">
                  -{discountPercent}%
                </div>
              )}

              {product.jabysFavorite && (
                <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur px-3 py-1.5 rounded-full border border-green/40">
                  <span className="text-[9px] font-black text-green uppercase tracking-tighter">
                    ⭐ Jaby's Favorite
                  </span>
                </div>
              )}

              <button
                onClick={handleShare}
                className="absolute bottom-4 right-4 w-9 h-9 bg-surface/90 backdrop-blur rounded-full flex items-center justify-center text-subtext hover:text-foreground border border-border shadow-sm cursor-pointer transition-all hover:scale-110"
              >
                <FaShareAlt size={12} />
              </button>
            </div>

            {galleryImages.length > 1 && (
              <div className="flex gap-3 justify-center">
                {galleryImages.slice(0, 5).map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 rounded-lg border-2 transition-all overflow-hidden cursor-pointer ${
                      activeImage === img ? "border-green scale-105" : "border-border opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`${product.name} angle ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ZONE B: INFO & ACTION */}
          <div className="flex flex-col justify-center space-y-4">

            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="green">{categoryLabel}</Badge>
              {product.bestSelling && (
                <Badge variant="muted">🔥 Best Seller</Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-foreground uppercase tracking-tighter leading-[0.9]">
              {product.name}
            </h1>

            {product.rating && (
              <div className="flex items-center gap-2 text-xs text-subtext">
                <span className="flex items-center gap-0.5 text-green">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} size={11} className={i < Math.round(product.rating) ? "" : "opacity-25"} />
                  ))}
                </span>
                <span>{product.rating.toFixed(1)} ({product.reviewCount || 0} reviews)</span>
              </div>
            )}

            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl font-black text-foreground tracking-tighter italic">
                KES {product.price.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-lg text-muted line-through font-bold">
                  KES {product.oldPrice.toLocaleString()}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="text-[10px] font-black text-danger bg-danger/10 px-2 py-0.5 rounded-md">
                  You save KES {(product.oldPrice - product.price).toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-subtext font-medium leading-relaxed max-w-md text-sm">
              {product.description}
            </p>

            {/* SERVING / PREP INFO STRIP */}
            {(product.servingInfo || product.prepInfo) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.servingInfo && (
                  <div className="flex items-center gap-3 bg-surface border border-border rounded-xl p-3">
                    <div className="w-9 h-9 rounded-full bg-surface2 flex items-center justify-center text-green shrink-0">
                      <FaUsers size={13} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] font-black uppercase text-muted tracking-widest leading-none mb-1">Serving</span>
                      <span className="text-xs font-bold text-foreground truncate">{product.servingInfo}</span>
                    </div>
                  </div>
                )}
                {product.prepInfo && (
                  <div className="flex items-center gap-3 bg-surface border border-border rounded-xl p-3">
                    <div className="w-9 h-9 rounded-full bg-surface2 flex items-center justify-center text-green shrink-0">
                      <FaClock size={13} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] font-black uppercase text-muted tracking-widest leading-none mb-1">Prep Time</span>
                      <span className="text-xs font-bold text-foreground truncate">{product.prepInfo}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* INGREDIENTS */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted ml-1">Ingredients</span>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing: string) => (
                    <span key={ing} className="px-3 py-1.5 rounded-lg bg-surface border border-border text-[11px] font-bold text-subtext">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ALLERGENS - dietary transparency */}
            {product.allergens && product.allergens.length > 0 && (
              <div className="flex items-start gap-2 bg-danger/5 border border-danger/20 rounded-xl p-3">
                <FaExclamationTriangle className="text-danger shrink-0 mt-0.5" size={12} />
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-danger block mb-1">Contains Allergens</span>
                  <span className="text-xs font-bold text-subtext">{product.allergens.join(", ")}</span>
                </div>
              </div>
            )}

            {/* OCCASION TAGS */}
            {product.occasionTags && product.occasionTags.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted ml-1">Perfect For</span>
                <div className="flex flex-wrap gap-2">
                  {product.occasionTags.map((tag: string) => (
                    <Badge key={tag} variant="green">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}

            {/* CUSTOM CAKE MESSAGE */}
            {product.allowCustomMessage && (
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted ml-1 flex items-center gap-1.5">
                  <FaGift size={10} /> Add a Message on the Cake (optional)
                </span>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder='e.g. "Happy Birthday Amy!"'
                  maxLength={60}
                  className="w-full bg-surface2 border border-border-strong rounded-lg p-3 text-sm text-foreground placeholder:text-muted min-h-[70px] focus:outline-none focus:ring-2 focus:ring-green"
                />
                <span className="text-[9px] text-muted ml-1">{customMessage.length}/60 characters</span>
              </div>
            )}

            {/* QUANTITY SELECTOR */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted ml-1">Quantity</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-surface2 border border-border-strong rounded-lg p-0.5">
                  <button
                    onClick={handleDecrease}
                    className="w-8 h-8 flex items-center justify-center text-subtext hover:text-foreground cursor-pointer transition-colors"
                  >
                    <FaMinus size={9} />
                  </button>
                  <span className="w-8 text-center font-black text-sm text-foreground">
                    {displayQty}
                  </span>
                  <button
                    onClick={handleIncrease}
                    className="w-8 h-8 flex items-center justify-center text-subtext hover:text-foreground cursor-pointer transition-colors"
                  >
                    <FaPlus size={9} />
                  </button>
                </div>
                <span className="text-[10px] text-muted font-bold">
                  Total: <span className="text-foreground font-black">KES {(product.price * displayQty).toLocaleString()}</span>
                </span>
              </div>
            </div>

            {/* ACTION BUTTONS - WhatsApp first per brand priority */}
            <div className="grid grid-cols-1 gap-3">
              <Button
                onClick={handleWhatsAppOrder}
                variant="whatsapp"
                size="lg"
                fullWidth
                className="!h-14"
                leftIcon={<FaWhatsapp size={18} />}
              >
                Order via WhatsApp
              </Button>

              <Button
                onClick={handleAddToBag}
                variant="outline"
                size="md"
                fullWidth
                className="!h-12"
                leftIcon={<FaShoppingCart size={14} />}
              >
                {cartItem ? "In Your Cart ✓" : "Add to Cart"}
              </Button>
            </div>
          </div>
        </div>

        {/* PAIRS WELL WITH */}
        {pairings.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-black text-foreground uppercase tracking-tighter mb-4">Pairs Well With</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {pairings.map((item: any) => (
                <ProductCard key={item.id} {...item} />
              ))}
            </div>
          </section>
        )}

        {/* TESTIMONIALS */}
        {testimonials.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-black text-foreground uppercase tracking-tighter mb-4">What Customers Say</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {testimonials.map((t: any, i: number) => (
                <div key={i} className="bg-surface border border-border rounded-xl p-4 space-y-2">
                  <FaQuoteLeft className="text-green/40" size={16} />
                  <p className="text-xs text-subtext font-medium leading-relaxed">{t.text}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] font-black text-foreground uppercase tracking-wide">{t.name}</span>
                    <span className="flex items-center gap-0.5 text-green">
                      {[...Array(5)].map((_, i2) => (
                        <FaStar key={i2} size={9} className={i2 < t.rating ? "" : "opacity-25"} />
                      ))}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ ACCORDION */}
        {faqs.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-black text-foreground uppercase tracking-tighter mb-4">Frequently Asked Questions</h2>
            <div className="space-y-2">
              {faqs.map((faq: any, i: number) => (
                <div key={i} className="bg-surface border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
                  >
                    <span className="text-sm font-bold text-foreground pr-4">{faq.q}</span>
                    <FaChevronDown
                      size={12}
                      className={`text-muted shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 text-xs text-subtext leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>
        )}

        <RelatedProducts
          currentProductId={product.id}
          currentCategory={categoryLabel}
          maxItems={4}
        />

        <RecentlyViewed currentProductId={product.id} />

      </div>

      {/* STICKY MOBILE BAR */}
      <AnimatePresence>
        {isSticky && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 w-full bg-surface/95 backdrop-blur-xl border-t border-border p-4 flex items-center justify-between z-[100] md:hidden shadow-[0_-10px_30px_rgba(0,0,0,0.3)]"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-surface2 rounded-lg overflow-hidden">
                <img src={product.image} className="w-full h-full object-cover" alt="thumb" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-muted uppercase tracking-widest">
                  {displayQty} × KES {product.price.toLocaleString()}
                </span>
                <span className="font-black text-sm text-foreground italic">
                  KES {(product.price * displayQty).toLocaleString()}
                </span>
              </div>
            </div>
            <Button
              onClick={handleWhatsAppOrder}
              variant="whatsapp"
              size="sm"
              className="!h-11 !rounded-lg"
              leftIcon={<FaWhatsapp size={14} />}
            >
              Order Now
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BAG TOAST */}
      <AnimatePresence>
        {showBagToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-surface text-foreground px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl z-[100] border border-border-strong flex items-center gap-3"
          >
            <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center">
              <FaShoppingCart size={10} className="text-background" />
            </div>
            Item Added to Cart
          </motion.div>
        )}
      </AnimatePresence>

      {/* SHARE TOAST */}
      <AnimatePresence>
        {showShareToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-surface border border-border-strong text-foreground px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl z-[100] flex items-center gap-3"
          >
            <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center">
              <FaShareAlt size={9} className="text-background" />
            </div>
            Link Copied!
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ProductDetail;
