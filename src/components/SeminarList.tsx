import { useState } from "react";
import SeminarCard from "./SeminarCard";
import st from './style/seminarList.module.scss'
import axios from "axios";


interface Seminar {
   id: number;
   title: string;
   description: string;
   date: string;
   time: string;
   photo: string;
}

interface SeminarListProps {
   seminars: Seminar[];
}


const SeminarList: React.FC<SeminarListProps> = ({ seminars }) => {
   const [seminarsList, setSeminarsList] = useState<Seminar[]>(seminars);
   // запрос на удаление и перезагрузим стр после для обновления
   const handleDeleteSeminar = (id: number) => {
      axios
         .delete(`http://localhost:1010/api/seminars/${id}`)
         .then((response) => {
            if (response.status === 200) {
               setSeminarsList((prevSeminarsList) =>
                  prevSeminarsList.filter((seminar) => seminar.id !== id)
               );
            } else {
               console.error('Ошибка удаления семинара');
            }
         })
         .catch((error) => {
            console.error('Ошибка запроса на сервер:', error);
         });
   };
   // тут мы обновляем список семинаров и обновим страницу для отображения
   const handleEditSeminar = (updatedSeminar: Seminar) => {
      setSeminarsList((prevSeminars) =>
         prevSeminars.map((seminar) =>
            seminar.id === updatedSeminar.id ? updatedSeminar : seminar
         )
      );
   };

   return (
      <div className={st.seminarList}>
         {seminarsList.map((seminar) => (
            <SeminarCard key={seminar.id} seminar={seminar} onDelete={handleDeleteSeminar} onEdit={handleEditSeminar} />
         ))}
      </div>
   );
};

export default SeminarList;
