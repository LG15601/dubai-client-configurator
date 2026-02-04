"use client";

import { useState } from "react";
import Link from "next/link";

const collections = [
  { id: "modern-warm", name: "Modern Warm", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop", count: 24 },
  { id: "italian-classic", name: "Italian Classic", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=400&fit=crop", count: 18 },
  { id: "minimal-zen", name: "Minimal Zen", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop", count: 21 },
  { id: "dubai-luxury", name: "Dubai Luxury", image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&h=400&fit=crop", count: 15 },
];

const materials = [
  {
    id: 1,
    name: "Calacatta Marble",
    brand: "Carrara Italia",
    category: "Flooring",
    price: "AED 850/m²",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    collection: "italian-classic",
    recommended: true,
  },
  {
    id: 2,
    name: "Brushed Gold Faucet",
    brand: "Dornbracht",
    category: "Fixtures",
    price: "AED 4,200",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop",
    collection: "dubai-luxury",
    recommended: true,
  },
  {
    id: 3,
    name: "Oak Herringbone",
    brand: "Dinesen",
    category: "Flooring",
    price: "AED 650/m²",
    image: "https://images.unsplash.com/photo-1558618047-f4b511c24bb6?w=400&h=400&fit=crop",
    collection: "modern-warm",
    recommended: false,
  },
  {
    id: 4,
    name: "Venetian Plaster",
    brand: "Oikos",
    category: "Walls",
    price: "AED 320/m²",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&h=400&fit=crop",
    collection: "italian-classic",
    recommended: false,
  },
  {
    id: 5,
    name: "Matte Black Hardware",
    brand: "FSB",
    category: "Fixtures",
    price: "AED 180/piece",
    image: "https://images.unsplash.com/photo-1600573472591-ee6e6ba5d071?w=400&h=400&fit=crop",
    collection: "minimal-zen",
    recommended: true,
  },
  {
    id: 6,
    name: "Zellige Tiles",
    brand: "Emery & Cie",
    category: "Walls",
    price: "AED 420/m²",
    image: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=400&h=400&fit=crop",
    collection: "modern-warm",
    recommended: false,
  },
  {
    id: 7,
    name: "Crema Marfil Stone",
    brand: "Levantina",
    category: "Countertops",
    price: "AED 780/m²",
    image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=400&h=400&fit=crop",
    collection: "dubai-luxury",
    recommended: false,
  },
  {
    id: 8,
    name: "Japanese Hinoki",
    brand: "Nakagawa",
    category: "Flooring",
    price: "AED 1,200/m²",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=400&fit=crop",
    collection: "minimal-zen",
    recommended: true,
  },
];

const categories = ["All", "Flooring", "Walls", "Countertops", "Fixtures"];

export default function MaterialsPage() {
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedMaterials, setSelectedMaterials] = useState<number[]>([]);
  const [showDetail, setShowDetail] = useState<number | null>(null);

  const filteredMaterials = materials.filter((m) => {
    if (activeCollection && m.collection !== activeCollection) return false;
    if (activeCategory !== "All" && m.category !== activeCategory) return false;
    return true;
  });

  const toggleSelect = (id: number) => {
    setSelectedMaterials((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectedMaterial = showDetail ? materials.find((m) => m.id === showDetail) : null;

  return (
    <div className="min-h-screen bg-gradient-dubai pb-24 lg:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-white/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 rounded-xl hover:bg-white/50 transition-colors">
              <svg className="w-5 h-5 text-dubai-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="font-display text-xl font-bold text-brand-navy">Fashion House</h1>
              <p className="text-sm text-dubai-500">Curated Materials Collection</p>
            </div>
          </div>
          {selectedMaterials.length > 0 && (
            <button className="btn-gold flex items-center gap-2">
              <span>My Selections</span>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">
                {selectedMaterials.length}
              </span>
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Collections */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-brand-navy mb-4">Browse by Ambiance</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {collections.map((collection) => (
              <button
                key={collection.id}
                onClick={() => setActiveCollection(activeCollection === collection.id ? null : collection.id)}
                className={`relative aspect-[3/2] rounded-2xl overflow-hidden group ${
                  activeCollection === collection.id ? "ring-3 ring-brand-gold ring-offset-2" : ""
                }`}
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-semibold">{collection.name}</p>
                  <p className="text-white/70 text-sm">{collection.count} items</p>
                </div>
                {activeCollection === collection.id && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-brand-gold flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Filters */}
        <section className="mb-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? "bg-brand-navy text-white"
                    : "bg-white text-dubai-600 hover:bg-dubai-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Recommended Section */}
        {!activeCollection && activeCategory === "All" && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">✨</span>
              <h2 className="text-lg font-semibold text-brand-navy">Recommended for You</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6">
              {materials.filter((m) => m.recommended).map((material) => (
                <div
                  key={material.id}
                  className="flex-shrink-0 w-64 card-luxury card-hover overflow-hidden cursor-pointer"
                  onClick={() => setShowDetail(material.id)}
                >
                  <div className="relative aspect-square">
                    <img
                      src={material.image}
                      alt={material.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-brand-gold text-white text-xs font-medium">
                      Recommended
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-dubai-500 mb-1">{material.brand}</p>
                    <p className="font-medium text-brand-navy mb-1">{material.name}</p>
                    <p className="text-brand-gold font-semibold">{material.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Materials Grid */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-brand-navy">
              {activeCollection 
                ? collections.find((c) => c.id === activeCollection)?.name 
                : "All Materials"}
            </h2>
            <p className="text-sm text-dubai-500">{filteredMaterials.length} items</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredMaterials.map((material) => (
              <div
                key={material.id}
                className="card-luxury card-hover overflow-hidden group"
              >
                <div 
                  className="relative aspect-square cursor-pointer"
                  onClick={() => setShowDetail(material.id)}
                >
                  <img
                    src={material.image}
                    alt={material.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelect(material.id);
                    }}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      selectedMaterials.includes(material.id)
                        ? "bg-brand-gold text-white"
                        : "bg-white/80 text-dubai-500 opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {selectedMaterials.includes(material.id) ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    )}
                  </button>
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 rounded-full bg-white/90 text-xs font-medium text-dubai-600">
                      {material.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-dubai-500 mb-1">{material.brand}</p>
                  <p className="font-medium text-brand-navy mb-1 truncate">{material.name}</p>
                  <p className="text-brand-gold font-semibold text-sm">{material.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Material Detail Sheet */}
      {showDetail && selectedMaterial && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDetail(null)}
          />
          <div className="relative bg-white rounded-t-3xl lg:rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="sticky top-0 bg-white z-10 p-4 border-b border-dubai-100 flex items-center justify-between">
              <h3 className="font-display text-xl font-bold text-brand-navy">Material Details</h3>
              <button
                onClick={() => setShowDetail(null)}
                className="p-2 rounded-full hover:bg-dubai-100 transition-colors"
              >
                <svg className="w-5 h-5 text-dubai-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                <img
                  src={selectedMaterial.image}
                  alt={selectedMaterial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mb-6">
                <p className="text-sm text-dubai-500 mb-1">{selectedMaterial.brand}</p>
                <h4 className="font-display text-2xl font-bold text-brand-navy mb-2">{selectedMaterial.name}</h4>
                <p className="text-2xl font-bold text-brand-gold mb-4">{selectedMaterial.price}</p>
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-dubai-100 text-dubai-600 text-sm">
                    {selectedMaterial.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-dubai-100 text-dubai-600 text-sm">
                    {collections.find((c) => c.id === selectedMaterial.collection)?.name}
                  </span>
                </div>
                <p className="text-dubai-600 leading-relaxed">
                  Premium quality material sourced from the finest suppliers. Perfect for creating 
                  an elegant and sophisticated ambiance in your space. Available in multiple finishes 
                  and sizes to suit your specific requirements.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    toggleSelect(selectedMaterial.id);
                    setShowDetail(null);
                  }}
                  className={`flex-1 py-4 rounded-2xl font-semibold transition-all ${
                    selectedMaterials.includes(selectedMaterial.id)
                      ? "bg-dubai-100 text-dubai-600"
                      : "btn-gold"
                  }`}
                >
                  {selectedMaterials.includes(selectedMaterial.id) ? "Remove from Selection" : "Add to My Selection"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selection Summary Bar */}
      {selectedMaterials.length > 0 && (
        <div className="fixed bottom-20 lg:bottom-6 left-6 right-6 glass-strong rounded-2xl p-4 shadow-glass-lg z-40 animate-slide-up">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {selectedMaterials.slice(0, 3).map((id) => {
                  const m = materials.find((x) => x.id === id);
                  return (
                    <img
                      key={id}
                      src={m?.image}
                      alt=""
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    />
                  );
                })}
                {selectedMaterials.length > 3 && (
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-dubai-200 flex items-center justify-center text-sm font-medium text-dubai-600">
                    +{selectedMaterials.length - 3}
                  </div>
                )}
              </div>
              <div>
                <p className="font-medium text-brand-navy">{selectedMaterials.length} materials selected</p>
                <p className="text-sm text-dubai-500">Ready to validate</p>
              </div>
            </div>
            <button className="btn-gold">
              Validate Selection →
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 lg:hidden glass border-t border-white/20 px-6 py-3 z-30">
        <div className="flex items-center justify-around">
          {[
            { icon: "🏠", label: "Home", href: "/", active: false },
            { icon: "✨", label: "Materials", href: "/materials", active: true },
            { icon: "📅", label: "Timeline", href: "/timeline", active: false },
            { icon: "💬", label: "Messages", href: "/messages", active: false },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-1 ${item.active ? "text-brand-gold" : "text-dubai-500"}`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
