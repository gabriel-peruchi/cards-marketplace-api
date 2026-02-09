const YUGIOH_API_URL =
  "https://db.ygoprodeck.com/api/v7/cardinfo.php";

const TARGET_API_URL =
  "https://cards-marketplace-api.onrender.com/cards";

const LIMIT = 500;

async function fetchYugiohCards() {
  const response = await fetch(YUGIOH_API_URL);

  if (!response.ok) {
    throw new Error("Erro ao buscar cartas do Yu-Gi-Oh");
  }

  const data = await response.json();
  return data.data.slice(0, LIMIT);
}

async function sendCardToApi(card) {
  const payload = {
    name: card.name,
    description: card.desc,
    imageUrl: card.card_images?.[0]?.image_url,
  };

  const response = await fetch(TARGET_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Erro ${response.status}: ${errorBody}`
    );
  }
}

async function run() {
  console.log("🔍 Buscando cartas do Yu-Gi-Oh...");

  const cards = await fetchYugiohCards();

  console.log(`📦 ${cards.length} cartas encontradas`);
  console.log("🚀 Enviando para a API de destino...");

  let success = 0;
  let failed = 0;

  for (const card of cards) {
    try {
      await sendCardToApi(card);
      success++;
    } catch (err) {
      failed++;
      console.error(
        `❌ Erro ao enviar "${card.name}":`,
        err.message
      );
    }
  }

  console.log("✅ Importação finalizada");
  console.log(`✔️ Sucesso: ${success}`);
  console.log(`❌ Falhas: ${failed}`);
}

run().catch((err) => {
  console.error("💥 Erro fatal:", err);
});
