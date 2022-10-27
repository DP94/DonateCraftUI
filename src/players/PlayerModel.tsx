import {DeathModel} from "./DeathModel";
import {DonationModel} from "./DonationModel";

export class PlayerModel {
    id : string;
    name : string; 
    deaths: DeathModel[];
    donations: DonationModel[]
    
    constructor(id: string, name: string, deaths: DeathModel[], donations: DonationModel[]) {
        this.id = id;
        this.name = name;
        this.deaths = deaths;
        this.donations = donations;
    }
}