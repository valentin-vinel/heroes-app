export class Hero {
    id?: number;
    hero_name: string;
    firstname: string;
    lastname: string;
    profile_img: string;
    png_img: string;
    description: string;
    bg_gradient: string;
    name_color: string;

    constructor(
        hero_name: string = 'Entrer un nom de héro',
        firstname: string = 'Entrer un prénom',
        lastname: string = 'Entrer un nom',
        profile_img: string = 'http://xxx.jpg',
        png_img: string = "http://xxx.png",
        description: string = 'Entrer une description',
        bg_gradient: string = 'linear(...)',
        name_color: string = "linear(...)"
    ) {
        this.hero_name = hero_name;
        this.firstname = firstname;
        this.lastname = lastname;
        this.profile_img = profile_img;
        this.png_img = png_img;
        this.description = description;
        this.bg_gradient = bg_gradient;
        this.name_color = name_color;
    }
}