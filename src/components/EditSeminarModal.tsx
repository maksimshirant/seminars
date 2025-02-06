import React, { useState } from "react";
import axios from "axios";
import Button from "./Button";
import st from "./style/modal.module.scss";

interface Seminar {
   id: number;
   title: string;
   description: string;
   date: string;
   time: string;
   photo: string;
}

interface EditSeminarModalProps {
   isVisible: boolean;
   seminar: Seminar;
   onClose: () => void;
   onConfirm: (updatedSeminar: Seminar) => void;
}

const EditSeminarModal: React.FC<EditSeminarModalProps> = ({
   isVisible,
   seminar,
   onClose,
   onConfirm,
}) => {
   const [editedSeminar, setEditedSeminar] = useState<Seminar>(seminar);
   // обновим введенные данные
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setEditedSeminar((prev) => ({
         ...prev,
         [name]: value,
      }));
   };
   // запрос на сохранение внесенных изменений
   const handleConfirmEdit = () => {
      axios
         .put(`http://localhost:1010/api/seminars/${seminar.id}`, editedSeminar)
         .then((response) => {
            if (response.status === 200) {
               onConfirm(editedSeminar);
               onClose();
            }
         })
         .catch((error) => {
            console.error("Ошибка при редактировании семинара:", error);
         });
      window.location.reload();
   };

   if (!isVisible) return null;

   return (
      <div className={st.modal}>
         <div className={st.modal__content}>
            <h3 className={st.modal__title}>Редактировать семинар</h3>

            <label className={st.modal__label}>
               Название:
               <input
                  type="text"
                  name="title"
                  value={editedSeminar.title}
                  onChange={handleInputChange}
                  className={st.modal__input}
               />
            </label>

            <label className={st.modal__label}>
               Описание:
               <textarea
                  name="description"
                  value={editedSeminar.description}
                  onChange={handleInputChange}
                  className={st.modal__textarea}
               />
            </label>

            <label className={st.modal__label}>
               Дата:
               <input
                  type="text"
                  name="date"
                  value={editedSeminar.date}
                  onChange={handleInputChange}
                  className={st.modal__input}
               />
            </label>

            <label className={st.modal__label}>
               Время:
               <input
                  type="text"
                  name="time"
                  value={editedSeminar.time}
                  onChange={handleInputChange}
                  className={st.modal__input}
               />
            </label>
            <div>
               <Button text="Сохранить" onClick={handleConfirmEdit} />
               <Button text="Отмена" onClick={onClose} />

            </div>
         </div>
      </div>
   );
};

export default EditSeminarModal;
