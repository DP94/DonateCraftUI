import {Death} from "./death";
import {Donation} from "./donation";

export class Player {
    id : string;
    name : string; 
    isDead : boolean;
    deaths: Death[];
    donations: Donation[]
    
    constructor(id: string, name: string, isDead:boolean, deaths: Death[], donations: Donation[]) {
        this.id = id;
        this.name = name;
        this.isDead = isDead;
        this.deaths = deaths;
        this.donations = donations;
    }
}