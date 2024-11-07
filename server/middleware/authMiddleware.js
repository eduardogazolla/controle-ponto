const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Token não fornecido" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Erro na verificação do token:", err);
      return res.status(401).json({ message: "Token inválido" });
    }

    req.user = { id: decoded.id }; // Garante que o `id` do usuário esteja em `req.user`
    console.log("Usuário autenticado:", req.user); // Verifica se o `id` está presente
    next();
  });
}

module.exports = verifyToken;
