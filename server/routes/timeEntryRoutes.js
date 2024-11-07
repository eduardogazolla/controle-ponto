// server/routes/timeEntryRoutes.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const TimeEntry = require("../models/TimeEntry");

// Registrar ou atualizar um ponto
router.post("/time-entry", verifyToken, async (req, res) => {
  const { morningEntry, morningExit, afternoonEntry, afternoonExit, date } =
    req.body;
  const userId = req.user.id;

  try {
    // Tenta encontrar o registro existente para o usuário e data
    let timeEntry = await TimeEntry.findOne({ userId, date });

    if (timeEntry) {
      // Atualiza o registro existente com os novos horários
      timeEntry.morningEntry = morningEntry || timeEntry.morningEntry;
      timeEntry.morningExit = morningExit || timeEntry.morningExit;
      timeEntry.afternoonEntry = afternoonEntry || timeEntry.afternoonEntry;
      timeEntry.afternoonExit = afternoonExit || timeEntry.afternoonExit;
    } else {
      // Cria um novo registro
      timeEntry = new TimeEntry({
        userId,
        date,
        morningEntry,
        morningExit,
        afternoonEntry,
        afternoonExit,
      });
    }

    await timeEntry.save();
    res
      .status(200)
      .json({ message: "Ponto registrado com sucesso!", timeEntry });
  } catch (error) {
    console.error("Erro ao registrar ponto:", error);
    res.status(500).json({ message: "Erro ao registrar ponto", error });
  }
});

// server/routes/timeEntryRoutes.js
router.get("/time-entry/:date", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const date = req.params.date;

  try {
    const timeEntry = await TimeEntry.findOne({ userId, date });
    if (!timeEntry) {
      return res
        .status(404)
        .json({ message: "Nenhum ponto encontrado para essa data" });
    }

    res.status(200).json(timeEntry);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar o ponto", error });
  }
});

module.exports = router;
