/**
 * Centralised product catalogue.
 * All content is taken from the two company brochures:
 *  - "SN GlobalTech Catalogue" (Herbal Extract Powders, Fresh Fruits, Cereals & Grains)
 *  - "Agricultural Input Portfolio" (Pesticides, fertilizers, bio-stimulants, growing media)
 *
 * Shape:
 *  {
 *    id, slug, name, category, type, featured,
 *    image, imageAlt,
 *    shortDescription, description,
 *    composition,       // "Composition" / "Active Ingredient(s)" from the brochure
 *    features: [],      // "Key Benefits" / "Benefits" / "Quality Attributes"
 *    targets: [],       // "Target Pests" / "Target Use"
 *    applications: [],  // "Application Methods" / "Applications"
 *    packaging: [],     // "Supply Option"
 *  }
 *
 * Images: /public/images/products/<slug>.webp (extracted from the catalogue).
 * Agri-input products have no photos in the brochure, so they use generated
 * placeholders in /public/images/products/placeholders/<slug>.svg —
 * replace the `image` path to swap in a real photo.
 */

const img = (slug) => `/images/products/${slug}.webp`;
const placeholder = (slug) => `/images/products/placeholders/${slug}.svg`;

/* ----------------------------------------------------------------------------
   FRESH FRUITS  (category: fruits)
---------------------------------------------------------------------------- */
const fruits = [
  {
    id: 1,
    slug: 'mango',
    name: 'Mango',
    category: 'fruits',
    type: 'Fresh Fruit',
    featured: true,
    image: img('mango'),
    shortDescription: 'Handpicked "King of Fruits" mangoes, naturally ripened and rich in flavor for premium export markets.',
    description:
      'Handpicked "King of Fruits" mangoes, naturally ripened and rich in flavor for premium export markets.',
    features: [
      'Loaded with vitamins A, C, and E for immunity and skin health.',
      'Natural digestive enzymes for wellness.',
      'Rich in antioxidants and energy-boosting nutrients.',
    ],
  },
  {
    id: 2,
    slug: 'grape',
    name: 'Grape',
    category: 'fruits',
    type: 'Fresh Fruit',
    featured: true,
    image: img('grape'),
    shortDescription: 'Premium, handpicked grapes with natural sweetness and superior quality, ideal for international markets.',
    description:
      'Premium, handpicked grapes with natural sweetness and superior quality, ideal for international markets.',
    features: [
      'Packed with antioxidants promoting heart health.',
      'Enhances immunity and overall wellness.',
      'Nutrient-rich and naturally energizing.',
    ],
  },
  {
    id: 3,
    slug: 'pomegranate',
    name: 'Pomegranate',
    category: 'fruits',
    type: 'Fresh Fruit',
    featured: true,
    image: img('pomegranate'),
    shortDescription: 'Vibrant, juicy pomegranates with superior arils and rich antioxidant content.',
    description: 'Vibrant, juicy pomegranates with superior arils and rich antioxidant content.',
    features: [
      'High in antioxidants for heart health and vitality.',
      'Promotes skin health and immune support.',
      'Anti-inflammatory and overall wellness benefits.',
    ],
  },
  {
    id: 4,
    slug: 'banana',
    name: 'Banana',
    category: 'fruits',
    type: 'Fresh Fruit',
    image: img('banana'),
    shortDescription: 'Naturally ripened, high-quality bananas offering creamy texture and rich flavor.',
    description: 'Naturally ripened, high-quality bananas offering creamy texture and rich flavor.',
    features: [
      'Excellent source of potassium for heart and muscle health.',
      'Supports digestive wellness and energy levels.',
      'Rich in essential vitamins and minerals.',
    ],
  },
  {
    id: 5,
    slug: 'guava',
    name: 'Guava',
    category: 'fruits',
    type: 'Fresh Fruit',
    image: img('guava'),
    shortDescription: 'Premium guavas with rich flavor, high vitamin content, and firm texture for international standards.',
    description:
      'Premium guavas with rich flavor, high vitamin content, and firm texture for international standards.',
    features: [
      'Rich in vitamin C for immune support.',
      'Promotes digestive health and dietary fiber intake.',
      'Supports skin and eye health.',
    ],
  },
  {
    id: 6,
    slug: 'apple',
    name: 'Apple',
    category: 'fruits',
    type: 'Fresh Fruit',
    image: img('apple'),
    shortDescription: 'Crisp, juicy apples with premium quality, ideal for international fresh fruit standards.',
    description: 'Crisp, juicy apples with premium quality, ideal for international fresh fruit standards.',
    features: [
      'High dietary fiber supporting digestive health.',
      'Promotes heart health and overall immunity.',
      'Rich in antioxidants for wellness.',
    ],
  },
  {
    id: 7,
    slug: 'citrus',
    name: 'Citrus',
    category: 'fruits',
    type: 'Fresh Fruit',
    image: img('citrus'),
    shortDescription: 'Premium citrus fruits with tangy flavor, vibrant color, and long shelf-life.',
    description: 'Premium citrus fruits with tangy flavor, vibrant color, and long shelf-life.',
    features: [
      'Excellent source of vitamin C for immunity and skin health.',
      'Rich in antioxidants for overall wellness.',
      'Supports hydration and digestion.',
    ],
  },
  {
    id: 8,
    slug: 'dragon-fruit',
    name: 'Dragon Fruit',
    category: 'fruits',
    type: 'Fresh Fruit',
    featured: true,
    image: img('dragon-fruit'),
    shortDescription: 'Exotic dragon fruits with vibrant color, delicate flavor, and high nutritional value.',
    description: 'Exotic dragon fruits with vibrant color, delicate flavor, and high nutritional value.',
    features: [
      'High in antioxidants and vitamin C for immunity.',
      'Supports digestion and gut health.',
      'Promotes skin health and overall wellness.',
    ],
  },
];

/* ----------------------------------------------------------------------------
   PESTICIDES & AGRICULTURAL INPUTS  (category: pesticides)
---------------------------------------------------------------------------- */
const agriInputs = [
  {
    id: 101,
    slug: 'neem-pesticide',
    name: 'Neem Pesticide',
    category: 'pesticides',
    type: 'Botanical Bio-Pesticide',
    featured: true,
    image: placeholder('neem-pesticide'),
    composition: 'Azadirachtin (300 PPM to 10,000 PPM)',
    shortDescription: 'Botanical bio-pesticide based on Azadirachtin, offering broad-spectrum, eco-friendly crop protection.',
    description:
      'A botanical bio-pesticide formulated with Azadirachtin (300 PPM to 10,000 PPM). It provides broad-spectrum protection by interrupting the feeding and reproductive cycles of major insect pests, and functions as an insect growth regulator (IGR).',
    features: [
      'Provides broad-spectrum protection by interrupting feeding and reproductive cycles of major insect pests.',
      'Functions as an insect growth regulator (IGR), significantly reducing pest population buildup over time.',
      'Offers eco-friendly crop protection with minimal residue, supporting organic and residue-sensitive export crops.',
      'Reduces dependency on synthetic pesticides and helps manage resistance development.',
      'Safe for beneficial insects and pollinators when applied according to recommended dosage.',
      'Improves overall plant vitality through natural bioactive compounds derived from neem.',
    ],
    targets: ['Aphids', 'Whiteflies', 'Thrips', 'Caterpillars', 'Mealybugs', 'Mites'],
    applications: ['Foliar spray', 'Soil drench', 'Drip irrigation'],
    packaging: ['Custom Packing', 'Bulk Packing (Drums/IBC)', 'Private Labelling'],
  },
  {
    id: 102,
    slug: 'cold-press-neem-oil',
    name: 'Cold Press Neem Oil',
    category: 'pesticides',
    type: 'Botanical Oil',
    featured: true,
    image: placeholder('cold-press-neem-oil'),
    composition: '100% Cold-Pressed Neem Oil',
    shortDescription: 'Multi-functional 100% cold-pressed neem oil with insecticidal, miticidal and fungistatic properties.',
    description:
      '100% cold-pressed neem oil that acts as a multi-functional botanical solution with insecticidal, miticidal, and fungistatic properties. Suitable for IPM and organic farming systems.',
    features: [
      'Acts as a multi-functional botanical solution with insecticidal, miticidal, and fungistatic properties.',
      'Forms a thin protective layer on leaf surfaces that deters pest feeding and egg laying.',
      'Disrupts insect hormonal systems, preventing larvae from maturing into reproductive adults.',
      'Biodegradable and environmentally sustainable, suitable for IPM and organic farming systems.',
      'Enhances leaf gloss and plant appearance while reducing fungal spore germination.',
      'Compatible with most bio-inputs and sustainable crop protection programs.',
    ],
    targets: ['Aphids', 'Spider Mites', 'Scale Insects', 'Whiteflies'],
    applications: ['Foliar spray', 'Soil drench'],
    packaging: ['Bulk Drums', 'IBC Tanks', 'Retail Packs', 'Private Labelling'],
  },
  {
    id: 103,
    slug: 'sulphur-80-wdg-wp',
    name: 'Sulphur 80% (WDG/WP)',
    category: 'pesticides',
    type: 'Contact Fungicide & Miticide',
    featured: true,
    image: placeholder('sulphur-80-wdg-wp'),
    composition: 'Elemental Sulphur 80%',
    shortDescription: 'Contact fungicide and miticide for powdery mildew, rust and mites, with a low resistance risk.',
    description:
      'Elemental Sulphur 80% in WDG/WP form. Provides highly effective contact control against powdery mildew and key fungal diseases, and controls mite infestations through direct contact and vapor action.',
    features: [
      'Provides highly effective contact control against powdery mildew and key fungal diseases.',
      'Controls mite infestations through direct contact and vapor action.',
      'Supplies essential sulphur nutrient required for amino acid and protein synthesis.',
      'Enhances chlorophyll development, resulting in improved photosynthesis efficiency.',
      'Offers low resistance risk due to its multi-site mode of action.',
      'Cost-effective solution for preventive and curative disease management programs.',
    ],
    targets: ['Powdery Mildew', 'Rust', 'Mites'],
    applications: ['Foliar spray'],
    packaging: ['25kg Bags', 'Bulk Packing', 'Private Labelling'],
  },
  {
    id: 104,
    slug: 'sulphur-99',
    name: 'Sulphur 99%',
    category: 'pesticides',
    type: 'Soil Amendment',
    image: placeholder('sulphur-99'),
    composition: 'Elemental Sulphur 99%',
    shortDescription: 'Elemental sulphur soil amendment for pH correction and sulphur-deficient, alkaline soils.',
    description:
      'Elemental Sulphur 99% soil amendment. Gradually oxidizes in soil to reduce alkalinity and improve soil pH balance, enhancing micronutrient availability in calcareous soils.',
    features: [
      'Gradually oxidizes in soil to reduce alkalinity and improve soil pH balance.',
      'Enhances availability of phosphorus, iron, zinc, and other micronutrients in calcareous soils.',
      'Promotes improved nutrient uptake efficiency and root development.',
      'Increases soil microbial activity responsible for nutrient mineralization.',
      'Suitable for blending in customized NPK fertilizer formulations.',
      'Supports higher productivity in sulphur-deficient and alkaline soils.',
    ],
    targets: ['Soil pH correction', 'Sulphur deficiency'],
    applications: ['Soil broadcasting', 'Pre-plant soil incorporation', 'Blending with NPK fertilizers'],
    packaging: ['Bulk & Jumbo Bags', 'Private Labelling'],
  },
  {
    id: 105,
    slug: 'silicon-spreader',
    name: 'Silicon Spreader',
    category: 'pesticides',
    type: 'Organosilicone Adjuvant',
    image: placeholder('silicon-spreader'),
    composition: 'Modified Trisiloxane Surfactant',
    shortDescription: 'Organosilicone tank-mix adjuvant that improves spray coverage, penetration and rainfastness.',
    description:
      'A modified trisiloxane surfactant used as a tank-mix additive with pesticides, fungicides, herbicides and foliar fertilizers. Dramatically reduces spray solution surface tension for complete leaf surface coverage.',
    features: [
      'Dramatically reduces spray solution surface tension for complete leaf surface coverage.',
      'Improves penetration of pesticides and foliar nutrients into plant tissues.',
      'Enhances rainfastness, reducing wash-off losses after rainfall or irrigation.',
      'Optimizes agrochemical performance while lowering required spray volumes.',
      'Minimizes spray drift and improves uniformity of application.',
      'Increases overall cost efficiency of crop protection treatments.',
    ],
    targets: ['Used with pesticides, fungicides, herbicides, foliar fertilizers'],
    applications: ['Tank mix additive'],
    packaging: ['Custom Packing', 'Bulk Packing', 'Private Labelling'],
  },
  {
    id: 106,
    slug: 'humic-acid',
    name: 'Humic Acid (Powder / Flake / Liquid)',
    category: 'pesticides',
    type: 'Organic Soil Conditioner',
    image: placeholder('humic-acid'),
    composition: 'Humic Acid 60%',
    shortDescription: 'Organic soil conditioner that improves soil structure, nutrient retention and root development.',
    description:
      'Humic Acid 60% organic soil conditioner, available as powder, flake or liquid. Improves soil structure by enhancing aggregation and porosity, and increases cation exchange capacity (CEC).',
    features: [
      'Improves soil structure by enhancing aggregation and porosity.',
      'Increases cation exchange capacity (CEC), improving nutrient retention in soil.',
      'Stimulates strong root proliferation and deeper root penetration.',
      'Enhances water holding capacity, especially in sandy soils.',
      'Improves availability and chelation of micronutrients.',
      'Strengthens plant tolerance against drought and salinity stress.',
    ],
    applications: ['Soil application', 'Drip irrigation', 'Foliar spray'],
    packaging: ['Bulk Packing', 'Customized Grades', 'Private Labelling'],
  },
  {
    id: 107,
    slug: 'amino-acid',
    name: 'Amino Acid (Powder / Liquid)',
    category: 'pesticides',
    type: 'Plant Growth Bio Stimulant',
    image: placeholder('amino-acid'),
    composition: 'Free Amino Acids 80% (Powder) & 40% (Liquid)',
    shortDescription: 'Plant growth bio-stimulant supplying readily absorbable amino acids for growth and stress tolerance.',
    description:
      'Plant growth bio-stimulant with Free Amino Acids 80% (Powder) and 40% (Liquid). Supplies readily absorbable amino acids essential for protein synthesis and accelerates vegetative growth.',
    features: [
      'Supplies readily absorbable amino acids essential for protein synthesis.',
      'Accelerates vegetative growth and enhances chlorophyll production.',
      'Improves flowering, fruit set, and overall crop uniformity.',
      'Enhances tolerance to environmental stresses such as heat, drought, and transplant shock.',
      'Promotes rapid plant recovery after pesticide application or adverse weather.',
      'Contributes to higher yield potential and improved crop quality parameters.',
    ],
    applications: ['Foliar spray', 'Fertigation'],
    packaging: ['Custom Formulation', 'Bulk & Retail Packing', 'Private Labelling'],
  },
  {
    id: 108,
    slug: 'fulvic-acid-powder',
    name: 'Fulvic Acid Powder',
    category: 'pesticides',
    type: 'Organic Nutrient Enhancer',
    image: placeholder('fulvic-acid-powder'),
    composition: 'Fulvic Acid',
    shortDescription: 'Organic nutrient enhancer acting as a natural chelator to improve fertilizer utilization efficiency.',
    description:
      'Fulvic Acid organic nutrient enhancer. Acts as a natural chelator, improving micronutrient mobility within plant tissues and improving fertilizer utilization efficiency.',
    features: [
      'Acts as a natural chelator, improving micronutrient mobility within plant tissues.',
      'Enhances membrane permeability, enabling efficient nutrient transport.',
      'Stimulates enzymatic and metabolic plant activities.',
      'Improves fertilizer utilization efficiency, reducing nutrient wastage.',
      'Encourages uniform crop growth and development.',
      'Supports improved stress resilience under adverse soil conditions.',
    ],
    applications: ['Soil application', 'Fertigation', 'Foliar spray'],
    packaging: ['25kg Bags', 'Bulk Supply', 'Private Labelling'],
  },
  {
    id: 109,
    slug: 'green-seaweed',
    name: 'Green Seaweed (Powder / Liquid)',
    category: 'pesticides',
    type: 'Organic Bio Stimulant',
    image: placeholder('green-seaweed'),
    composition: 'Seaweed Extract',
    shortDescription: 'Organic seaweed extract bio-stimulant rich in natural plant growth hormones.',
    description:
      'Organic bio-stimulant based on seaweed extract, available as powder or liquid. A rich source of natural plant growth hormones such as auxins and cytokinins.',
    features: [
      'Rich source of natural plant growth hormones such as auxins and cytokinins.',
      'Promotes extensive root branching and early crop establishment.',
      'Enhances flowering intensity and fruit setting efficiency.',
      'Improves plant tolerance to abiotic stress including drought and salinity.',
      'Increases crop size, color, and overall market quality.',
      'Strengthens plant immune response and vigor throughout growth stages.',
    ],
    applications: ['Foliar spray', 'Fertigation'],
    packaging: ['Bulk Drums', 'Retail Packs', 'Private Labelling'],
  },
  {
    id: 110,
    slug: 'boron-20',
    name: 'Boron 20%',
    category: 'pesticides',
    type: 'Water Soluble Micronutrient Fertilizer',
    image: placeholder('boron-20'),
    composition: 'Water Soluble Boron 20%',
    shortDescription: 'Water-soluble boron micronutrient fertilizer for fruit setting, seed development and crop uniformity.',
    description:
      'Water Soluble Boron 20% micronutrient fertilizer. Essential for pollen tube formation and successful fertilization; improves fruit setting, seed development, and crop uniformity.',
    features: [
      'Essential for pollen tube formation and successful fertilization.',
      'Improves fruit setting, seed development, and crop uniformity.',
      'Enhances cell wall integrity and structural strength of plants.',
      'Supports sugar transport and carbohydrate metabolism.',
      'Prevents physiological disorders caused by boron deficiency.',
      'Improves shelf life and marketable yield of fruits and vegetables.',
    ],
    applications: ['Foliar spray', 'Soil application'],
    packaging: ['Bulk & Custom Packing', 'Private Labelling'],
  },
  {
    id: 111,
    slug: 'organic-granules',
    name: 'Organic Granules',
    category: 'pesticides',
    type: 'Organic Fertilizer',
    image: placeholder('organic-granules'),
    composition: 'Compost-Based Fortified Organic Granules',
    shortDescription: 'Compost-based fortified organic granules providing slow, steady nutrient release.',
    description:
      'Compost-based fortified organic granules. Provides slow and steady nutrient release for sustained crop growth while improving soil organic carbon and long-term soil fertility.',
    features: [
      'Provides slow and steady nutrient release for sustained crop growth.',
      'Improves soil organic carbon and long-term soil fertility.',
      'Enhances beneficial microbial activity and soil biodiversity.',
      'Reduces nutrient leaching losses compared to synthetic fertilizers.',
      'Improves soil moisture retention capacity.',
      'Supports sustainable and regenerative agricultural practices.',
    ],
    applications: ['Soil broadcasting', 'Basal dose before sowing'],
    packaging: ['Bulk & Retail Packing', 'Private Labelling'],
  },
  {
    id: 112,
    slug: 'edta-chelated-micronutrients',
    name: 'EDTA Chelated Micronutrients',
    category: 'pesticides',
    type: 'Chelated Micronutrient Fertilizer',
    image: placeholder('edta-chelated-micronutrients'),
    composition: 'EDTA Chelated Zn / Fe / Mn / Cu / Ca / Mg',
    shortDescription: 'EDTA chelated Zn, Fe, Mn, Cu, Ca and Mg for rapid foliar absorption and deficiency correction.',
    description:
      'EDTA chelated micronutrient fertilizer (Zn / Fe / Mn / Cu / Ca / Mg). Protects micronutrients from precipitation in alkaline and calcareous soils and ensures rapid foliar absorption.',
    features: [
      'Protects micronutrients from precipitation in alkaline and calcareous soils.',
      'Ensures rapid foliar absorption and quick deficiency correction.',
      'Enhances chlorophyll synthesis and photosynthetic efficiency.',
      'Improves plant color, vigor, and uniform growth.',
      'Compatible with fertigation and hydroponic systems.',
      'Enhances crop productivity and quality standards.',
    ],
    applications: ['Foliar spray', 'Fertigation'],
    packaging: ['Customized Grades', 'Bulk Packing', 'Private Labelling'],
  },
  {
    id: 113,
    slug: 'amino-chelated-micronutrients',
    name: 'Amino Chelated Micronutrients',
    category: 'pesticides',
    type: 'Advanced Chelated Fertilizer',
    image: placeholder('amino-chelated-micronutrients'),
    composition: 'Amino Acid Chelated Zn / Fe / Mn / Cu / Ca / Mg',
    shortDescription: 'Amino acid chelated micronutrients combining chelation and complexing for superior uptake.',
    description:
      'Advanced chelated fertilizer with Amino Acid Chelated Zn / Fe / Mn / Cu / Ca / Mg. Combines chelation and amino acid complexing for superior nutrient uptake, ideal for high-value horticulture and export crops.',
    features: [
      'Combines chelation and amino acid complexing for superior nutrient uptake.',
      'Enhances micronutrient mobility within plant tissues.',
      'Improves stress resistance and metabolic efficiency.',
      'Provides faster visual recovery from nutrient deficiencies.',
      'Supports enhanced flowering, fruiting, and yield performance.',
      'Ideal for high-value horticulture and export crops.',
    ],
    applications: ['Foliar spray', 'Fertigation'],
    packaging: ['Custom Formulations', 'Bulk & Retail Packing', 'Private Labelling'],
  },
  {
    id: 114,
    slug: 'cocopeat',
    name: 'Cocopeat (Loose / Block)',
    category: 'pesticides',
    type: 'Growing Media',
    image: placeholder('cocopeat'),
    composition: 'Washed & Buffered Coconut Coir Pith',
    shortDescription: 'Washed and buffered coconut coir pith growing media for hydroponics, nurseries and greenhouses.',
    description:
      'Washed and buffered coconut coir pith growing media, available loose or in blocks. High water holding capacity while maintaining excellent drainage, and lightweight and compressed for cost-efficient export logistics.',
    features: [
      'High water holding capacity while maintaining excellent drainage.',
      'Provides ideal root zone aeration for healthy root growth.',
      'pH balanced and low EC after washing and buffering.',
      'Free from soil-borne pathogens, weeds, and harmful residues.',
      'Lightweight and compressed for cost-efficient export logistics.',
      'Suitable for hydroponics, nurseries, greenhouse cultivation, and potting media.',
    ],
    applications: ['Potting mix preparation', 'Hydroponic systems', 'Nursery seedling trays', 'Grow bags'],
    packaging: ['5kg Blocks', 'Grow Bags', 'Loose Bulk', 'Private Labelling'],
  },
  {
    id: 115,
    slug: 'customized-product',
    name: 'Customized Product',
    category: 'pesticides',
    type: 'Customized Fertilizers, Bio Stimulants & Crop Protection Formulations',
    image: placeholder('customized-product'),
    composition:
      'Custom NPK ratios, Micronutrient blends (EDTA / Amino Chelated), Humic + Fulvic + Seaweed combinations, Neem-based formulations, Soil-specific amendments as per buyer requirement',
    shortDescription: 'Custom fertilizer, bio-stimulant and crop protection formulations developed to buyer requirement.',
    description:
      'Customized fertilizers, bio-stimulants and crop protection formulations: custom NPK ratios, micronutrient blends (EDTA / Amino Chelated), Humic + Fulvic + Seaweed combinations, neem-based formulations and soil-specific amendments as per buyer requirement.',
    features: [
      'Formulated according to specific crop stages and agronomic requirements.',
      'Designed based on regional soil conditions and nutrient deficiency patterns.',
      'Optimized nutrient ratios for higher efficiency and improved yield performance.',
      'Compatible with foliar spray, fertigation, drip irrigation, and hydroponic systems.',
      "Enables exclusive product development under distributor's private brand.",
      'Supports regulatory compliance and labelling requirements of target export markets.',
    ],
    applications: ['Foliar spray', 'Soil application', 'Fertigation', 'Drip irrigation', 'Seed treatment (depending on formulation)'],
    packaging: ['Custom Packing', 'Bulk Packing', 'Private Labelling'],
  },
];

/* ----------------------------------------------------------------------------
   HERBAL EXTRACT POWDERS  (category: herbal-extracts)
---------------------------------------------------------------------------- */
const herbalExtracts = [
  {
    id: 201,
    slug: 'turmeric-extract-powder',
    name: 'Turmeric Extract Powder',
    category: 'herbal-extracts',
    type: 'Herbal Extract Powder',
    featured: true,
    image: img('turmeric-extract-powder'),
    composition: 'Active Ingredient: Curcumin',
    shortDescription: 'Curcumin-rich turmeric extract powder with powerful anti-inflammatory and antioxidant properties.',
    description:
      'Turmeric extract powder with Curcumin as the active ingredient. 100% natural: no additives, preservatives, or artificial colours.',
    features: [
      'Powerful anti-inflammatory and antioxidant properties',
      'Supports joint health and immune function',
      'Promotes healthy skin and aids liver detoxification',
    ],
    applications: ['Nutraceuticals', 'Functional foods', 'Cosmetics', 'Herbal medicines'],
  },
  {
    id: 202,
    slug: 'moringa-leaf-extract-powder',
    name: 'Moringa Leaf Extract Powder',
    category: 'herbal-extracts',
    type: 'Herbal Extract Powder',
    featured: true,
    image: img('moringa-leaf-extract-powder'),
    composition: 'Active Compounds: Vitamins A & C, Iron',
    shortDescription: 'Nutrient-dense moringa leaf extract powder, known as a superfood.',
    description:
      'Moringa leaf extract powder with Vitamins A & C and Iron as active compounds. Known as a superfood for its dense nutritional profile.',
    features: [
      'Known as a superfood for its dense nutritional profile',
      'Boosts energy levels, immunity, and mental clarity',
      'Supports healthy metabolism and blood sugar balance',
    ],
    applications: ['Health supplements', 'Green drinks', 'Protein blends', 'Skincare'],
  },
  {
    id: 203,
    slug: 'amla-extract-powder',
    name: 'Amla Extract Powder',
    category: 'herbal-extracts',
    type: 'Herbal Extract Powder',
    image: img('amla-extract-powder'),
    composition: 'Active Compound: Vitamin C, Tannins, Polyphenols',
    shortDescription: 'Antioxidant-rich amla extract powder for immunity, digestive health, hair and skin.',
    description:
      'Amla extract powder with Vitamin C, Tannins and Polyphenols as active compounds. Rich in antioxidants that fight premature aging.',
    features: [
      'Enhances immunity and digestive health',
      'Promotes hair growth and skin rejuvenation',
      'Rich in antioxidants that fight premature aging',
    ],
    applications: ['Ayurvedic formulations', 'Cosmetics', 'Wellness beverages'],
  },
  {
    id: 204,
    slug: 'garlic-extract-powder',
    name: 'Garlic Extract Powder',
    category: 'herbal-extracts',
    type: 'Herbal Extract Powder',
    image: img('garlic-extract-powder'),
    composition: 'Active Compound: Allicin',
    shortDescription: 'Allicin-based garlic extract powder supporting heart health and immunity.',
    description:
      'Garlic extract powder with Allicin as the active compound. Possesses strong antibacterial and anti-inflammatory effects.',
    features: [
      'Supports heart health and cholesterol management',
      'Boosts immunity and natural detoxification',
      'Possesses strong antibacterial and anti-inflammatory effects',
    ],
    applications: ['Nutraceutical capsules', 'Food fortification', 'Herbal remedies'],
  },
  {
    id: 205,
    slug: 'white-onion-extract-powder',
    name: 'White Onion Extract Powder',
    category: 'herbal-extracts',
    type: 'Herbal Extract Powder',
    image: img('white-onion-extract-powder'),
    composition: 'Active Compounds: Quercetin, Sulfur Compounds, Flavonoids',
    shortDescription: 'White onion extract powder with quercetin, sulfur compounds and flavonoids.',
    description:
      'White onion extract powder with Quercetin, Sulfur Compounds and Flavonoids as active compounds.',
    features: [
      'Supports heart health and cholesterol balance',
      'Enhances immunity and aids detoxification',
      'Promotes clear skin and strong hair growth',
    ],
    applications: ['Nutraceuticals', 'Functional Foods', 'Herbal Cosmetics'],
  },
  {
    id: 206,
    slug: 'red-onion-extract-powder',
    name: 'Red Onion Extract Powder',
    category: 'herbal-extracts',
    type: 'Herbal Extract Powder',
    image: img('red-onion-extract-powder'),
    composition: 'Active Compounds: Anthocyanins, Quercetin, Allicin',
    shortDescription: 'Red onion extract powder rich in anthocyanins, quercetin and allicin.',
    description:
      'Red onion extract powder with Anthocyanins, Quercetin and Allicin as active compounds.',
    features: [
      'Boosts antioxidant defense and cell regeneration',
      'Promotes healthy blood circulation and detox support',
      'Strengthens hair roots and improves scalp health',
    ],
    applications: ['Nutraceuticals', 'Herbal Formulations', 'Hair & Skin Care Products'],
  },
  {
    id: 207,
    slug: 'orange-extract-powder',
    name: 'Orange Extract Powder',
    category: 'herbal-extracts',
    type: 'Herbal Extract Powder',
    image: img('orange-extract-powder'),
    composition: 'Active Compounds: Vitamin C, Flavonoids, Antioxidants',
    shortDescription: 'Vitamin C-rich orange extract powder for immunity, skin brightness and collagen support.',
    description:
      'Orange extract powder with Vitamin C, Flavonoids and Antioxidants as active compounds.',
    features: [
      'Enhances immunity and promotes skin brightness',
      'Supports collagen formation and anti-aging properties',
      'Acts as a natural antioxidant that helps detoxify the body',
    ],
    applications: ['Nutraceuticals', 'Functional Beverages', 'Skincare & Cosmetic Products'],
  },
  {
    id: 208,
    slug: 'banana-extract-powder',
    name: 'Banana Extract Powder',
    category: 'herbal-extracts',
    type: 'Herbal Extract Powder',
    image: img('banana-extract-powder'),
    composition: 'Active Nutrients: Potassium, Vitamin B6, Natural sugars',
    shortDescription: 'Prebiotic-rich banana extract powder for health drinks, baby food and cosmetics.',
    description:
      'Banana extract powder with Potassium, Vitamin B6 and natural sugars as active nutrients.',
    features: [
      'Supports gut health due to high prebiotic content',
      'Rich in antioxidants that help reduce oxidative stress',
      'Provides moisturizing and nourishing effects in skincare products',
    ],
    applications: ['Health drinks', 'Baby food', 'Nutritional supplements', 'Bakery & confectionery', 'Cosmetics'],
  },
  {
    id: 209,
    slug: 'rice-extract-powder',
    name: 'Rice Extract Powder',
    category: 'herbal-extracts',
    type: 'Herbal Extract Powder',
    image: img('rice-extract-powder'),
    composition: 'Active Compounds: Amino acids, Ferulic acid, Vitamin E, Ceramides',
    shortDescription: 'Rice extract powder with amino acids, ferulic acid, vitamin E and ceramides.',
    description:
      'Rice extract powder with Amino acids, Ferulic acid, Vitamin E and Ceramides as active compounds.',
    features: [
      'Promotes skin brightening and rejuvenation',
      'Strengthens hair follicles and improves elasticity',
      'Contains antioxidant and anti-aging properties',
    ],
    applications: ['Cosmetics', 'Nutraceuticals', 'Anti-aging creams', 'Protein blends', 'Natural food fortification'],
  },
  {
    id: 210,
    slug: 'red-chili-extract-powder',
    name: 'Red Chili Extract Powder',
    category: 'herbal-extracts',
    type: 'Herbal Extract Powder',
    image: img('red-chili-extract-powder'),
    composition: 'Active Compound: Capsaicin',
    shortDescription: 'Capsaicin-based red chili extract powder for nutraceutical and functional food applications.',
    description: 'Red chili extract powder with Capsaicin as the active compound.',
    features: [
      'Stimulates metabolism and aids weight management',
      'Supports pain relief and blood circulation',
      'Acts as a natural preservative and antioxidant',
    ],
    applications: ['Nutraceutical capsules', 'Functional foods', 'Herbal pain-relief formulations'],
  },
];

/* ----------------------------------------------------------------------------
   CEREALS & GRAINS  (category: grains)
---------------------------------------------------------------------------- */
const grains = [
  {
    id: 301,
    slug: 'rice',
    name: 'Rice',
    category: 'grains',
    type: 'Cereals & Grains',
    featured: true,
    image: img('rice'),
    shortDescription: 'Premium-grade Indian rice, including Basmati and non-Basmati varieties.',
    description:
      'Premium-grade Indian rice, including Basmati and non-Basmati varieties, known for their rich aroma, long grains, and exceptional taste.',
    features: [
      'Export-grade grains with excellent texture and aroma.',
      'Naturally grown, sorted, and milled with precision.',
      'Long shelf life and consistent cooking performance.',
    ],
  },
  {
    id: 302,
    slug: 'wheat',
    name: 'Wheat',
    category: 'grains',
    type: 'Cereals & Grains',
    image: img('wheat'),
    shortDescription: 'Superior-quality Indian wheat grains with high protein and fiber content.',
    description:
      'Superior-quality Indian wheat grains with high protein and fiber content, ideal for flour milling and food processing industries.',
    features: [
      'High in protein and dietary fiber for healthy nutrition.',
      'Thoroughly cleaned, graded, and moisture-controlled.',
      'Packed in export-compliant bags ensuring extended shelf life.',
    ],
  },
  {
    id: 303,
    slug: 'soybean',
    name: 'Soybean',
    category: 'grains',
    type: 'Cereals & Grains',
    image: img('soybean'),
    shortDescription: 'High-protein Indian soybean, cultivated using sustainable agricultural practices.',
    description:
      'High-protein Indian soybean, cultivated using sustainable agricultural practices and processed for maximum purity.',
    features: [
      'Excellent source of plant-based protein and essential amino acids.',
      'High purity with low moisture and foreign matter.',
      'Compliant with international feed and food safety standards.',
    ],
  },
  {
    id: 304,
    slug: 'maize',
    name: 'Maize (Corn)',
    category: 'grains',
    type: 'Cereals & Grains',
    image: img('maize'),
    shortDescription: 'Export-quality Indian maize, naturally dried and processed to retain nutritional value.',
    description:
      'Export-quality Indian maize, naturally dried and processed to retain nutritional value and freshness.',
    features: [
      'Rich in carbohydrates, fiber, and natural nutrients.',
      'Uniform kernels with low moisture and impurity levels.',
      'Available in bulk quantities with flexible packaging options.',
    ],
  },
];

export const products = [...fruits, ...agriInputs, ...herbalExtracts, ...grains].map((p) => ({
  ...p,
  imageAlt: p.imageAlt || `${p.name} - ${p.type}`,
}));

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug);

export const getProductsByCategory = (category) =>
  category && category !== 'all' ? products.filter((p) => p.category === category) : products;

export const getFeaturedProducts = (limit = 8) => products.filter((p) => p.featured).slice(0, limit);

export const getRelatedProducts = (product, limit = 4) =>
  products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, limit);
