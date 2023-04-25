import JustGivingFundRaiserImage from "./justgiving-fundraiser-image";

class JustGivingFundRaiser {

    eventName: string;
    pageSummary: string;
    logoAbsoluteUrl: string;
    image: JustGivingFundRaiserImage

    constructor(eventName: string, pageSummary: string, logoAbsoluteUrl: string, image: JustGivingFundRaiserImage) {
        this.eventName = eventName;
        this.pageSummary = pageSummary;
        this.logoAbsoluteUrl = logoAbsoluteUrl;
        this.image = image;
    }
}

export default JustGivingFundRaiser;