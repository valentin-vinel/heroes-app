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
        hero_name: 'Hulk', 
        firstname: "Bruce", 
        lastname: "Banner", 
        profile_img: "hulkhp.jpg",
        png_img: "https://img.genially.com/5714b2b11561e80398770d80/4f692632-3b14-41a8-aadb-e34dff35b042.png",
        description: "Hulk, alias Bruce Banner, est un scientifique brillant qui se transforme en un géant vert doté d’une force colossale lorsqu’il est en colère ou stressé, à la suite d’une exposition à des rayons gamma. Membre des Avengers, il est à la fois un héros puissant et une force difficile à contrôler.",
        bg_gradient: "linear-gradient(to right, #3F5A37, #323E2C, #111914)",
        name_color: "linear-gradient(to right, #1F1F1F, #82A655, #F3F2C4)",
        id_app_user: 1
    },
    { 
        hero_name: 'Thor', 
        firstname: "Thor", 
        lastname: "Odinson", 
        profile_img: "thorhp.jpg",
        png_img: "https://freepngimg.com/download/thor/8-2-thor-png-clipart.png",
        description: "Thor est le dieu du tonnerre de l’univers Marvel, inspiré de la mythologie nordique. Fils d’Odin et prince d’Asgard, il manie le marteau enchanté Mjolnir, qui lui confère la maîtrise de la foudre, la capacité de voler et une force surhumaine. Membre des Avengers, il protège à la fois la Terre et les Neuf Royaumes.",
        bg_gradient: "linear-gradient(to right, #6C6D6D, #313232, #64151D)",
        name_color: "linear-gradient(to right, #64151D, #6C6D6D)",
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
    { 
        hero_name: 'Doctor Strange', 
        firstname: "Stephen", 
        lastname: "Strange", 
        profile_img: "strangehp.jpg",
        png_img: "https://wallpapers.com/images/hd/doctor-strange-comic-art-png-05212024-0ozj4cwda1fni896.jpg",
        description: "Doctor Strange, alias Stephen Strange, est un ancien neurochirurgien de génie qui, après un accident ayant ruiné sa carrière, part en quête de guérison et découvre les arts mystiques. Formé par l’Ancien, il devient le Sorcier Suprême, protecteur de la Terre contre les menaces magiques et interdimensionnelles, utilisant des artefacts puissants comme l’Œil d’Agamotto et la Cape de Lévitation.",
        bg_gradient: "linear-gradient(to right, #107C9D, #203242, #AC2A19)",
        name_color: "linear-gradient(to right, #9A2214, #000000, #11789A)",
        id_app_user: 1
    },
    { 
        hero_name: 'Wolverine', 
        firstname: "James Logan", 
        lastname: "Howlett", 
        profile_img: "wolverinehp.jpg",
        png_img: "https://www.pngall.com/wp-content/uploads/2016/05/Wolverine-PNG.png",
        description: "Wolverine, de son vrai nom James “Logan” Howlett, est un mutant doté d’un facteur de régénération exceptionnel, de sens hyper-développés et de griffes rétractiles en adamantium, un métal quasi indestructible. Combattant redoutable et membre emblématique des X-Men, il est connu pour son tempérament sauvage, sa résilience et son passé mystérieux.",
        bg_gradient: "linear-gradient(to right, #020203, #FCE761, #323961)",
        name_color: "linear-gradient(to right, #E5D258, #2D3250, #060504)",
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