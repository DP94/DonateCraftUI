import Charity from "./charity";
import JustGivingCharity from "./justgiving-charity";
import JustGivingFundRaiser from "./justgiving-fundraiser";

class CharityService {
    
    async getCharityIds(): Promise<Charity[]> {
        const result = await fetch(`${process.env.REACT_APP_API_URL}v1/Charity?sortBy=donationCount&sortOrder=desc`);
        return await result.json();
    }
    
    async getCharityDetails(charity: Charity): Promise<JustGivingCharity> {
        const requestOptions = {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        }
        
        let result;
        if (!charity.isFundRaiser) {
            result = await fetch(`${process.env.REACT_APP_JG_API_URL}${process.env.REACT_APP_JG_API_KEY}/v1/charity/${charity.id}`, requestOptions)
            return await result.json();
        } else {
            const fundRaiserResult = await fetch(`${process.env.REACT_APP_JG_API_URL}${process.env.REACT_APP_JG_API_KEY}/v1/fundraising/pagebyid/${charity.id}`, requestOptions);
            const fundRaiser: JustGivingFundRaiser = await fundRaiserResult.json();
            return new JustGivingCharity(fundRaiser.eventName, fundRaiser.pageSummary, fundRaiser.image.absoluteUrl);
        }
    }
}
export default CharityService;