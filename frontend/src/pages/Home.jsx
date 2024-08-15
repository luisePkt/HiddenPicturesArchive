import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../styles/Home.module.css";

const Home = () => {
  return (
    <main className={style.main}>
      <h1>Welcome to the hidden pictures archive!</h1>
    </main>
  );
};

export default Home;
