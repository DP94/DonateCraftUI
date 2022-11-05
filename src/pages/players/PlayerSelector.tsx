import React from "react";
import {Button, Modal} from "react-bootstrap";
import {Player} from "./player";
import './PlayerSelector.css'

const PlayerSelector = (props: any) => {
    if (props.show) {
        return <Modal show={props.show} centered={true}>
            <Modal.Header className="modal-header donate-header" closeButton onHide={props.toggle}>
                <Modal.Title>Who is donating?</Modal.Title>
            </Modal.Header>

            <Modal.Body className="modal-body donate-body">
                {
                    props.players.map((player: Player) => (
                        <ul className="player-choice">
                            <li key={player.id} className="player-record w-100" onClick={() => props.playerSelected(player.id)}>
                                <img className="player-choice-image col-sm-1" src={`https://crafatar.com/avatars/${player.id}`}/>
                                <span className="player-choice-span col-sm-2">{player.name}</span>
                            </li>
                        </ul>
                    ))
                }

            </Modal.Body>
        </Modal>
    } else {
        return <></>
    }
}
export default PlayerSelector;