import {AppUser, Hero, sequelize} from "../../app/models/associations.js";
import bcrypt from "bcrypt";

console.log("🌱 Seeding des tables");

// Création des users
console.log("🚧 Ajout données app_user");
const appUsers = [
    { username: 'admin', email: "admin@marvelapp.io", password: "password123", role: "admin"},
    { username: 'nelv', email: "nelv@marvelapp.io", password: "password123", role: "admin"}
];

let adminUser = null;

for (const appUser of appUsers) {
  try {
    const password_hash = await bcrypt.hash(appUser.password, 10);
    const createdUser = await AppUser.create({
      username: appUser.username,
      email: appUser.email,
      password: password_hash,
      role: appUser.role,
    })

    // Si c'est l'admin, on le garde pour plus tard
    if (appUser.email === "admin@marvelapp.io") {
      adminUser = createdUser;
    }
  } catch (error) {
    console.log("Error with appuser:", appUser.firstname);
		console.error(error);
  }
}

// Création des héroes
console.log("🚧 Ajout données hero");
const heroes = [
    { 
        hero_name: 'Ironman', 
        firstname: "Tony", 
        lastname: "Stark", 
        profile_img: "ironmanhp.jpg",
        png_img: "https://www.pngmart.com/files/22/Ironman-PNG.png",
        description: "Iron Man, alias Tony Stark, est un génie milliardaire et inventeur qui combat le crime grâce à une armure high-tech qu’il a conçue lui-même. Il n’a pas de super-pouvoirs, mais son costume lui donne une force surhumaine, la capacité de voler et un arsenal d’armes avancées. Membre fondateur des Avengers, il est connu pour son intelligence, son charisme et son sens de l’humour.",
        bg_gradient: "linear-gradient(to right, #461815, #4D2F25, #855E34)",
        name_color: "linear-gradient(to right, #F4BB69, #5D1B18)",
        id_app_user: 1
    },
    { 
        hero_name: 'Spiderman', 
        firstname: "Peter", 
        lastname: "Parker", 
        profile_img: "spiderhp.jpg",
        png_img: "https://pngimg.com/uploads/spider_man/spider_man_PNG8.png",
        description: "Spider-Man, alias Peter Parker, est un adolescent ordinaire qui gagne des super-pouvoirs après avoir été mordu par une araignée radioactive. Agile et doté d’un sens d’araignée lui permettant de détecter le danger, il utilise ses capacités et son intelligence pour protéger New York, tout en jonglant avec sa vie de lycéen. Son mantra : « Un grand pouvoir implique de grandes responsabilités.»",
        bg_gradient: "linear-gradient(to right, #0D1E40, #301E35, #9E2223)",
        name_color: "linear-gradient(to right, #D33028, #067CC1)",
        id_app_user: 1
    },
    { 
        hero_name: 'Captain America', 
        firstname: "Steve", 
        lastname: "Rogers", 
        profile_img: "captainhp.jpg",
        png_img: "https://freepngimg.com/download/captain_america/7-2-captain-america-png-hd.png",
        description: "Captain America, alias Steve Rogers, est un super-soldat créé durant la Seconde Guerre mondiale grâce à un sérum spécial. Doté d’une force, d’une agilité et d’une endurance surhumaines, il manie un bouclier indestructible qu’il utilise pour défendre la justice et la liberté. Symbole de courage et de patriotisme, il est un leader emblématique des Avengers.»",
        bg_gradient: "linear-gradient(to right, #245887, #811F1F, #8E9095)",
        name_color: "linear-gradient(to right, #D33028, #FFFFFF, #067CC1)",
        id_app_user: 1
    },
    { 
        hero_name: 'Black Panther', 
        firstname: "T", 
        lastname: "'Challa", 
        profile_img: "bphp.jpg",
        png_img: "https://xtech-frontend.s3.amazonaws.com/media/img/personaje-pantera-dk.png",
        description: "Black Panther, alias T’Challa, est le roi du Wakanda, une nation africaine technologiquement avancée et secrète. Doté d’une force, d’une vitesse et de réflexes surhumains grâce à une plante en forme de cœur, il porte un costume en vibranium ultra-résistant. En plus d’être un guerrier redoutable, il est un leader sage qui protège son peuple et lutte pour la justice mondiale.",
        bg_gradient: "linear-gradient(to right, #898989, #4A4576, #060E17)",
        name_color: "linear-gradient(to right, #4A4576, #060E17, #898989)",
        id_app_user: 1
    },
];

for (const hero of heroes) {
    try {
      await Hero.create({
        hero_name: hero.hero_name,
        firstname: hero.firstname,
        lastname: hero.lastname,
        profile_img: hero.profile_img,
        png_img: hero.png_img,
        description: hero.description,
        bg_gradient: hero.bg_gradient,
        name_color: hero.name_color,
        id_app_user: hero.id_app_user
      })
    } catch (error) {
      console.log("Error with hero:", hero.hero_name);
      console.error(error);
    }
}

console.log("✅ Données inserées");
sequelize.close();