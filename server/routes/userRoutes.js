const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { loginUser, registerUser } = require("../controllers/authController");
const { clockIn, clockOut } = require("../controllers/timeEntryController");
const verifyToken = require("../middleware/authMiddleware");

router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name");
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.json(user);
  } catch (error) {
    console.error("Erro ao buscar o usuário:", error);
    res.status(500).json({ message: "Erro ao buscar o usuário" });
  }
});

router.post("/users/login", loginUser);
router.post("/users/register", registerUser);

// Rotas de Ponto (Acesso Restrito)
router.post("/clockin", verifyToken, clockIn);
router.post("/clockout", verifyToken, clockOut);

module.exports = router;
