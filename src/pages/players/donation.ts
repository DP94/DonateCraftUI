import {Player} from "./player";

export class Donation {
    
    id: string;
    amount: number;
    createdDate: Date;
    charityId: number;
    charityName: string;
    paidForId: string;
    paidForBy: Player | undefined;
    
    constructor(id: string,
    amount: number,
    createdDate: Date,
    charityId: number,
    charityName: string,
    paidForId: string,
    paidForBy: Player | undefined) {
        this.id = id;
        this.amount = amount;
        this.createdDate = createdDate;
        this.charityId = charityId;
        this.charityName = charityName;
        this.paidForId = paidForId;
        this.paidForBy = paidForBy;
    }
}