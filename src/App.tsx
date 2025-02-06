import { useEffect, useState } from "react";
import axios from "axios";
import SeminarList from "./components/SeminarList";
import Navbar from "./components/NavBar";

interface Seminar {
   id: number;
   title: string;
   description: string;
   date: string;
   time: string;
   photo: string;
}

const App = () => {
   const [seminars, setSeminars] = useState<Seminar[]>([]);

   useEffect(() => {
      axios
         .get<Seminar[]>("http://localhost:1010/api/seminars")
         .then((response) => {
            const seminarData = response.data;
            setSeminars(seminarData);
         })
         .catch((error: any) => {
            console.log(error);
         });
   }, []);



   return (
      <div>
         <Navbar />
         <SeminarList seminars={seminars} />
      </div>
   );
};

export default App;

