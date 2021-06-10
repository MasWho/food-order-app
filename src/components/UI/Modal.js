import ReactDom from 'react-dom';
import styles from './Modal.module.css';

const modalElement = document.getElementById('modal');

const Backdrop = ({onClick}) => {
    return <div className={styles.backdrop} onClick={() => onClick(false)}/>
};

const ModalOverlay = ({children}) => {
    return (
        <div className={styles.modal}>
            <div className={styles.content}>{children}</div>
        </div>
    );
}

const Modal = ({children, onClickBackdrop}) => {
    return ReactDom.createPortal(
        <>
            <Backdrop onClick={onClickBackdrop}/>
            <ModalOverlay>{children}</ModalOverlay>
        </>,
        modalElement
    );
}

export default Modal;