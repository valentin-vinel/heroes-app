import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./app/routes/router.js";

const app = express();
const port = process.env.PORT || 5000;

// Ajout d'un middleware afin de vérifier si le client (front-end) a l'autorisation d'accéder à notre API
const corsOptions = {
	// Ici, j'indique le ou les domaines qui ont le droit d'accéder à mon API
	origin: [
		`http://localhost:4200`
	],
	methods: ["GET", "POST", "PATCH", "DELETE"],
	credentials: true // autorisation des credentials reçu par le front
};

app.use(cors(corsOptions));

// Body parser pour spécifier que l'on reçoit du JSON dans le body des requetes
app.use(express.json());

// Ici, je vais indiquer que je souhaite lancer mon application depuis le lancement de l'API (port 5000)
// J'indique à Express que je souhaite servir mon application cliente sur la racine de mon url (http://localhost:3000)
// Pour cela, je lui indique la racine de mon dossier actuel ainsi que l'endroit où se situe le 'build' de mon app client
// app.use(express.static(path.resolve(import.meta.dirname, "../front/build")));

app.get("/", (req, res) => {
	res.send("Welcome to the Marvel-app API!");
});

app.use(router);

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});