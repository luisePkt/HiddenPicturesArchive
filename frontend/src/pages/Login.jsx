import { Link } from "react-router-dom";
import style from "../styles/login.module.css";
import { useState } from "react";
// import axios from "axios";
import { useUserContext } from "../utils/Provider";
import EyeOpen from "../assets/icons/eye-solid.svg";
import EyeClosed from "../assets/icons/eye-slash-solid.svg";

const Login = () => {
  // states aus Provider
  const { activeUser, setActiveUser, port } = useUserContext();
  // states:
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  // const port = 3333;

  // handle showPassword:
  const handleShowPassword = () => {
    setShowPassword(showPassword ? false : true);
  };

  // Aktualisierung loginData:
  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(undefined);
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // LOGIN:
  const handleLogin = async (e) => {
    e.preventDefault();

    const { username, password } = loginData;

    // prüfen, ob username oder pw vorhanden
    if (!username || !password) {
      return setError({ message: "Missing username or password" });
    }

    try {
      const response = await fetch(`http://localhost:${port}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network response not okay");
      }

      const data = await response.json();
      // setActiveUser(data.user);
      setActiveUser(true);
    } catch (error) {
      console.error("Problem with fetching: ", error);
      setError({ message: error.message });
    }
  };

  return (
    <main className={style.main}>
      {activeUser ? (
        <p>Welcome</p>
      ) : (
        <div>
          <h2>Login</h2>
          <br />
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={handleLogin}
          >
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="insert username..."
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <div className={style.wrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="insert password..."
                onChange={handleChange}
                className={style.pwInput}
              />{" "}
              <img
                src={showPassword ? EyeOpen : EyeClosed}
                alt="eye closed"
                onClick={handleShowPassword}
                className={style.pwIcon}
              />
            </div>
            <br />
            <button type="submit">Login</button>
          </form>
          <br />
          <p>or</p>
          <Link to="/register">click here to register</Link>
        </div>
      )}
    </main>
  );
};

export default Login;
