export class Hero {
    id?: number;
    name: string;
    description: string;
    image: string;
    comics: string[];

    constructor(
        name: string = 'Entrer un nom',
        description: string = 'Entrer une description',
        image: string = 'Saisissez un lien URL .png',
        comics: string[] = ['Comics 1'],
    ) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.comics = comics;
    }
}