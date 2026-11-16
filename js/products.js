// Categories and products
const CATEGORIES = [
  { id: "cement", name: "Cement and Concrete", cover: 1 },
  { id: "steel", name: "Steel and Metal", cover: 5 },
  { id: "timber", name: "Timber and Boards", cover: 10 },
  { id: "roofing", name: "Roofing", cover: 14 },
  { id: "plumbing", name: "Plumbing", cover: 15 },
  { id: "electrical", name: "Electrical", cover: 19 },
  { id: "paint", name: "Paint and Finishes", cover: 22 },
  { id: "tools", name: "Tools", cover: 26 },
];

const PRODUCTS = [
  { id: 1, name: "Portland Cement 50kg", category: "cement", price: 780, unit: "bag", stock: 320, featured: true,
    description: "General-purpose 42.5N Portland cement for foundations, slabs, columns and plastering. Consistent strength and fast setting." },
  { id: 2, name: "Ready-Mix Concrete Blocks (6 inch)", category: "cement", price: 65, unit: "piece", stock: 5000,
    description: "Machine-cut 6 inch hollow concrete blocks. Ideal for walling, partitions and perimeter fences." },
  { id: 3, name: "River Sand (1 tonne)", category: "cement", price: 2800, unit: "tonne", stock: 40,
    description: "Washed river sand suitable for concrete mixing, plastering and block laying." },
  { id: 4, name: "Ballast 3/4 inch (1 tonne)", category: "cement", price: 3200, unit: "tonne", stock: 35,
    description: "Crushed stone aggregate for concrete slabs, beams and driveways." },

  { id: 5, name: "Y12 Reinforcement Bar (12m)", category: "steel", price: 1150, unit: "bar", stock: 600, featured: true,
    description: "High-tensile deformed steel bar, 12mm diameter, 12 metres long. Meets KEBS standards for structural work." },
  { id: 6, name: "Y10 Reinforcement Bar (12m)", category: "steel", price: 820, unit: "bar", stock: 540,
    description: "10mm deformed steel bar for slabs, lintels and ring beams." },
  { id: 7, name: "BRC Mesh A142 (2.4m x 4.8m)", category: "steel", price: 4500, unit: "sheet", stock: 90,
    description: "Welded wire mesh for ground slabs and floor screeds. Reduces cracking." },
  { id: 8, name: "Binding Wire 25kg", category: "steel", price: 3900, unit: "roll", stock: 75,
    description: "Annealed soft binding wire for tying reinforcement bars." },

  { id: 9, name: "Cypress Timber 2x4 inch (per ft)", category: "timber", price: 45, unit: "ft", stock: 8000,
    description: "Treated cypress timber for roof trusses, formwork and framing." },
  { id: 10, name: "Marine Plywood 18mm", category: "timber", price: 4200, unit: "sheet", stock: 60, featured: true,
    description: "Water-resistant 8x4 ft marine plywood. Great for shuttering, furniture and cabinets." },
  { id: 11, name: "MDF Board 16mm", category: "timber", price: 3100, unit: "sheet", stock: 80,
    description: "Smooth medium-density fibreboard for interior furniture and fittings." },

  { id: 12, name: "Box Profile Iron Sheet G28 (3m)", category: "roofing", price: 1250, unit: "sheet", stock: 400, featured: true,
    description: "Pre-painted box profile roofing sheet, gauge 28, available in brick red." },
  { id: 13, name: "Roofing Nails 1kg", category: "roofing", price: 320, unit: "kg", stock: 250,
    description: "Galvanised umbrella-head roofing nails with rubber washers." },
  { id: 14, name: "Clay Roof Tiles (pack of 10)", category: "roofing", price: 1800, unit: "pack", stock: 120,
    description: "Durable terracotta roof tiles with a classic finish. Excellent heat insulation." },

  { id: 15, name: "PVC Pipe 4 inch (6m)", category: "plumbing", price: 1450, unit: "length", stock: 150,
    description: "Heavy-duty PVC pipe for drainage and sewer lines." },
  { id: 16, name: "PPR Pipe 20mm (4m)", category: "plumbing", price: 380, unit: "length", stock: 300,
    description: "Hot and cold water PPR pipe for domestic plumbing." },
  { id: 17, name: "Water Tank 1000L", category: "plumbing", price: 11500, unit: "tank", stock: 25, featured: true,
    description: "UV-stabilised plastic water storage tank with lid. 10-year warranty." },
  { id: 18, name: "Kitchen Sink Mixer Tap", category: "plumbing", price: 2650, unit: "piece", stock: 45,
    description: "Chrome-finish swivel mixer tap for kitchen sinks." },

  { id: 19, name: "Twin and Earth Cable 2.5mm (100m)", category: "electrical", price: 7800, unit: "roll", stock: 40,
    description: "Copper twin and earth cable for socket circuits." },
  { id: 20, name: "Double Socket Outlet", category: "electrical", price: 450, unit: "piece", stock: 300,
    description: "13A switched double socket, white finish." },
  { id: 21, name: "LED Bulb 12W (pack of 4)", category: "electrical", price: 900, unit: "pack", stock: 200,
    description: "Energy-saving warm white LED bulbs, B22 fitting." },

  { id: 22, name: "Emulsion Paint 20L (White)", category: "paint", price: 6500, unit: "bucket", stock: 70, featured: true,
    description: "Washable vinyl matt emulsion for interior and exterior walls." },
  { id: 23, name: "Gloss Paint 4L", category: "paint", price: 2400, unit: "tin", stock: 90,
    description: "High-gloss oil paint for wood and metal surfaces." },
  { id: 24, name: "Wall Putty 20kg", category: "paint", price: 1350, unit: "bag", stock: 110,
    description: "Smooth skimming putty to prepare walls before painting." },

  { id: 25, name: "Claw Hammer 16oz", category: "tools", price: 850, unit: "piece", stock: 60,
    description: "Steel claw hammer with anti-slip rubber grip." },
  { id: 26, name: "Wheelbarrow (Heavy Duty)", category: "tools", price: 5500, unit: "piece", stock: 30, featured: true,
    description: "Steel tray wheelbarrow with pneumatic tyre. 85L capacity." },
  { id: 27, name: "Spirit Level 60cm", category: "tools", price: 1100, unit: "piece", stock: 55,
    description: "Aluminium spirit level with 3 vials for accurate levelling." },
  { id: 28, name: "Measuring Tape 8m", category: "tools", price: 600, unit: "piece", stock: 100,
    description: "Retractable steel measuring tape with belt clip." },
];

function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id);
}

function getProduct(id) {
  return PRODUCTS.find((p) => p.id === Number(id));
}

function productImageSrc(id) {
  return `images/products/product-${id}.jpg`;
}
