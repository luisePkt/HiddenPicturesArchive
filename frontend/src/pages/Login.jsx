import { Link } from "react-router-dom";
import style from "../styles/login.module.css";
import { useState } from "react";
// import axios from "axios";
import { useUserContext } from "../utils/Provider";

function Login() {
  // states aus Provider
  const { activeUser, setActiveUser } = useUserContext();
  // states:
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  // const [activeUser, setActiveUser] = useState(null);
  // const [error, setError] = useState(null);

  const port = 3333;

  // Aktualisierung loginData:
  const handleChange = (e) => {
    const { name, value } = e.target;
    // setError(undefined);
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

      // const response = await axios.post(
      //   `http://localhost:${port}/user/login`,
      //   {
      //     username,
      //     password,
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     withCredentials: true,
      //   }
      // );

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

  // const handleLogout = async () => {
  //   const response = await fetch("http://localhost:3333/logout", {
  //     method: "POST",
  //     credentials: "include",
  //   });
  //   if (response.ok) {
  //     setActiveUser(null);
  //   } else {
  //     setError("logout failed");
  //   }
  // };

  return (
    <main className={style.main}>
      {activeUser ? (
        // <button onClick={handleLogout}> Logout</button>
        <p>logged in</p>
      ) : (
        <div>
          <h2>Login</h2>
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
            <input
              type="password"
              name="password"
              id="password"
              placeholder="insert password..."
              onChange={handleChange}
            />
            <button type="submit">Login</button>
          </form>
          <br />
          <p>or</p>
          <Link to="/register">click here to register</Link>
        </div>
      )}
    </main>
  );
}

export default Login;
