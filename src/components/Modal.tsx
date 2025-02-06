
import React, { useEffect } from 'react';
import st from './style/modal.module.scss'
import Button from './Button';

interface ModalProps {
   isVisible: boolean;
   onClose: () => void;
   onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, onConfirm }) => {

   if (!isVisible) return null;

   return (
      <div className={st.modal}>
         <div className={st.modal__content}>
            <h3>Вы уверены, что хотите удалить этот семинар?</h3>
            <div className={st.modal__actions}>
               <Button onClick={onConfirm} text='Удалить' />
               <Button onClick={onClose} text='Отмена' />

            </div>
         </div>
      </div>
   );
};

export default Modal;
