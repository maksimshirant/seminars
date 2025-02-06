import React from "react";
import styles from "./style/navbar.module.scss";


const Navbar: React.FC = () => {
   return (
      <nav className={styles.navbar}>
         <div className={styles.greeting}>
            <h1>Добро пожаловать на сайт с семинарами!</h1>
            <p>Здесь вы найдете актуальную информацию о семинарах по косметологии и инновациям в индустрии красоты.</p>
         </div>
      </nav>
   );
};

export default Navbar;
