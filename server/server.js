require("dotenv").config({ path: __dirname + "/.env" }); // Caminho explícito para o .env
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const timeEntryRoutes = require("./routes/timeEntryRoutes"); // Importe a rota
const userRoutes = require("./routes/userRoutes"); // Importe as rotas de usuário

const app = express();
app.use(cors());
app.use(express.json());

// Use o arquivo timeEntryRoutes para as rotas de ponto
app.use("/api", timeEntryRoutes);
app.use("/api", userRoutes); // Use as rotas de usuário no caminho "/api"

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((error) => console.log("Erro ao conectar ao MongoDB:", error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
