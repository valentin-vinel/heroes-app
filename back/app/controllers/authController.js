import { AppUser } from "../models/associations.js";
import { appUserSchema, loginSchema } from "../schemas/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req, res) {
    try {
        const { username, email, password } = appUserSchema.parse(req.body);
        
        const existingAppUser = await AppUser.findOne({ where: { email }});
        if (existingAppUser) {
            return res.status(400).json({ error: "Email déjà utilisé"});
        }

        const password_hash = await bcrypt.hash(password, 10);

        const newAppUser = await AppUser.create({ username, email, password: password_hash });

        res.status(201).json({ message: "Compte utilisateur crée" });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function login(req, res) {
	try {
		const { email, password } = loginSchema.parse(req.body);

		// Chercher l’utilisateur
		const appUser = await AppUser.findOne({ where: { email } });
		if (!appUser) {
			return res.status(401).json({ error: "Email ou mot de passe incorrect" });
		}

		// Comparer le mot de passe
		const validPassword = await bcrypt.compare(password, appUser.password);
		if (!validPassword) {
			return res.status(401).json({ error: "Email ou mot de passe incorrect" });
		}

		// Générer un token JWT simple
		const token = jwt.sign({ id: appUser.id, role: appUser.role }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		res.cookie('token', token, {
			httpOnly: true,
			secure: true, // false en développement (local), true en prod (API déployé)
			sameSite: 'None', // sameSite attend une valeur précise parmis: 'Strict' (très restrictif) / 'lax' (plus souple, ne fonctionne pas en cross-origin POST) / 'none' (accepte les requêtes cross-origin mais necessite secure: true)
			maxAge: 60 * 60 * 1000,
		}).json({ message: "Connexion réussie" });
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
}

// logout: deconnexion
export async function logout(req, res) {
	try {
		res.clearCookie('token', {
			httpOnly: true,
			secure: true,
			sameSite: 'None'
		});

		res.json({ message: 'Déconnecté' });
	} catch (error) {
		console.error("Logout error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
}

// auth me: identifie l'utilisateur
export async function authMe(req, res) {
	// req.user est injecté par le middleware "isLogged"
    const { id } = req.user;

    try {
        const user = await AppUser.findByPk(id, {
            attributes: ["id", "username", "email", "role"],
            include: [ { association: "heroes" } ]
        })

        if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        // On transforme l'instance Sequelize en objet JS pur
        const userJson = user.toJSON();

        res.json({ user: userJson });
    } catch (error) {
        console.log("Erreur dans /auth/me :", error)
        res.status(500).json({ error: "Erreur serveur" });
    }
}