import {RevivalStatus} from "./revival-status";

export class Revival {
    id: string;
    status: RevivalStatus;
    constructor(id: string, state: RevivalStatus) {
        this.id = id;
        this.status = state;
    }
}