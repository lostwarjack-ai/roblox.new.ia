const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*", methods: ["POST"] }));

// Teste rápido
app.get("/", (req, res) => res.send("Servidor da entidade ativo"));

// Endpoint que o Roblox vai chamar
app.post("/pergunta", async (req, res) => {
  try {
    const { texto } = req.body;
    if (!texto || typeof texto !== "string") {
      return res.status(400).json({ error: "Pergunta inválida" });
    }

    // Prompt para a IA: estilo entidade
    const prompt = `Responda como a entidade ECHO-Δ em tom de terror psicológico, com frases curtas e enigmáticas, sem ameaças reais. Pergunta: "${texto}".`;

    // Chama a IA externa (exemplo com OpenAI)
    const r = await fetch(process.env.AI_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.AI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 80,
        temperature: 0.8
      })
    });

    const data = await r.json();
    const resposta = data.choices?.[0]?.text?.trim() || "O silêncio respondeu primeiro.";

    res.json({ resposta });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erro interno" });
  }
});

// Porta corrigida: usa a do .env ou 3000 como padrão
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
