import { Fragment } from 'react';
import classes from './Modal.module.css';
import { createPortal } from 'react-dom';

const Backdrop = props => {
    return <div className={classes.backdrop} onClick ={props.onClose}></div>
}

const ModalOverlay = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const protalElement = document.getElementById('overlays');

const Modal = props => {

    return <Fragment>
        {createPortal(<Backdrop onClose = {props.onClose}/>, protalElement)};
        {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, protalElement)};
    </Fragment>
}

export default Modal ;