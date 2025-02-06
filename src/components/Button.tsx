
import React from 'react';
import st from './style/button.module.scss'
interface ButtonProps {
   text: string;
   onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
   return <button className={st.button} onClick={onClick}>{text}</button>;
};

export default Button;
