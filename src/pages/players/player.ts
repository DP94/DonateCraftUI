import {Death} from "./death";
import {Donation} from "./donation";

export class Player {
    id : string;
    name : string; 
    deaths: Death[];
    donations: Donation[]
    
    constructor(id: string, name: string, deaths: Death[], donations: Donation[]) {
        this.id = id;
        this.name = name;
        this.deaths = deaths;
        this.donations = donations;
    }
}