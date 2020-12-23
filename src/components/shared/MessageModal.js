import React from 'react';
import {Modal, Button} from 'react-bootstrap';
/**
 * Component to show Modal
 * @param {*} props 
 */
export default function MessageModal(props) {
    const {show, showActionControls, modalHeading, message, actionBtnText, actionBtnVariant, actionBtnHandler, onClose} = props;
    return (
        <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        {showActionControls !== false?<Modal.Footer>
          <Button variant={props.closeBtnVariant ?? "secondary"} onClick={onClose}>
            {props.closeBtnText ?? "Close"}
          </Button>
          <Button variant={actionBtnVariant ?? 'primary'} onClick={(e) => {
              actionBtnHandler(e);
              onClose(e);
            }}>
            {actionBtnText}
          </Button>
        </Modal.Footer>:<React.Fragment />}
        
      </Modal>
    );
}