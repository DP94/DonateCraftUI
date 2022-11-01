import { render, screen } from "@testing-library/react";
import Players from "../pages/players/Players";
import {Player} from "../pages/players/player";
import {Death} from "../pages/players/death";
import {Donation} from "../pages/players/donation";
import {act} from "react-dom/test-utils";
import '@testing-library/jest-dom';

describe("Players page", function (){
    it('renders list of players', async () => {
        const playerId = "3a0c7a69-c12f-4f7f-9aaf-3345bb0f2e38";
        const playerMockData = getPlayersMockData(playerId);
        await act(() => {
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    json: () => Promise.resolve(playerMockData),
                }),
            ) as jest.Mock;
            render(<Players />);
        });        
        expect(screen.getByTestId("playersTable")).toBeInTheDocument();
        expect(screen.getByTestId("playerImage")).toHaveAttribute("src", `https://crafatar.com/avatars/${playerId}`);
        expect(screen.getByTestId("playerName")).toHaveTextContent("TestPlayer");
        expect(screen.getByTestId("playerDeathReason")).toHaveTextContent("Died from Testing");
        expect(screen.getByTestId("playerDeathCount")).toHaveTextContent("1");
        
        const button = screen.getByTestId("playerDeadButton");
        expect(button).toHaveTextContent("Donate");
        expect(button).toHaveClass('btn', 'btn-success', 'player-donate-button');
        expect(button).toBeVisible();
        
        expect(screen.getByTestId("playerDeadButton")).toHaveTextContent("Donate");
        expect(screen.getByTestId("playerDeathStatus")).toHaveTextContent("Dead");
        expect(screen.getByTestId("playerDonationSum")).toHaveTextContent("133.55");        
    });
    
    it('displays loading message if no players',async () => {
        const emptyPlayersList = [] as Player[];
        await act(() => {
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    json: () => Promise.resolve(emptyPlayersList),
                }),
            ) as jest.Mock;
            render(<Players />);
        });
        expect(screen.getByTestId("loadingText")).toHaveTextContent("Loading...");
    });
});

function getPlayersMockData(playerId: string) : Player[] {    
    return [
        new Player(playerId, "TestPlayer", true, getMockDeaths(playerId), getMockDonations(playerId) )
    ];
}

function getMockDeaths(playerId : string) : Death[] {
    return [
        new Death("123456", "Died from Testing", playerId, new Date())
    ];    
}

function getMockDonations(playerId : string) : Donation[] {
    return [
        new Donation("123456", 123.45, new Date(), 12345, "Test Charity", playerId, undefined ),
        new Donation("123457", 10.10, new Date(), 23456, "Another Test Charity", playerId, undefined ),
    ];
}
