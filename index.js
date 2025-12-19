const express = require("express");
const app = express();

app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.send("Servidor online 🚀");
});

// Rota de echo
app.post("/echo", (req, res) => {
  const texto = req.body.text || "Mensagem vazia";
  res.json({ resposta: "ECHO_Delta: " + texto });
});

// Porta fornecida pela Railway
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Servidor rodando na porta " + port);
});
