import {Revival} from "./revival";

class RevivalService {
    async getRevivals(): Promise<Revival[]> {
        try {
            const result = await fetch(`${process.env.REACT_APP_API_URL}v1/Lock`);
            return await result.json();
        } catch (e) {
            console.error(e);
            return [];
        }
    }
}

export default RevivalService;