import { Link } from "react-router-dom";
import style from "../styles/register.module.css";
import { useUserContext } from "../utils/Provider";
import { useState } from "react";

const Register = () => {
  // states aus Provider
  const { activeUser, setActiveUser } = useUserContext();
  // states:
  const [file, setFile] = useState(undefined);
  const [error, setError] = useState(null);

  const [userData, setUserData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
    profileImage: null,
  });

  const port = 3333;

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("img: ", file);
    // console.log("username: ", document.getElementById("username").value);
    // console.log("password: ", document.getElementById("password").value);
    // console.log(
    //   "passwordConfirm: ",
    //   document.getElementById("passwordConfirm").value
    // );
    // console.log("email: ", document.getElementById("email").value);

    const userDataToSend = new FormData();
    userDataToSend.append(
      "username",
      document.getElementById("username").value
    );
    userDataToSend.append(
      "password",
      document.getElementById("password").value
    );
    userDataToSend.append(
      "passwordConfirm",
      document.getElementById("passwordConfirm").value
    );
    userDataToSend.append("email", document.getElementById("email").value);
    userDataToSend.append("file", file);

    console.log("userdataToSend: ", userDataToSend);
    try {
      const response = await fetch(`http://localhost:${port}/user/register`, {
        method: "POST",

        body: userDataToSend,
        credentials: "include",
      });
      console.log("response: ", response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "registration failed");
      }
      const data = await response.json();
      // console.log("data: ", data);
      // console.log("active user: ", activeUser);
      // setActiveUser(data);
      setActiveUser(true);
      console.log("active user 2: ", data);
    } catch (error) {
      console.error("Problem with registration: ", error);
      setError({ message: error.message });
    }
  };

  return (
    <main className={style.main}>
      {activeUser ? (
        // <button onClick={handleLogout}> Logout</button>
        <p>registered and logged in</p>
      ) : (
        <div>
          <h2>Register</h2>
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={handleSubmit}
          >
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="decide for a username..."
              onChange={handleChange}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="create a password..."
              onChange={handleChange}
            />
            <label htmlFor="passwordConfirm"> confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              placeholder="confirm your password..."
              onChange={handleChange}
            />

            <label htmlFor="email"> Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="enter your email..."
              onChange={handleChange}
            />

            <label htmlFor="profileImage"> Profile Picture</label>
            <input
              type="file"
              name="profileImage"
              id="profileImage"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button type="submit">Register now</button>
          </form>
          <p>or</p>
          <Link to="/login">click here to login</Link>
        </div>
      )}
    </main>
  );
};

export default Register;
