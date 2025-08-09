import jwt from "jsonwebtoken";

// Middleware isLogged: autorisation pour les pages user connecté
export function isLogged(req, res, next) {
    const token = req.cookies.token;
    console.log('Token :', token);

    if (!token) {
      return res.status(401).json({ error: "Token manquant" });
    }
  
    try {
      // On vérifie que le token est bien valide et signé avec ta clé secrète (JWT_SECRET).
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Utilisateur décodé :', decoded);
      // On ajoute les infos du token dans 'req.user', pour les utiliser dans les routes suivantes
      req.user = decoded; // Stocke les infos du token (id, role...) dans la requête
      next();
    } catch (err) {
      return res.status(403).json({ error: "Token invalide ou expiré" });
    }
}


// Middleware idAdmin: autorisation pour les pages admin
export function isAdmin(req, res, next) {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ error: "Accès réservé aux administrateurs" });
    }
    next();
}