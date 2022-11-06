import {Button, Modal} from "react-bootstrap";
import React from "react";

const InactivityModal = (props: {show: boolean, toggle: () => void, continueButtonOnClick: () => void }) => {
    if (props.show) {
        return <Modal show={props.show} centered={true}>
            <Modal.Header className="modal-header donate-header" closeButton onHide={props.toggle}>
                <Modal.Title>Inactive for too long</Modal.Title>
            </Modal.Header>

            <Modal.Body className="modal-body donate-body">
                Live updates for this page have been paused due to inactivity. Press OK to resume live updates.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.continueButtonOnClick()}>OK</Button>
            </Modal.Footer>
        </Modal>
    } else {
        return <></>
    }
}
export default InactivityModal;