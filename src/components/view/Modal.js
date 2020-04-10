import React from 'react';
import ReactDOM from 'react-dom';

import TimePicker from './TimePicker';
import './Modal.css';

const Modal = (props) => props.isShowing ? ReactDOM.createPortal(
    <React.Fragment>
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="modal">
            <div className="modal-header">
            <button type="button" className="modal-close-button button-general" data-dismiss="modal" aria-label="Close" onClick={props.hide}>
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            {props.children}
        </div>
        </div>
    </React.Fragment>, document.body
) : null;

export default Modal;