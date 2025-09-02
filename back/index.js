import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { router } from "./app/routes/router.js";

const app = express();
const port = process.env.PORT || 5000;

// Ajout d'un middleware afin de vérifier si le client (front-end) a l'autorisation d'accéder à notre API
const corsOptions = {
	// Ici, j'indique le ou les domaines qui ont le droit d'accéder à mon API
	origin: [
		`http://localhost:4200`,
		`https://heroes-app-vv.web.app`
	],
	methods: ["GET", "POST", "PATCH", "DELETE"],
	credentials: true // autorisation des credentials reçu par le front
};

app.use(cors(corsOptions));

// Body parser pour spécifier que l'on reçoit du JSON dans le body des requetes
app.use(express.json());

// Parser les cookies dans les requêtes entrantes, permet d'acceder à req.cookies
app.use(cookieParser());

app.get("/", (req, res) => {
	res.send("Welcome to the Marvel-app API!");
});

app.use(router);

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});