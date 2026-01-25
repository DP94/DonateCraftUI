import JustGivingCharity from "./justgiving-charity";

class Charity {
    
    id: number;
    isFundRaiser: boolean;
    donationCount: number;
    justGivingCharity: JustGivingCharity;

    constructor(id: number, isFundRaiser: boolean, donationCount: number, justGivingCharity: JustGivingCharity) {
        this.id = id;
        this.isFundRaiser = isFundRaiser;
        this.donationCount = donationCount;
        this.justGivingCharity = justGivingCharity;
    }
}

export default Charity;