import { prisma } from "@/lib/prisma";

const plans = [
  {
    name: "FREE",
    maxListsUserCanBe: 2,
    maxItemsPerList: 10,
    maxCustomItemsPerUser: 5,
    maxUsersPerList: 2,
    whisperMinutesPerMonth: 5,
  },
  {
    name: "PRO",
    maxListsUserCanBe: null,
    maxItemsPerList: null,
    maxCustomItemsPerUser: null,
    maxUsersPerList: null,
    whisperMinutesPerMonth: null,
  },
] as const;

const categories = [
  { icon: "🥫", defaultName: "Canned and Jarred" },
  { icon: "🍞", defaultName: "Bakery and Grains" },
  { icon: "🍎", defaultName: "Fruits and Vegetables" },
  { icon: "🧻", defaultName: "Personal Care" },
  { icon: "🥩", defaultName: "Meat and Fish" },
  { icon: "🍶", defaultName: "Beverages" },
  { icon: "🧼", defaultName: "Household" },
  { icon: "🐶", defaultName: "Pet" },
  { icon: "🍝", defaultName: "Pasta and Dry Goods" },
  { icon: "🍼", defaultName: "Baby Care" },
  { icon: "🧂", defaultName: "Sauces and Condiments" },
  { icon: "🍪", defaultName: "Snacks and Sweets" },
  { icon: "🧊", defaultName: "Frozen Foods" },
  { icon: "🥛", defaultName: "Dairy" },
  { icon: "🍺", defaultName: "Alcohol" },
];

const categoryTranslations = [
  {
    language: "en-US",
    name: "Canned and Jarred",
  },
  {
    language: "pt-BR",
    name: "Enlatados e Conservas",
    categoryNameEn: "Canned and Jarred",
  },
  {
    language: "en-US",
    name: "Bakery and Grains",
  },
  {
    language: "pt-BR",
    name: "Padaria e Grãos",
    categoryNameEn: "Bakery and Grains",
  },
  {
    language: "en-US",
    name: "Fruits and Vegetables",
  },
  {
    language: "pt-BR",
    name: "Frutas e Vegetais",
    categoryNameEn: "Fruits and Vegetables",
  },
  {
    language: "en-US",
    name: "Personal Care",
  },
  {
    language: "pt-BR",
    name: "Higiene Pessoal",
    categoryNameEn: "Personal Care",
  },
  {
    language: "en-US",
    name: "Meat and Fish",
  },
  {
    language: "pt-BR",
    name: "Carnes e Peixes",
    categoryNameEn: "Meat and Fish",
  },
  {
    language: "en-US",
    name: "Beverages",
  },
  {
    language: "pt-BR",
    name: "Bebidas não Alcoólicas",
    categoryNameEn: "Beverages",
  },
  {
    language: "en-US",
    name: "Household",
  },
  {
    language: "pt-BR",
    name: "Limpeza Doméstica",
    categoryNameEn: "Household",
  },
  {
    language: "en-US",
    name: "Pet",
  },
  {
    language: "pt-BR",
    name: "Pet Shop",
    categoryNameEn: "Pet",
  },
  {
    language: "en-US",
    name: "Pasta and Dry Goods",
  },
  {
    language: "pt-BR",
    name: "Massas e Secos",
    categoryNameEn: "Pasta and Dry Goods",
  },
  {
    language: "en-US",
    name: "Baby Care",
  },
  {
    language: "pt-BR",
    name: "Cuidados com Bebês",
    categoryNameEn: "Baby Care",
  },
  {
    language: "en-US",
    name: "Sauces and Condiments",
  },
  {
    language: "pt-BR",
    name: "Molhos e Condimentos",
    categoryNameEn: "Sauces and Condiments",
  },
  {
    language: "en-US",
    name: "Snacks and Sweets",
  },
  {
    language: "pt-BR",
    name: "Bolachas e Doces",
    categoryNameEn: "Snacks and Sweets",
  },
  {
    language: "en-US",
    name: "Frozen Foods",
  },
  {
    language: "pt-BR",
    name: "Congelados",
    categoryNameEn: "Frozen Foods",
  },
  {
    language: "en-US",
    name: "Dairy",
  },
  {
    language: "pt-BR",
    name: "Laticínios",
    categoryNameEn: "Dairy",
  },
  {
    language: "en-US",
    name: "Alcohol",
  },
  {
    language: "pt-BR",
    name: "Bebidas Alcoólicas",
    categoryNameEn: "Alcohol",
  },
] as const;

const products = [
  { defaultName: "toothbrush", icon: "🪥" },
  { defaultName: "cereal", icon: "🥣" },
  { defaultName: "fish", icon: "🐟" },
  { defaultName: "olive oil", icon: "🫒" },
  { defaultName: "toothpaste", icon: "🪥" },
  { defaultName: "chocolate", icon: "🍫" },
  { defaultName: "chicken", icon: "🍗" },
  { defaultName: "cheese", icon: "🧀" },
  { defaultName: "whiskey", icon: "🥃" },
  { defaultName: "sponge", icon: "🧽" },
  { defaultName: "soda", icon: "🥤" },
  { defaultName: "avocado", icon: "🥑" },
  { defaultName: "corn", icon: "🌽" },
  { defaultName: "lettuce", icon: "🥬" },
  { defaultName: "mayonnaise", icon: "" },
  { defaultName: "tomato", icon: "🍅" },
  { defaultName: "cookies", icon: "🍪" },
  { defaultName: "vodka", icon: "🍸" },
  { defaultName: "orange", icon: "🍊" },
  { defaultName: "dog shampoo", icon: "🚿" },
  { defaultName: "pineapple", icon: "🍍" },
  { defaultName: "dishwashing liquid", icon: "🧴" },
  { defaultName: "coffee", icon: "☕" },
  { defaultName: "conditioner", icon: "🧴" },
  { defaultName: "watermelon", icon: "🍉" },
  { defaultName: "honey", icon: "🍯" },
  { defaultName: "dog food", icon: "🐶" },
  { defaultName: "beer", icon: "🍺" },
  { defaultName: "pasta", icon: "🍝" },
  { defaultName: "cotton swabs", icon: "" },
  { defaultName: "paper towels", icon: "" },
  { defaultName: "onion", icon: "🧅" },
  { defaultName: "tomato sauce", icon: "🍅" },
  { defaultName: "apple", icon: "🍎" },
  { defaultName: "toilet paper", icon: "🧻" },
  { defaultName: "beet", icon: "🟥" },
  { defaultName: "vinegar", icon: "🧴" },
  { defaultName: "baby wipes", icon: "" },
  { defaultName: "yogurt", icon: "🥣" },
  { defaultName: "butter", icon: "🧈" },
  { defaultName: "bread", icon: "🍞" },
  { defaultName: "pizza", icon: "🍕" },
  { defaultName: "eggs", icon: "🥚" },
  { defaultName: "fabric softener", icon: "💧" },
  { defaultName: "potato", icon: "🥔" },
  { defaultName: "sugar", icon: "" },
  { defaultName: "rice", icon: "🍚" },
  { defaultName: "mustard", icon: "🌭" },
  { defaultName: "diaper", icon: "🧷" },
  { defaultName: "deodorant", icon: "" },
  { defaultName: "beans", icon: "🫘" },
  { defaultName: "pork", icon: "🍖" },
  { defaultName: "banana", icon: "🍌" },
  { defaultName: "soap", icon: "🧼" },
  { defaultName: "flour", icon: "🌾" },
  { defaultName: "disinfectant", icon: "" },
  { defaultName: "instant noodles", icon: "🍜" },
  { defaultName: "lentils", icon: "🟤" },
  { defaultName: "lemon", icon: "🍋" },
  { defaultName: "cucumber", icon: "🥒" },
  { defaultName: "water", icon: "💧" },
  { defaultName: "grape", icon: "🍇" },
  { defaultName: "garlic", icon: "🧄" },
  { defaultName: "milk", icon: "🥛" },
  { defaultName: "cat food", icon: "🐱" },
  { defaultName: "carrot", icon: "🥕" },
  { defaultName: "oil", icon: "🛢️" },
  { defaultName: "trash bag", icon: "🗑️" },
  { defaultName: "shampoo", icon: "🧴" },
  { defaultName: "strawberry", icon: "🍓" },
  { defaultName: "beef", icon: "🥩" },
  { defaultName: "razor", icon: "🪒" },
  { defaultName: "washing powder", icon: "🧼" },
  { defaultName: "ketchup", icon: "🍅" },
  { defaultName: "ice cream", icon: "🍨" },
  { defaultName: "juice", icon: "🧃" },
  { defaultName: "salt", icon: "🧂" },
  { defaultName: "jam", icon: "🍓" },
  { defaultName: "sweet potato", icon: "🍠" },
  { defaultName: "tofu", icon: "" },
  { defaultName: "mop", icon: "" },
  { defaultName: "wine", icon: "🍷" },
  { defaultName: "pear", icon: "🍐" },
  { defaultName: "tea", icon: "🍵" },
  { defaultName: "cat litter", icon: "🐾" },
  { defaultName: "broom", icon: "" },
];

const productTranslations = [
  { language: "en-US", name: "toothbrush" },
  { language: "en-US", name: "cereal" },
  { language: "en-US", name: "fish" },
  { language: "en-US", name: "olive oil" },
  { language: "en-US", name: "toothpaste" },
  { language: "en-US", name: "chocolate" },
  { language: "en-US", name: "chicken" },
  { language: "en-US", name: "cheese" },
  { language: "en-US", name: "whiskey" },
  { language: "en-US", name: "sponge" },
  { language: "en-US", name: "soda" },
  { language: "en-US", name: "avocado" },
  { language: "en-US", name: "corn" },
  { language: "en-US", name: "lettuce" },
  { language: "en-US", name: "mayonnaise" },
  { language: "en-US", name: "tomato" },
  { language: "en-US", name: "cookies" },
  { language: "en-US", name: "vodka" },
  { language: "en-US", name: "orange" },
  { language: "en-US", name: "dog shampoo" },
  { language: "en-US", name: "pineapple" },
  { language: "en-US", name: "dishwashing liquid" },
  { language: "en-US", name: "coffee" },
  { language: "en-US", name: "conditioner" },
  { language: "en-US", name: "watermelon" },
  { language: "en-US", name: "honey" },
  { language: "en-US", name: "dog food" },
  { language: "en-US", name: "beer" },
  { language: "en-US", name: "pasta" },
  { language: "en-US", name: "cotton swabs" },
  { language: "en-US", name: "paper towels" },
  { language: "en-US", name: "onion" },
  { language: "en-US", name: "tomato sauce" },
  { language: "en-US", name: "apple" },
  { language: "en-US", name: "toilet paper" },
  { language: "en-US", name: "beet" },
  { language: "en-US", name: "vinegar" },
  { language: "en-US", name: "baby wipes" },
  { language: "en-US", name: "yogurt" },
  { language: "en-US", name: "butter" },
  { language: "en-US", name: "bread" },
  { language: "en-US", name: "pizza" },
  { language: "en-US", name: "eggs" },
  { language: "en-US", name: "fabric softener" },
  { language: "en-US", name: "potato" },
  { language: "en-US", name: "sugar" },
  { language: "en-US", name: "rice" },
  { language: "en-US", name: "mustard" },
  { language: "en-US", name: "diaper" },
  { language: "en-US", name: "deodorant" },
  { language: "en-US", name: "beans" },
  { language: "en-US", name: "pork" },
  { language: "en-US", name: "banana" },
  { language: "en-US", name: "soap" },
  { language: "en-US", name: "flour" },
  { language: "en-US", name: "disinfectant" },
  { language: "en-US", name: "instant noodles" },
  { language: "en-US", name: "lentils" },
  { language: "en-US", name: "lemon" },
  { language: "en-US", name: "cucumber" },
  { language: "en-US", name: "water" },
  { language: "en-US", name: "grape" },
  { language: "en-US", name: "garlic" },
  { language: "en-US", name: "milk" },
  { language: "en-US", name: "cat food" },
  { language: "en-US", name: "carrot" },
  { language: "en-US", name: "oil" },
  { language: "en-US", name: "trash bag" },
  { language: "en-US", name: "shampoo" },
  { language: "en-US", name: "strawberry" },
  { language: "en-US", name: "beef" },
  { language: "en-US", name: "razor" },
  { language: "en-US", name: "washing powder" },
  { language: "en-US", name: "ketchup" },
  { language: "en-US", name: "ice cream" },
  { language: "en-US", name: "juice" },
  { language: "en-US", name: "salt" },
  { language: "en-US", name: "jam" },
  { language: "en-US", name: "sweet potato" },
  { language: "en-US", name: "tofu" },
  { language: "en-US", name: "mop" },
  { language: "en-US", name: "wine" },
  { language: "en-US", name: "pear" },
  { language: "en-US", name: "tea" },
  { language: "en-US", name: "cat litter" },
  { language: "en-US", name: "broom" },

  { language: "pt-BR", name: "escova de dente", productNameEn: "toothbrush" },
  { language: "pt-BR", name: "cereal", productNameEn: "cereal" },
  { language: "pt-BR", name: "peixe", productNameEn: "fish" },
  { language: "pt-BR", name: "azeite", productNameEn: "olive oil" },
  { language: "pt-BR", name: "pasta de dente", productNameEn: "toothpaste" },
  { language: "pt-BR", name: "chocolate", productNameEn: "chocolate" },
  { language: "pt-BR", name: "frango", productNameEn: "chicken" },
  { language: "pt-BR", name: "queijo", productNameEn: "cheese" },
  { language: "pt-BR", name: "uísque", productNameEn: "whiskey" },
  { language: "pt-BR", name: "esponja", productNameEn: "sponge" },
  { language: "pt-BR", name: "refrigerante", productNameEn: "soda" },
  { language: "pt-BR", name: "abacate", productNameEn: "avocado" },
  { language: "pt-BR", name: "milho", productNameEn: "corn" },
  { language: "pt-BR", name: "alface", productNameEn: "lettuce" },
  { language: "pt-BR", name: "maionese", productNameEn: "mayonnaise" },
  { language: "pt-BR", name: "tomate", productNameEn: "tomato" },
  { language: "pt-BR", name: "biscoitos", productNameEn: "cookies" },
  { language: "pt-BR", name: "vodka", productNameEn: "vodka" },
  { language: "pt-BR", name: "laranja", productNameEn: "orange" },
  {
    language: "pt-BR",
    name: "shampoo para cachorro",
    productNameEn: "dog shampoo",
  },
  { language: "pt-BR", name: "abacaxi", productNameEn: "pineapple" },
  {
    language: "pt-BR",
    name: "detergente",
    productNameEn: "dishwashing liquid",
  },
  { language: "pt-BR", name: "café", productNameEn: "coffee" },
  { language: "pt-BR", name: "condicionador", productNameEn: "conditioner" },
  { language: "pt-BR", name: "melancia", productNameEn: "watermelon" },
  { language: "pt-BR", name: "mel", productNameEn: "honey" },
  { language: "pt-BR", name: "ração para cachorro", productNameEn: "dog food" },
  { language: "pt-BR", name: "cerveja", productNameEn: "beer" },
  { language: "pt-BR", name: "macarrão", productNameEn: "pasta" },
  { language: "pt-BR", name: "cotonete", productNameEn: "cotton swabs" },
  { language: "pt-BR", name: "papel toalha", productNameEn: "paper towels" },
  { language: "pt-BR", name: "cebola", productNameEn: "onion" },
  { language: "pt-BR", name: "molho de tomate", productNameEn: "tomato sauce" },
  { language: "pt-BR", name: "maçã", productNameEn: "apple" },
  { language: "pt-BR", name: "papel higiênico", productNameEn: "toilet paper" },
  { language: "pt-BR", name: "beterraba", productNameEn: "beet" },
  { language: "pt-BR", name: "vinagre", productNameEn: "vinegar" },
  { language: "pt-BR", name: "lenço umedecidos", productNameEn: "baby wipes" },
  { language: "pt-BR", name: "iogurte", productNameEn: "yogurt" },
  { language: "pt-BR", name: "manteiga", productNameEn: "butter" },
  { language: "pt-BR", name: "pão", productNameEn: "bread" },
  { language: "pt-BR", name: "pizza", productNameEn: "pizza" },
  { language: "pt-BR", name: "ovos", productNameEn: "eggs" },
  { language: "pt-BR", name: "amaciante", productNameEn: "fabric softener" },
  { language: "pt-BR", name: "batata", productNameEn: "potato" },
  { language: "pt-BR", name: "açúcar", productNameEn: "sugar" },
  { language: "pt-BR", name: "arroz", productNameEn: "rice" },
  { language: "pt-BR", name: "mostarda", productNameEn: "mustard" },
  { language: "pt-BR", name: "fralda", productNameEn: "diaper" },
  { language: "pt-BR", name: "desodorante", productNameEn: "deodorant" },
  { language: "pt-BR", name: "feijão", productNameEn: "beans" },
  { language: "pt-BR", name: "carne suína", productNameEn: "pork" },
  { language: "pt-BR", name: "banana", productNameEn: "banana" },
  { language: "pt-BR", name: "sabonete", productNameEn: "soap" },
  { language: "pt-BR", name: "farinha", productNameEn: "flour" },
  { language: "pt-BR", name: "desinfetante", productNameEn: "disinfectant" },
  {
    language: "pt-BR",
    name: "macarrão instantâneo",
    productNameEn: "instant noodles",
  },
  { language: "pt-BR", name: "lentilha", productNameEn: "lentils" },
  { language: "pt-BR", name: "limão", productNameEn: "lemon" },
  { language: "pt-BR", name: "pepino", productNameEn: "cucumber" },
  { language: "pt-BR", name: "água", productNameEn: "water" },
  { language: "pt-BR", name: "uva", productNameEn: "grape" },
  { language: "pt-BR", name: "alho", productNameEn: "garlic" },
  { language: "pt-BR", name: "leite", productNameEn: "milk" },
  { language: "pt-BR", name: "ração para gato", productNameEn: "cat food" },
  { language: "pt-BR", name: "cenoura", productNameEn: "carrot" },
  { language: "pt-BR", name: "óleo", productNameEn: "oil" },
  { language: "pt-BR", name: "saco de lixo", productNameEn: "trash bag" },
  { language: "pt-BR", name: "shampoo", productNameEn: "shampoo" },
  { language: "pt-BR", name: "morango", productNameEn: "strawberry" },
  { language: "pt-BR", name: "carne bovina", productNameEn: "beef" },
  { language: "pt-BR", name: "aparelho de barbear", productNameEn: "razor" },
  { language: "pt-BR", name: "sabão em pó", productNameEn: "washing powder" },
  { language: "pt-BR", name: "ketchup", productNameEn: "ketchup" },
  { language: "pt-BR", name: "sorvete", productNameEn: "ice cream" },
  { language: "pt-BR", name: "suco", productNameEn: "juice" },
  { language: "pt-BR", name: "sal", productNameEn: "salt" },
  { language: "pt-BR", name: "geleia", productNameEn: "jam" },
  { language: "pt-BR", name: "batata doce", productNameEn: "sweet potato" },
  { language: "pt-BR", name: "tofu", productNameEn: "tofu" },
  { language: "pt-BR", name: "rodo", productNameEn: "mop" },
  { language: "pt-BR", name: "vinho", productNameEn: "wine" },
  { language: "pt-BR", name: "pêra", productNameEn: "pear" },
  { language: "pt-BR", name: "chá", productNameEn: "tea" },
  { language: "pt-BR", name: "areia para gato", productNameEn: "cat litter" },
  { language: "pt-BR", name: "vassoura", productNameEn: "broom" },
] as const;

async function main() {
  const formatLang = {
    "en-US": "enUS",
    "pt-BR": "ptBR",
  } as const;

  // Seed plans table
  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { name: plan.name },
      update: {},
      create: {
        name: plan.name,
        maxListsUserCanBe: plan.maxListsUserCanBe,
        maxItemsPerList: plan.maxItemsPerList,
        maxCustomItemsPerUser: plan.maxCustomItemsPerUser,
        maxUsersPerList: plan.maxUsersPerList,
        whisperMinutesPerMonth: plan.whisperMinutesPerMonth,
      },
    });
  }

  console.log("Plans table seeded!");

  // Seed categories table
  for (const category of categories) {
    await prisma.category.upsert({
      where: { defaultName: category.defaultName },
      update: {},
      create: { icon: category.icon, defaultName: category.defaultName },
    });
  }

  console.log("Categories table seeded!");

  // Seed category_translations table
  for (const categoryTranslation of categoryTranslations) {
    const category = await prisma.category.findUnique({
      where: {
        defaultName:
          categoryTranslation.language === "en-US"
            ? categoryTranslation.name
            : categoryTranslation.categoryNameEn,
      },
    });

    if (!category) {
      console.error(`Category not found for ${categoryTranslation.name}`);
      continue;
    }

    await prisma.categoryTranslation.upsert({
      where: {
        categoryId_language: {
          categoryId: category.id,
          language: formatLang[categoryTranslation.language],
        },
      },
      update: {},
      create: {
        language: formatLang[categoryTranslation.language],
        name: categoryTranslation.name,
        categoryId: category.id,
      },
    });
  }

  console.log("Category Translations table seeded!");

  // Seed products table
  for (const product of products) {
    await prisma.product.upsert({
      where: { defaultName: product.defaultName },
      update: {},
      create: { icon: product.icon, defaultName: product.defaultName },
    });
  }

  console.log("Products table seeded!");

  // Seed product_translations table
  for (const productTranslation of productTranslations) {
    const product = await prisma.product.findUnique({
      where: {
        defaultName:
          productTranslation.language === "en-US"
            ? productTranslation.name
            : productTranslation.productNameEn,
      },
    });

    if (!product) {
      console.error(`Product not found for ${productTranslation.name}`);
      continue;
    }

    await prisma.productTranslation.upsert({
      where: {
        productId_language: {
          productId: product.id,
          language: formatLang[productTranslation.language],
        },
      },
      update: {},
      create: {
        language: formatLang[productTranslation.language],
        name: productTranslation.name,
        productId: product.id,
      },
    });
  }

  console.log("Product Translations table seeded!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
