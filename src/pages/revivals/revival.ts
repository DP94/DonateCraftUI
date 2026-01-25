import {RevivalStatus} from "./revival-status";

export class Revival {
    id: string;
    name: string;
    status: RevivalStatus;
    constructor(id: string, name: string, state: RevivalStatus) {
        this.id = id;
        this.name = name;
        this.status = state;
    }
}