import { useState } from "react";
import DisplayUserData from "../components/DisplayUserData";
import EditUserData from "../components/EditUserData";
import style from "../styles/Userdata.module.css";

const Userdata = () => {
  const [showUserdata, setShowUserdata] = useState(true);

  const handleShowUSerdata = () => {
    setShowUserdata(showUserdata ? true : false);
  };

  return (
    <main className={style.main}>
      <h2>Your user data</h2>
      <br />
      {showUserdata ? (
        <div>
          <DisplayUserData /> <br />
          <button onClick={handleShowUSerdata}>edit my userdata</button>
        </div>
      ) : (
        <EditUserData />
      )}
    </main>
  );
};

export default Userdata;
