class Charity {
    
    id: number;
    name: string;
    description: string;
    logoAbsoluteUrl: string;


    constructor(id: number, name: string, description: string, logoAbsoluteUrl: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.logoAbsoluteUrl = logoAbsoluteUrl;
    }
}

export default Charity;