import os
os.chdir(r'D:/Ilham Stuff/Coding/Web-Apps/Ayoto')

import re
from pathlib import Path
from collections import defaultdict

# Map folder names to (category, subcategory)
FOLDER_MAP = {
    "Bed": ("bedroom", "bed"),
    "sofas": ("living-room", "sofa"),
    "divan": ("living-room", "divan"),
    "Center table": ("living-room", "center-side-table"),
    "Lounge Chair": ("living-room", "lounge-chair"),
    "tv cabinet": ("living-room", "tv-cabinet"),
    "tables": ("kitchen-dining", "dining-table"),
}

# Generate mock data
MOCK_PRICES = ["৳45,000", "৳52,000", "৳68,000", "৳75,000", "৳82,000", "৳95,000", "৳1,05,000", "৳1,20,000", "৳1,35,000", "৳1,50,000"]
MOCK_SUBTEXTS = [
    "Minimalist design with premium upholstery",
    "Crafted from solid oak with natural finish",
    "Modular configuration for versatile spaces",
    "Hand-stitched leather with ergonomic support",
    "Sleek silhouette with hidden storage",
    "Timeless form meets modern comfort",
    "Natural walnut veneer with matte steel legs",
    "Scandinavian-inspired with soft curves",
    "Compact design perfect for urban homes",
    "Statement piece with artisan detailing",
]
MOCK_COLORS = [
    ["#8B7355", "#D4C4A8", "#2F2F2F"],
    ["#C4A77D", "#3E3E3E"],
    ["#A0522D", "#DEB887", "#F5F5DC", "#696969"],
    ["#2F4F4F", "#708090"],
    ["#D2691E", "#8B4513", "#CD853F"],
]

def sanitize_import_name(name):
    """Convert a filename to a valid JS variable name."""
    name = Path(name).stem
    name = re.sub(r'[^a-zA-Z0-9]', '_', name)
    name = name.strip('_')
    if name and name[0].isdigit():
        name = '_' + name
    if name:
        name = name[0].lower() + name[1:]
    return name if name else '_img'

def generate_products_ts():
    base = Path("Assets/Furniture")
    products = defaultdict(lambda: defaultdict(list))
    
    for folder_name, (cat, subcat) in FOLDER_MAP.items():
        folder = base / folder_name
        if not folder.exists():
            continue
        for f in sorted(folder.iterdir()):
            if not f.is_file():
                continue
            stem = f.stem
            base_name = re.split(r'\s*\(', stem)[0].strip()
            if not base_name:
                continue
            if base_name.startswith("Copy of"):
                continue
            
            products[(cat, subcat, folder_name)][base_name].append(f.name)
    
    lines = []
    lines.append('import type { StaticImageData } from "next/image";')
    lines.append("")
    
    all_imports = []
    product_entries = []
    
    price_idx = 0
    subtext_idx = 0
    color_idx = 0
    
    for (cat, subcat, folder_name) in sorted(products.keys()):
        folder_products = products[(cat, subcat, folder_name)]
        
        for prod_name in sorted(folder_products.keys()):
            files = sorted(folder_products[prod_name])
            if not files:
                continue
            
            img_vars = []
            for i, fname in enumerate(files):
                var_name = sanitize_import_name(fname)
                if var_name in img_vars:
                    var_name = f"{var_name}_{i}"
                img_vars.append(var_name)
                import_path = f"@/Assets/Furniture/{folder_name}/{fname}"
                all_imports.append(f'import {var_name} from "{import_path}";')
            
            prod_id = re.sub(r'[^a-z0-9]+', '-', prod_name.lower()).strip('-')
            
            price = MOCK_PRICES[price_idx % len(MOCK_PRICES)]
            subtext = MOCK_SUBTEXTS[subtext_idx % len(MOCK_SUBTEXTS)]
            colors = MOCK_COLORS[color_idx % len(MOCK_COLORS)]
            
            price_idx += 1
            subtext_idx += 1
            color_idx += 1
            
            img_vars_str = ", ".join(img_vars)
            
            entry = f"""  {{
    id: "{prod_id}",
    name: "{prod_name}",
    images: [{img_vars_str}],
    category: "{cat}",
    subcategory: "{subcat}",
    price: "{price}", // MOCK \u2014 placeholder value
    subtext: "{subtext}", // MOCK \u2014 placeholder copy
    colorOptions: {str(colors).replace(chr(39), chr(34))}, // MOCK \u2014 placeholder hex values
  }},"""
            product_entries.append(entry)
    
    lines.extend(sorted(set(all_imports)))
    lines.append("")
    lines.append("export type Product = {")
    lines.append('  id: string;')
    lines.append('  name: string;')
    lines.append('  images: StaticImageData[];')
    lines.append('  category: string;')
    lines.append('  subcategory: string;')
    lines.append('  price: string;')
    lines.append('  subtext: string;')
    lines.append('  colorOptions: string[];')
    lines.append("};")
    lines.append("")
    lines.append("export const PRODUCTS: Product[] = [")
    lines.extend(product_entries)
    lines.append("];")
    lines.append("")
    lines.append("export function getProductsByCategory(category: string, subcategory?: string): Product[] {")
    lines.append("  return PRODUCTS.filter(")
    lines.append("    (p) =>")
    lines.append("      p.category === category &&")
    lines.append("      (subcategory === undefined || p.subcategory === subcategory)")
    lines.append("  );")
    lines.append("}")
    
    return "\n".join(lines)

if __name__ == "__main__":
    output = generate_products_ts()
    with open("data/products.ts", "w", encoding="utf-8") as f:
        f.write(output)
    print("Generated data/products.ts successfully")
