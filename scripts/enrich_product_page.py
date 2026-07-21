import json

path = "src/data/menu.json"
with open(path) as f:
    data = json.load(f)

# ---- 1. Add category label to every product (derived from parent, no guessing needed) ----
for cat in data["categories"]:
    for item in cat["items"]:
        item["category"] = cat["name"]

# ---- 2. allowCustomMessage flag ----
# All cakes get it. Bundles that include a cake component get it too.
CAKE_CATEGORY = "Cakes"
BUNDLE_IDS_WITH_CAKE = {501, 502, 503, 505, 506, 508}
BUNDLE_IDS_NO_CAKE = {504, 507}

for cat in data["categories"]:
    for item in cat["items"]:
        item["allowCustomMessage"] = (cat["name"] == CAKE_CATEGORY)

for bundle in data["bundles"]:
    bundle["category"] = "Bundle"
    bundle["allowCustomMessage"] = bundle["id"] in BUNDLE_IDS_WITH_CAKE

# ---- 3. Global FAQs (shown on every product page) ----
data["faqs"] = [
    {
        "q": "How much notice do you need for custom cakes?",
        "a": "Custom cakes need at least 24 hours notice. Standard cakes and bundles are baked fresh same-day."
    },
    {
        "q": "Can I customize the flavor or size?",
        "a": "Yes — message us on WhatsApp with your preferred flavor, size, and design and we'll confirm availability and pricing."
    },
    {
        "q": "Do you deliver, or is it pickup only?",
        "a": "We offer both. Delivery details and timing are confirmed directly over WhatsApp once your order is placed."
    },
    {
        "q": "How should I store my order?",
        "a": "Cakes and pastries are best enjoyed within 1–2 days. Keep cakes refrigerated if not eating the same day, and bring to room temperature before serving."
    },
    {
        "q": "Do you cater for allergies or dietary needs?",
        "a": "Check the allergen list on each product. For specific dietary needs (eggless, nut-free, etc.), message us on WhatsApp before ordering."
    }
]

# ---- 4. Placeholder testimonial pool, grouped by category ----
# NOTE: these are SAMPLE/PLACEHOLDER testimonials for layout/dev purposes only.
# Replace with real customer reviews before going live.
data["testimonials"] = {
    "Cakes": [
        {"name": "Wanjiru M.", "text": "Ordered a birthday cake with one day's notice and it looked even better than the photo. Will definitely order again.", "rating": 5},
        {"name": "Brian K.", "text": "Rich chocolate flavor, not overly sweet. Perfect size for our family gathering.", "rating": 5},
        {"name": "Amina S.", "text": "The custom message on the cake came out exactly as I asked. Great communication on WhatsApp throughout.", "rating": 4}
    ],
    "Drinks": [
        {"name": "Peter O.", "text": "Freshest juice I've had delivered — you can tell it's squeezed to order, not sitting around.", "rating": 5},
        {"name": "Faith N.", "text": "The mango smoothie is now a weekly order for me. Consistent quality every time.", "rating": 5}
    ],
    "Pastries": [
        {"name": "James M.", "text": "Croissants were flaky and clearly baked that morning. Great with my coffee order.", "rating": 5},
        {"name": "Grace W.", "text": "Ordered a mixed box for a work meeting, everyone asked where it was from.", "rating": 4}
    ],
    "Bundle": [
        {"name": "Samuel K.", "text": "The family combo was great value and saved me from ordering separately. Everything arrived together, still fresh.", "rating": 5},
        {"name": "Lucy A.", "text": "Got the movie night bundle for the kids' weekend — portions were generous.", "rating": 5}
    ]
}

with open(path, "w") as f:
    json.dump(data, f, indent=2)

print("Schema update complete.")
print("Sample check - product 101 category:", 
      next(i for c in data["categories"] for i in c["items"] if i["id"]==101).get("category"),
      "| allowCustomMessage:",
      next(i for c in data["categories"] for i in c["items"] if i["id"]==101).get("allowCustomMessage"))
print("FAQs count:", len(data["faqs"]))
print("Testimonial categories:", list(data["testimonials"].keys()))
