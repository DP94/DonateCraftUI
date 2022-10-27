import {CharityModel} from "./CharityModel";
import {PlayerModel} from "./PlayerModel";

export class DonationModel{
    
    id: string;
    amount: number;
    createdDate: Date;
    charity: CharityModel;
    paidForId: string;
    paidForBy: PlayerModel
    
    constructor(id: string,
    amount: number,
    createdDate: Date,
    charity: CharityModel,
    paidForId: string,
    paidForBy: PlayerModel) {
        this.id = id;
        this.amount = amount;
        this.createdDate = createdDate;
        this.charity = charity;
        this.paidForId = paidForId;
        this.paidForBy = paidForBy;
    }
}