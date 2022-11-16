import JustGivingCharity from "./justgiving-charity";

class Charity {
    
    id: number;
    donationCount: number;
    justGivingCharity: JustGivingCharity;

    constructor(id: number, donationCount: number, justGivingCharity: JustGivingCharity) {
        this.id = id;
        this.donationCount = donationCount;
        this.justGivingCharity = justGivingCharity;
    }
}

export default Charity;