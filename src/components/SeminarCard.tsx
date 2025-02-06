import { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import st from "./style/seminarCard.module.scss";
import EditSeminarModal from "./EditSeminarModal";


interface Seminar {
   id: number;
   title: string;
   description: string;
   date: string;
   time: string;
   photo: string;
}

interface SeminarCardProps {
   seminar: Seminar;
   onDelete: (id: number) => void;
   onEdit: (updatedSeminar: Seminar) => void;

}

const SeminarCard: React.FC<SeminarCardProps> = ({ seminar, onDelete, onEdit }) => {
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
   // 4 фукнции внизу для работы с модальными окнами, можно было проще,  но на portal не хватило времени..
   const handleDeleteClick = () => {
      setIsModalVisible(true);
   };

   const handleModalClose = () => {
      setIsModalVisible(false);
   };
   const handleEditClick = () => {
      setIsEditModalVisible(true);
   };

   const handleEditModalClose = () => {
      setIsEditModalVisible(false);
   };
   // подтверждаем удаление
   const handleConfirmDelete = () => {
      onDelete(seminar.id);
      setIsModalVisible(false);
   };

   return (
      <div className={st.seminarCard}>
         <div className={st.contentBox}>
            <div className={st.seminarImageBox}><img loading="lazy" className={st.seminarImage} src={seminar.photo} alt={seminar.title} /></div>
            <div>
               <h2 >{seminar.title}</h2>
               <p >{seminar.description}</p>
               <p >
                  📅 {seminar.date} | 🕒 {seminar.time}
               </p>
            </div>
         </div>
         <div className={st.buttonline}>
            <Button text="Редактировать" onClick={handleEditClick} />
            <Button text="Удалить" onClick={handleDeleteClick} />

         </div>
         <Modal
            isVisible={isModalVisible}
            onClose={handleModalClose}
            onConfirm={handleConfirmDelete}
         />
         <EditSeminarModal
            isVisible={isEditModalVisible}
            seminar={seminar}
            onClose={handleEditModalClose}
            onConfirm={onEdit}
         />
      </div>
   );
};

export default SeminarCard;
