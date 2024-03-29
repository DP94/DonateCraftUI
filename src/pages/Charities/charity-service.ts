﻿import Charity from "./charity";
import JustGivingCharity from "./justgiving-charity";

class CharityService {
    
    async getCharityIds(): Promise<Charity[]> {
        const result = await fetch(`${process.env.REACT_APP_API_URL}v1/Charity?sortBy=donationCount&sortOrder=desc`);
        return await result.json();
    }
    
    async getCharityDetails(id: number): Promise<JustGivingCharity> {
        const requestOptions = {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        }
        const result = await fetch(`${process.env.REACT_APP_JG_API_URL}${process.env.REACT_APP_JG_API_KEY}/v1/charity/${id}`, requestOptions)
        return await result.json();
    }
}
export default CharityService;