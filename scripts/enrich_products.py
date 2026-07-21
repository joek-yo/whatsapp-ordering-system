import json

path = "src/data/menu.json"
with open(path) as f:
    data = json.load(f)

enrichment = {
    # ---------------- CAKES ----------------
    101: dict(ingredients=["Wheat flour","Cocoa powder","Fresh butter","Eggs","Sugar"],
               allergens=["Gluten","Eggs","Dairy"], servingInfo="Serves 8–10",
               prepInfo="Baked fresh same-day, ready in 2–3 hours",
               occasionTags=["Birthday","Celebration"], rating=4.8, reviewCount=94),
    102: dict(ingredients=["Wheat flour","Cocoa","Buttermilk","Cream cheese frosting"],
               allergens=["Gluten","Eggs","Dairy"], servingInfo="6 pieces",
               prepInfo="Baked fresh daily",
               occasionTags=["Snack","Party"], rating=4.6, reviewCount=52),
    103: dict(ingredients=["Wheat flour","Vanilla extract","Fresh cream","Eggs","Sugar"],
               allergens=["Gluten","Eggs","Dairy"], servingInfo="Serves 8–10",
               prepInfo="Baked fresh same-day, ready in 2–3 hours",
               occasionTags=["Birthday","Wedding","Anniversary"], rating=4.7, reviewCount=63),
    104: dict(ingredients=["Wheat flour","Dark chocolate","Fresh cream","Cherries","Eggs"],
               allergens=["Gluten","Eggs","Dairy"], servingInfo="Serves 8–10",
               prepInfo="Baked fresh same-day, ready in 2–3 hours",
               occasionTags=["Birthday","Celebration","Anniversary"], rating=4.9, reviewCount=110),
    108: dict(ingredients=["Wheat flour","Dark chocolate fudge","Butter","Eggs","Sugar"],
               allergens=["Gluten","Eggs","Dairy"], servingInfo="Serves 10–12",
               prepInfo="Baked fresh same-day, ready in 2–3 hours",
               occasionTags=["Birthday","Celebration"], rating=4.8, reviewCount=71),
    105: dict(ingredients=["Wheat flour","Fresh strawberries","Cream","Eggs","Sugar"],
               allergens=["Gluten","Eggs","Dairy"], servingInfo="Serves 8–10",
               prepInfo="Baked fresh same-day, ready in 2–3 hours",
               occasionTags=["Birthday","Anniversary"], rating=4.7, reviewCount=48),
    106: dict(ingredients=["Wheat flour","Grated carrots","Walnuts","Cream cheese frosting","Eggs"],
               allergens=["Gluten","Eggs","Dairy","Nuts"], servingInfo="Serves 8–10",
               prepInfo="Baked fresh same-day, ready in 2–3 hours",
               occasionTags=["Everyday Treat"], rating=4.5, reviewCount=29),
    107: dict(ingredients=["Wheat flour","Fresh lemon zest","Butter","Eggs","Sugar glaze"],
               allergens=["Gluten","Eggs","Dairy"], servingInfo="Serves 8–10",
               prepInfo="Baked fresh same-day, ready in 2–3 hours",
               occasionTags=["Afternoon Tea","Everyday Treat"], rating=4.6, reviewCount=37),
    109: dict(ingredients=["Wheat flour","Fresh butter","Eggs","Sugar","Custom toppings on request"],
               allergens=["Gluten","Eggs","Dairy"], servingInfo="Custom size, serves as requested",
               prepInfo="Made to order — 24hr notice required, design consultation via WhatsApp",
               occasionTags=["Birthday","Wedding","Custom Order"], rating=4.9, reviewCount=41),
    110: dict(ingredients=["Wheat flour","Butter","Eggs","Assorted flavored frostings"],
               allergens=["Gluten","Eggs","Dairy"], servingInfo="12 pieces, assorted flavors",
               prepInfo="Baked fresh daily",
               occasionTags=["Party","Snack"], rating=4.6, reviewCount=44),

    # ---------------- DRINKS ----------------
    201: dict(ingredients=["Fresh oranges"], allergens=[], servingInfo="500ml",
               prepInfo="Freshly squeezed to order",
               occasionTags=["Refreshment","Everyday"], rating=4.5, reviewCount=33),
    202: dict(ingredients=["Fresh mango","Milk","Yogurt"], allergens=["Dairy"], servingInfo="450ml",
               prepInfo="Blended fresh to order",
               occasionTags=["Refreshment","Treat"], rating=4.7, reviewCount=58),
    203: dict(ingredients=["Fresh passion fruit","Water","Sugar"], allergens=[], servingInfo="500ml",
               prepInfo="Freshly prepared to order",
               occasionTags=["Refreshment"], rating=4.5, reviewCount=27),
    204: dict(ingredients=["Fresh pineapple","Mint leaves","Water"], allergens=[], servingInfo="500ml",
               prepInfo="Freshly prepared to order",
               occasionTags=["Refreshment"], rating=4.6, reviewCount=31),
    207: dict(ingredients=["Milk","Vanilla ice cream","Vanilla syrup"], allergens=["Dairy"], servingInfo="400ml",
               prepInfo="Blended fresh to order",
               occasionTags=["Treat"], rating=4.4, reviewCount=18),
    205: dict(ingredients=["Fresh strawberries","Milk","Yogurt"], allergens=["Dairy"], servingInfo="450ml",
               prepInfo="Blended fresh to order",
               occasionTags=["Refreshment","Treat"], rating=4.6, reviewCount=39),
    206: dict(ingredients=["Milk","Chocolate syrup","Chocolate ice cream"], allergens=["Dairy"], servingInfo="400ml",
               prepInfo="Blended fresh to order",
               occasionTags=["Treat"], rating=4.7, reviewCount=42),
    208: dict(ingredients=["Espresso","Milk","Ice"], allergens=["Dairy"], servingInfo="400ml",
               prepInfo="Brewed and prepared fresh to order",
               occasionTags=["Morning Pick-Me-Up"], rating=4.6, reviewCount=51),
    209: dict(ingredients=["Espresso","Steamed milk","Milk foam"], allergens=["Dairy"], servingInfo="250ml",
               prepInfo="Brewed fresh to order",
               occasionTags=["Morning Pick-Me-Up"], rating=4.7, reviewCount=46),
    210: dict(ingredients=["Purified water"], allergens=[], servingInfo="500ml",
               prepInfo="Sealed bottle",
               occasionTags=["Everyday"], rating=4.5, reviewCount=15),

    # ---------------- PASTRIES ----------------
    301: dict(ingredients=["Wheat flour","Butter","Cream cheese"], allergens=["Gluten","Dairy","Eggs"],
               servingInfo="1 piece", prepInfo="Baked fresh daily",
               occasionTags=["Afternoon Tea","Breakfast"], rating=4.5, reviewCount=26),
    302: dict(ingredients=["Wheat flour","Butter","Dark chocolate"], allergens=["Gluten","Dairy","Eggs"],
               servingInfo="1 piece", prepInfo="Baked fresh daily",
               occasionTags=["Breakfast","Snack"], rating=4.7, reviewCount=48),
    303: dict(ingredients=["Wheat flour","Butter","Fresh apples","Cinnamon"], allergens=["Gluten","Dairy"],
               servingInfo="1 piece", prepInfo="Baked fresh daily",
               occasionTags=["Afternoon Tea","Snack"], rating=4.6, reviewCount=31),
    305: dict(ingredients=["Wheat flour","Butter","Almond paste","Sliced almonds"], allergens=["Gluten","Dairy","Nuts","Eggs"],
               servingInfo="1 piece", prepInfo="Baked fresh daily",
               occasionTags=["Breakfast","Afternoon Tea"], rating=4.7, reviewCount=34),
    307: dict(ingredients=["Wheat flour","Choux pastry","Chocolate glaze","Cream filling"], allergens=["Gluten","Dairy","Eggs"],
               servingInfo="1 piece", prepInfo="Baked and filled fresh daily",
               occasionTags=["Afternoon Tea","Treat"], rating=4.7, reviewCount=29),
    304: dict(ingredients=["Wheat flour","Butter","Cinnamon sugar","Icing"], allergens=["Gluten","Dairy","Eggs"],
               servingInfo="1 piece", prepInfo="Baked fresh daily",
               occasionTags=["Breakfast","Snack"], rating=4.8, reviewCount=57),
    306: dict(ingredients=["Wheat flour","Pastry cream","Fresh seasonal fruit"], allergens=["Gluten","Dairy","Eggs"],
               servingInfo="1 piece", prepInfo="Baked fresh daily, assembled with seasonal fruit",
               occasionTags=["Afternoon Tea","Celebration"], rating=4.8, reviewCount=39),
    308: dict(ingredients=["Wheat flour","Pecans","Butter","Brown sugar syrup"], allergens=["Gluten","Dairy","Nuts","Eggs"],
               servingInfo="1 slice", prepInfo="Baked fresh daily",
               occasionTags=["Afternoon Tea","Treat"], rating=4.6, reviewCount=22),
    309: dict(ingredients=["Wheat flour","Fresh blueberries","Butter","Sugar"], allergens=["Gluten","Dairy","Eggs"],
               servingInfo="1 piece", prepInfo="Baked fresh daily",
               occasionTags=["Breakfast","Snack"], rating=4.6, reviewCount=35),
    310: dict(ingredients=["Wheat flour","Fresh lemon curd","Butter","Eggs"], allergens=["Gluten","Dairy","Eggs"],
               servingInfo="1 piece", prepInfo="Baked fresh daily",
               occasionTags=["Afternoon Tea"], rating=4.6, reviewCount=24),

    # ---------------- BUNDLES ----------------
    501: dict(ingredients=["1kg cake of choice","6 cupcakes","1 fresh juice"], allergens=["Gluten","Eggs","Dairy"],
               servingInfo="Serves 8–10 + extras", prepInfo="Baked and prepared fresh same-day",
               occasionTags=["Birthday","Celebration"], rating=4.8, reviewCount=37),
    502: dict(ingredients=["Chocolate cake","4 assorted drinks","Fries"], allergens=["Gluten","Eggs","Dairy"],
               servingInfo="Serves a family of 4", prepInfo="Prepared fresh same-day",
               occasionTags=["Family Gathering"], rating=4.7, reviewCount=45),
    503: dict(ingredients=["Cake of choice","2 drinks","Assorted pastries"], allergens=["Gluten","Eggs","Dairy"],
               servingInfo="Serves 4–6", prepInfo="Prepared fresh same-day",
               occasionTags=["Weekend Treat"], rating=4.6, reviewCount=21),
    504: dict(ingredients=["Fresh juice","Pastry of choice"], allergens=["Gluten","Dairy"],
               servingInfo="Serves 1–2", prepInfo="Prepared fresh to order",
               occasionTags=["Breakfast","Morning Pick-Me-Up"], rating=4.5, reviewCount=19),
    505: dict(ingredients=["Chocolate cake","Cupcakes","2 drinks"], allergens=["Gluten","Eggs","Dairy"],
               servingInfo="Serves 2", prepInfo="Prepared fresh same-day",
               occasionTags=["Date Night","Anniversary"], rating=4.8, reviewCount=33),
    506: dict(ingredients=["Cake of choice","Popcorn","4 drinks"], allergens=["Gluten","Eggs","Dairy"],
               servingInfo="Serves a family of 4", prepInfo="Prepared fresh same-day",
               occasionTags=["Family Night","Movie Night"], rating=4.7, reviewCount=28),
    507: dict(ingredients=["Pastry of choice","Tea or coffee"], allergens=["Gluten","Dairy"],
               servingInfo="Serves 1", prepInfo="Prepared fresh to order",
               occasionTags=["Afternoon Tea"], rating=4.5, reviewCount=16),
    508: dict(ingredients=["Mini cake","Cupcakes","Juice"], allergens=["Gluten","Eggs","Dairy"],
               servingInfo="Serves 4–6 kids", prepInfo="Baked and prepared fresh same-day",
               occasionTags=["Kids Birthday","Party"], rating=4.7, reviewCount=24),
}

updated_count = 0
for cat in data["categories"]:
    for item in cat["items"]:
        if item["id"] in enrichment:
            item.update(enrichment[item["id"]])
            updated_count += 1

for bundle in data["bundles"]:
    if bundle["id"] in enrichment:
        bundle.update(enrichment[bundle["id"]])
        updated_count += 1

with open(path, "w") as f:
    json.dump(data, f, indent=2)

print(f"Updated {updated_count} items (expected 38: 30 products + 8 bundles)")
