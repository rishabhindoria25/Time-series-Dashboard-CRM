
import React, { useEffect, useRef } from 'react';
// import Button from '../button/Button';
// import CloseIcon from '../CloseIcon';
import {Button} from 'rsuite';
// import '../static/fontawesome/css/rsuite-default.css';

// import styles from './modal.module.css';

const Modal = ({ modalStyle, children, show, onClose, backdropStyle }) => {
    const modalRef = useRef(null);
    useEffect(
        () => {
            if (show) {
                modalRef.current.classList.add(styles.visible);
            }
            else {
                modalRef.current.classList.remove(styles.visible);
            }
        },
        [
            show
        ]
    );
    return (
        <React.Fragment>
            <div ref={modalRef} style={backdropStyle} className={`${styles.modal__wrap}`}>
                {/* <Button
                    onClick={onClose}
                    style={{ width: 60, height: 40, position: 'absolute', top: 0, right: 0, margin: '1rem' }}
                    className={styles.close__btn}
                > */}
                   <i   className="fas fa-times"
                   onClick={onClose}
                   style={{ width: 60, height: 40, position: 'absolute', top: 0, right: 0, margin: '1rem' }}
                    // height="20px" width="20px" 
                    // className={styles.close__icon}
                     ></i>
                {/* </Button> */}
                <div style={modalStyle} className={styles.modal}>
                    {children}
                </div>
            </div>
        </React.Fragment>
    );
};
  // const [ show, setShow] = useState(false);

//  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}> 
//                 <Button onClick={() => setShow(true)}>Open Modal</Button>
//             </div>
//             <Modal show={show} onClose={() => setShow(false)}>
//             <div className="content">
//                 <img src="https://cdn.pixabay.com/photo/2015/01/09/11/11/office-594132__340.jpg" alt="Developer" />
//                 <div className="text">
//                     <h2>John Doe</h2>
//                     <p>
//                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe aliquid placeat omnis
//                         adipisci dolores quae amet mollitia sint, temporibus eum magnam facilis odio ex incidunt?
//                         Deleniti quam et rem obcaecati. Laborum atque odit expedita nulla.
//                     </p>
//                     <p>
//                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita labore laborum, assumenda
//                         dolorum provident quod itaque earum, officia in placeat dignissimos nostrum? Totam corrupti
//                         nihil repudiandae ducimus atque quod eos!
//                     </p>
//                 </div>
//             </div>
//         </Modal>
export default Modal;