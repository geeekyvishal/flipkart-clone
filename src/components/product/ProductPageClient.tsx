"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import "./product.css";

// --- Mock Fallback Assets ---
const productAssets = {
  likeIcon: "https://img.icons8.com/material-outlined/24/like--v1.png",
  shareIcon: "https://img.icons8.com/material-outlined/24/forward.png",
  wowDealIcon: "https://img.icons8.com/color/48/discount--v1.png",
  sevenDaysReturnIcon: "https://img.icons8.com/color/48/return.png",
  cashOnDeliveryIcon: "https://img.icons8.com/color/48/cash-in-hand.png",
  flipkartAssuredIcon: "https://img.icons8.com/color/48/approval--v1.png",
  deliveryIcon: "https://img.icons8.com/color/48/in-transit--v1.png",
  homeDeliveryIcon: "https://img.icons8.com/color/48/home.png",
  shopIcon: "https://img.icons8.com/color/48/shop.png",
  cardIcon: "https://img.icons8.com/plumpy/24/bank-cards.png",
  upiIcon: "https://img.icons8.com/color/48/bhim-upi.png",
  giftVoucherIcon: "https://img.icons8.com/color/48/gift.png",
  emiIcon: "https://img.icons8.com/color/48/money--v1.png",
  bajajIcon: "https://img.icons8.com/color/48/briefcase.png"
};

const productContent = {
  emiCards: [
    {
      icon: productAssets.giftVoucherIcon,
      title: "₹1,250 Gift Vouchers | 5% Cashback",
      subtitle: "Flipkart Axis Bank Credit Card",
      cta: "Apply Now",
    },
    {
      icon: productAssets.emiIcon,
      title: "Get No Cost EMI | Unlock ₹1 Lakh",
      subtitle: "Flipkart EMI Options",
      cta: "Apply",
    },
    {
      icon: productAssets.bajajIcon,
      title: "₹250 Voucher | Upto ₹400* off",
      subtitle: "Flipkart Bajaj Insta EMI",
      cta: "Apply Now",
    },
  ],
  protectionPlanItems: [
    {
      icon: productAssets.bajajIcon,
      title: "Cyber Fraud Protection upt...",
      price: "@ ₹15/month",
      subPrice: "(₹183 for 1 year)",
      details: [
        { icon: productAssets.upiIcon, label: "Wallet frauds" },
        { icon: productAssets.cardIcon, label: "Credit Card Scam" },
        { icon: productAssets.cashOnDeliveryIcon, label: "Financial Loss Coverage" },
      ],
    },
  ],
  detailsTabs: [
    { id: "specifications", label: "Specifications" },
    { id: "description", label: "Description" },
    { id: "manufacturer", label: "Manufacturer info" },
  ]
};

export function ProductPageClient({ productData }: { productData: any }) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const {
    likeIcon, shareIcon, wowDealIcon, sevenDaysReturnIcon, cashOnDeliveryIcon,
    flipkartAssuredIcon, deliveryIcon, homeDeliveryIcon, shopIcon
  } = productAssets;

  const { emiCards, protectionPlanItems, detailsTabs } = productContent;

  const selectedId = productData?.id || 1;
  const isLovedStore = useWishlistStore(state => state.items.some((i) => i.id === selectedId));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLoved = mounted ? isLovedStore : false;

  // --- Page States ---
  const [isEmiOpen, setIsEmiOpen] = useState(true);
  const [activeEmiIndex, setActiveEmiIndex] = useState(0);
  const [isProtectionOpen, setIsProtectionOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(true);
  const [isQaOpen, setIsQaOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [activeDetailsTab, setActiveDetailsTab] = useState("specifications");

  const goToNextEmiCard = () => setActiveEmiIndex((prev) => (prev + 1) % emiCards.length);
  const goToPrevEmiCard = () => setActiveEmiIndex((prev) => (prev - 1 + emiCards.length) % emiCards.length);

  const showPrevEmiArrow = activeEmiIndex > 0;
  const showNextEmiArrow = activeEmiIndex < emiCards.length - 1;

  // --- Derived Variables ---
  const dynamicGallery = useMemo(() => {
    let raw = productData?.images || [];
    if (!raw.length && productData?.image) raw = [productData.image];
    return raw.length ? raw : ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"];
  }, [productData]);

  const mainImage = dynamicGallery[0] || "";
  const galleryImages = dynamicGallery;

  const displayTitle = productData?.title || "Product";
  const displayBrand = "RetailNet";
  const displayCategory = productData?.category || "Category";
  const displayRating = Number(productData?.rating || 4.1);
  const displayRatingCount = Number(productData?.reviews || 2304);
  const displaySalePrice = Number(productData?.numericPrice || 0);
  const displayMrp = Math.floor(displaySalePrice * 1.25);
  const displayStock = productData?.inStock ? 50 : 0;
  
  const isOutOfStock = displayStock <= 0;
  const stockStatusText = isOutOfStock
    ? "Out of stock"
    : displayStock <= 5
      ? `Only ${displayStock} left`
      : `In stock`;
      
  const buyNowPrice = Math.max(displaySalePrice - 65, 1);
  const displayDiscount = displayMrp > 0 ? Math.round(((displayMrp - displaySalePrice) / displayMrp) * 100) : 0;

  const specificationEntries = useMemo(() => {
    const specs = productData?.specs || {};
    const parsedSpecs = typeof specs === 'string' ? JSON.parse(specs) : specs;
    return Object.entries(parsedSpecs || {})
      .filter(([, value]) => value !== null && value !== undefined && value !== "")
      .map(([key, value]) => {
        const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
        return [label, String(value)];
      });
  }, [productData]);

  // --- Actions ---
  function handleAddToCart() {
    if (isOutOfStock) {
      alert("This product is currently out of stock");
      return false;
    }
    try {
      setIsCartLoading(true);
      addItem(productData);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return true;
    } catch (error: any) {
      alert(error.message || "Could not add to cart");
      return false;
    } finally {
      setIsCartLoading(false);
    }
  }

  async function handleBuyNow() {
    addItem(productData);
    router.push("/checkout");
  }

  function handleLikeClick() {
    toggleWishlist(productData);
  }

  return (
    <div className="product-page" id="product-page-root">
      <main className="product-main" id="product-main-content">
        <div className="container product-main-inner mx-auto max-w-7xl">
          <p className="product-breadcrumbs product-breadcrumbs--top">
            Home / {displayCategory} / {displayBrand} / {displayTitle}
          </p>
          <div className="product-content-grid">
            <section className="product-left-column">
              <div className="product-left-sticky">
                <button 
                  className="media-floating-icon media-floating-icon--like" 
                  aria-label="Add to wishlist"
                  onClick={handleLikeClick}
                >
                  {isLoved ? (
                    <svg viewBox="0 0 24 24" fill="red" className="w-6 h-6"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  ) : (
                    <img src={likeIcon} alt="Like" style={{ width: '24px' }} />
                  )}
                </button>
                <button className="media-floating-icon media-floating-icon--share" aria-label="Share product">
                  <img src={shareIcon} alt="Share" />
                </button>

                <div className="product-image-grid">
                  <div className="product-image-card product-image-card--main">
                    {mainImage ? (
                      <img src={mainImage} alt={displayTitle} className="product-media-image mix-blend-multiply" />
                    ) : (
                      <p className="product-breadcrumbs">Image unavailable</p>
                    )}
                  </div>

                  {galleryImages.map((image: string, index: number) => (
                    <div className="product-image-card" key={`gal-${index}`}>
                      <img src={image} alt={`Gallery ${index + 1}`} className="product-media-image mix-blend-multiply" />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="product-right-column">
              <div className="product-right-scroll">
                <div className="product-brand-row">
                  {mainImage ? <img src={mainImage} alt={displayTitle} className="brand-thumb mix-blend-multiply" /> : null}
                  <div className="brand-title-wrap">
                    <p className="brand-title">{displayBrand}</p>
                    <p className="brand-price-line">
                      {displayRating} ★ | ₹{displaySalePrice} <span className="ad-chip">AD</span>
                    </p>
                  </div>
                </div>

                <p className="selected-color-text">
                  Category: <span>{displayCategory}</span>
                </p>

                <h1 className="product-title-main">
                  {displayTitle}
                  <span className="id-pill">ID: {selectedId}</span>
                </h1>

                <div className="product-rating-row">
                  <span className="rating-pill">{displayRating} ★</span>
                  <span className="rating-count">{displayRatingCount} Ratings & Reviews</span>
                </div>

                <div className="deal-row">
                  <span className="deal-chip">Hot Deal</span>
                  <span className="discount-text">{displayDiscount}% off</span>
                  <span className="price-old">₹{displayMrp}</span>
                  <span className="price-new">₹{displaySalePrice}</span>
                </div>

                <p className="stock-status" aria-live="polite" data-stock-state={isOutOfStock ? "out" : displayStock <= 5 ? "low" : "in"}>
                  {stockStatusText}
                </p>

                <div className="wow-deal-strip">
                  <img src={wowDealIcon} alt="Wow deal" />
                  <span>Buy at ₹{buyNowPrice} with eligible bank offers</span>
                </div>

                <div className="accordion-list">
                  <button className="accordion-item accordion-item--primary" type="button">
                    <span>Apply offers for maximum savings!</span>
                    <span>▾</span>
                  </button>

                  <div className={`emi-accordion-shell${isEmiOpen ? " emi-accordion-shell--open" : ""}`}>
                    <button
                      className="accordion-item accordion-item--secondary"
                      type="button"
                      onClick={() => setIsEmiOpen((prev) => !prev)}
                      aria-expanded={isEmiOpen}
                    >
                      <span>Apply for Card and Instant EMI</span>
                      <span>{isEmiOpen ? "▴" : "▾"}</span>
                    </button>

                    <div className="emi-dropdown-panel" aria-label="Card and EMI offers carousel">
                      {showPrevEmiArrow && (
                        <button type="button" className="emi-carousel-arrow emi-carousel-arrow--left" onClick={goToPrevEmiCard}>‹</button>
                      )}
                      {showNextEmiArrow && (
                        <button type="button" className="emi-carousel-arrow emi-carousel-arrow--right" onClick={goToNextEmiCard}>›</button>
                      )}
                      <div className="emi-carousel-viewport">
                        <div className="emi-carousel-track" style={{ transform: `translateX(-${activeEmiIndex * 100}%)` }}>
                          {emiCards.map((card, index) => (
                            <div className="emi-carousel-slide" key={index}>
                              <div className="emi-offer-card">
                                <img src={card.icon} alt="Offer" />
                                <div className="emi-offer-content">
                                  <p className="emi-offer-title">{card.title}</p>
                                  <p className="emi-offer-subtitle">{card.subtitle}</p>
                                  <a href="#" className="emi-offer-cta">{card.cta}</a>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section-block section-block--delivery">
                  <h2>Delivery details</h2>
                  <div className="delivery-card">
                    <div className="delivery-row delivery-row--home">
                      <img src={homeDeliveryIcon} alt="Home" />
                      <p><strong>HOME</strong> IIT NAGPUR, Near IIITN Main Gate, Nagpur, ...</p>
                      <span className="delivery-row-arrow">›</span>
                    </div>
                    <div className="delivery-row delivery-row--express">
                      <img src={deliveryIcon} alt="Express delivery" />
                      <p><strong>EXPRESS</strong> Delivery by Tomorrow</p>
                    </div>
                    <div className="delivery-row delivery-row--fulfilled">
                      <img src={shopIcon} alt="Fulfilled by seller" />
                      <div className="fulfilled-block">
                        <p>Fulfilled by RetailNet</p>
                        <p>4.3 ★ • 10 years with Flipkart</p>
                        <a href="#">See other sellers</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="feature-icons-row">
                  <div className="feature-icon-card">
                    <img src={sevenDaysReturnIcon} alt="7 day return" />
                    <span>7-Day Return</span>
                  </div>
                  <div className="feature-icon-card">
                    <img src={cashOnDeliveryIcon} alt="Cash on delivery" />
                    <span>Cash on Delivery</span>
                  </div>
                  <div className="feature-icon-card">
                    <img src={flipkartAssuredIcon} alt="Flipkart assured" />
                    <span>Flipkart Assured</span>
                  </div>
                </div>

                <div className="section-block protection-accordion-shell">
                  <button
                    className="accordion-item protection-accordion-header"
                    type="button"
                    onClick={() => setIsProtectionOpen((prev) => !prev)}
                    aria-expanded={isProtectionOpen}
                  >
                    <div className="protection-accordion-heading">
                      <span className="protection-accordion-title">Protection plans</span>
                      {!isProtectionOpen && <span className="protection-accordion-subtitle">Protect your device from accidental damages</span>}
                    </div>
                    <span className="accordion-chevron">{isProtectionOpen ? "▴" : "▾"}</span>
                  </button>

                  <div className={`protection-accordion-panel${isProtectionOpen ? " protection-accordion-panel--open" : ""}`}>
                    {protectionPlanItems.map((plan, index) => (
                      <div className="protection-plan-card" key={index}>
                        <div className="protection-plan-toprow">
                          <div className="protection-plan-brand">
                            <img src={plan.icon} alt="Protection provider" />
                            <div>
                              <p className="protection-plan-title">{plan.title}</p>
                            </div>
                          </div>
                          <div className="protection-plan-price">
                            <p>{plan.price}</p>
                            <span>{plan.subPrice}</span>
                          </div>
                        </div>
                        <div className="protection-plan-divider" />
                        <div className="protection-plan-details">
                          {plan.details.map((detail) => (
                            <div className="protection-detail-row" key={detail.label}>
                              <img className="protection-detail-icon" src={detail.icon} alt={detail.label} />
                              <span>{detail.label}</span>
                            </div>
                          ))}
                          <a href="#" className="protection-more-link">See more details</a>
                        </div>
                        <div className="protection-plan-actions">
                          <select className="protection-duration-select" defaultValue="1 year">
                            <option value="1 year">1 year (₹183)</option>
                            <option value="2 years">2 years (₹329)</option>
                          </select>
                          <button type="button" className="protection-add-btn">Add plan</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="section-block details-accordion-shell">
                  <button
                    className="accordion-item details-accordion-header"
                    type="button"
                    onClick={() => setIsDetailsOpen((prev) => !prev)}
                    aria-expanded={isDetailsOpen}
                  >
                    <div className="details-accordion-heading">
                      <span className="details-accordion-title">All details</span>
                      {!isDetailsOpen && <span className="details-accordion-subtitle">Features, description and more</span>}
                    </div>
                    <span className="accordion-chevron">{isDetailsOpen ? "▴" : "▾"}</span>
                  </button>

                  <div className={`details-accordion-panel${isDetailsOpen ? " details-accordion-panel--open" : ""}`}>
                    <div className="details-tabs-row" role="tablist">
                      {detailsTabs.map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          className={`details-tab${activeDetailsTab === tab.id ? " details-tab--active" : ""}`}
                          onClick={() => setActiveDetailsTab(tab.id)}
                          role="tab"
                          aria-selected={activeDetailsTab === tab.id}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {activeDetailsTab === "specifications" && (
                      <div className="details-specs">
                        <h3>General</h3>
                        <div className="details-spec-grid">
                          {specificationEntries.map(([label, value]) => (
                            <div className="details-spec-item" key={label}>
                              <span className="details-spec-label">{label}</span>
                              <span className="details-spec-value">{value}</span>
                            </div>
                          ))}
                        </div>
                        {specificationEntries.length === 0 ? <p className="details-spec-value">Specifications are not available for this product.</p> : null}
                      </div>
                    )}

                    {activeDetailsTab === "description" && (
                      <div className="details-description">
                        <p>{productData?.description || "Description is not available for this product."}</p>
                      </div>
                    )}

                    {activeDetailsTab === "manufacturer" && (
                      <div className="details-manufacturer">
                        <div className="details-spec-single">
                          <span className="details-spec-label">Manufacturer</span>
                          <span className="details-spec-value">{displayBrand}</span>
                        </div>
                        <div className="details-spec-single">
                          <span className="details-spec-label">Category</span>
                          <span className="details-spec-value">{displayCategory}</span>
                        </div>
                      </div>
                    )}

                    <button type="button" className="details-more-toggle" onClick={() => setIsDetailsExpanded((prev) => !prev)}>
                      {isDetailsExpanded ? "See less" : "See more"}
                      <span>{isDetailsExpanded ? "▴" : "▾"}</span>
                    </button>
                  </div>
                </div>

                <div className="section-block reviews-accordion-shell">
                  <button className="accordion-item reviews-accordion-header" type="button" onClick={() => setIsReviewsOpen((prev) => !prev)}>
                    <div className="reviews-accordion-heading">
                      <span className="reviews-accordion-title">Ratings and reviews</span>
                      {!isReviewsOpen && <span className="reviews-accordion-subtitle">No reviews yet</span>}
                    </div>
                    <span className="accordion-chevron">{isReviewsOpen ? "▴" : "▾"}</span>
                  </button>
                  <div className={`reviews-accordion-panel${isReviewsOpen ? " reviews-accordion-panel--open" : ""}`}>
                    <p className="reviews-empty-state">No reviews yet</p>
                  </div>
                </div>

                <div className="section-block qa-accordion-shell">
                  <button className="accordion-item qa-accordion-header" type="button" onClick={() => setIsQaOpen((prev) => !prev)}>
                    <div className="qa-accordion-heading">
                      <span className="qa-accordion-title">Questions and Answers</span>
                      {!isQaOpen && <span className="qa-accordion-subtitle">No questions and answers available</span>}
                    </div>
                    <span className="accordion-chevron">{isQaOpen ? "▴" : "▾"}</span>
                  </button>
                  <div className={`qa-accordion-panel${isQaOpen ? " qa-accordion-panel--open" : ""}`}>
                    <p className="qa-empty-state">Be the first to ask about this product</p>
                    <input type="text" className="qa-input" placeholder="Ask a question" />
                  </div>
                </div>

              </div>

              <div className="right-footer-actions">
                <button
                  className="btn-cart"
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isCartLoading || !productData || isOutOfStock}
                >
                  ADD TO CART
                </button>
                <button
                  className="btn-buy"
                  type="button"
                  onClick={handleBuyNow}
                  disabled={isCartLoading || !productData || isOutOfStock}
                >
                  BUY NOW
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Flipkart Style Toast */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-[#212121] text-white px-6 py-4 rounded-sm flex items-center justify-between shadow-2xl min-w-[320px] transition-all animate-in slide-in-from-bottom-5">
          <span className="text-[14px]">Item added to cart</span>
          <button 
             onClick={() => router.push('/cart')} 
             className="text-[#FF9F00] font-bold text-[14px] ml-6 cursor-pointer"
          >
            GO TO CART
          </button>
        </div>
      )}
    </div>
  );
}
