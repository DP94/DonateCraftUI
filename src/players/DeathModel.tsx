export class DeathModel{
    id: string;
    reason: string;
    playerId: string;
    createdDate: Date;

    constructor(id: string, reason: string, playerId: string, createdDate: Date) {
        this.id = id;
        this.reason = reason;
        this.playerId = playerId;
        this.createdDate = createdDate;
    }
}