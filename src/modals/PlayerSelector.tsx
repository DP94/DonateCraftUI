import React from "react";
import {Button, Modal} from "react-bootstrap";
import {Player} from "../pages/players/player";
import './PlayerSelector.css'

const PlayerSelector = (props: any) => {
    if (props.show) {
        return <Modal show={props.show} centered={true}>
            <Modal.Header className="modal-header donate-header" data-testid="playerSelectorHeader" closeButton onHide={props.toggle}>
                <Modal.Title>Who is donating?</Modal.Title>
            </Modal.Header>

            <Modal.Body className="modal-body donate-body">
                <ul className="player-choice">
                    {
                        props.players.map((player: Player, index: number) => (

                            <li key={player.id} className="player-record w-100" data-testid={`playerChoice${index}`}
                                onClick={() => props.playerSelected(props.currentPlayer, player)}>
                                <img className="player-choice-image col-sm-1" src={`https://crafatar.com/avatars/${player.id}`} data-testid={`playerChoiceImage${index}`}/>
                                <span className="player-choice-span col-sm-2" data-testid={`playerChoiceName${index}`}>{player.name}</span>
                            </li>

                        ))
                    }
                </ul>
            </Modal.Body>
        </Modal>
    } else {
        return <></>
    }
}
export default PlayerSelector;