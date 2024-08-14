import { Link } from "react-router-dom";
import style from "../styles/register.module.css";
import { useUserContext } from "../utils/Provider";
import { useEffect, useState } from "react";
import EyeOpen from "../assets/icons/eye-solid.svg";
import EyeClosed from "../assets/icons/eye-slash-solid.svg";

const Register = () => {
  // states aus Provider
  const { activeUser, setActiveUser, port } = useUserContext();
  // states:
  const [file, setFile] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [errorsVal, setErrorsVal] = useState({});

  const [userData, setUserData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
    profileImage: null,
  });

  // handle showPassword:
  const handleShowPassword = () => {
    setShowPassword(showPassword ? false : true);
  };

  // track input:
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    // setUserData((prevState) => ({
    //   ...prevState,
    //   [e.target.name]: e.target.value,
    // }));
  };

  // validate profile img:
  const validateProfileImg = (file) => {
    if (!file) {
      return "no img selected";
    }
    const allowedImgTypes = ["image/jpeg", "image/png", "image/tiff"];
    if (!allowedImgTypes.includes(file.type)) {
      return "invald filetype";
    }
    const maxFileSize = 500000;
    if (file.size > maxFileSize) {
      return `file size exceeds ${maxFileSize / 1000}kb`;
    }
    return null;
  };

  // validate input & generate message:
  const validateFormFields = (formData) => {
    let valErrors = {};

    Object.keys(formData).forEach((key) => {
      switch (key) {
        case "username":
          const usernameRegex = /^[a-zA-Z0-9_]+$/;
          if (!usernameRegex.test(formData[key])) {
            valErrors[key] = "Only letters and numbers are allowed.";
          }
          break;
        case "password":
          if (formData[key].length < 12) {
            valErrors[key] = "Password must be at least 12 characters long";
          }
          break;
        case "passwordConfirm":
          if (formData[key] !== formData["password"]) {
            valErrors[key] = "The entry must match the password.";
          }
          break;
        case "email":
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(formData[key])) {
            valErrors[key] = "Email is not valid.";
          }
          break;
        case "profileImage":
          const errorMessage = validateProfileImg(formData[key]);
          if (errorMessage) {
            valErrors[key] = errorMessage;
          }
          break;
        default:
          valErrors[key] = "invalid input";
          break;
      }
    });
    return valErrors;
  };

  // validate frontend:
  useEffect(() => {
    const validationErrors = validateFormFields(userData);
    console.log({ validationErrors });
    if (Object.keys(validationErrors).length > 0) {
      setErrorsVal(validationErrors);
    }
  }, [userData, file]); // NOTICE: nicht optimal vielleicht mit handleChange
  // NOTICE: bei letzten feld bleibt validation error unter input feld

  // send userdata to DB
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userDataToSend = new FormData();
    userDataToSend.append(
      "username",
      // document.getElementById("username").value
      userData.username
    );
    userDataToSend.append(
      "password",
      // document.getElementById("password").value
      userData.password
    );
    userDataToSend.append(
      "passwordConfirm",
      // document.getElementById("passwordConfirm").value
      userData.passwordConfirm
    );
    userDataToSend.append(
      "email",
      // document.getElementById("email").value
      userData.email
    );
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
        <p>registered and logged in</p>
      ) : (
        <div>
          <h2>Register</h2>
          <br />
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={handleSubmit}
          >
            <div className={style.input}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="decide for a username..."
                onChange={handleChange}
                required
              />
              {errorsVal.username && (
                <p className={style.errorMsg}>{errorsVal.username}</p>
              )}
            </div>

            <div className={style.input}>
              <label htmlFor="password">Password</label>
              <div className={style.wrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="create a password..."
                  className={style.pwInput}
                  onChange={handleChange}
                  required
                  minLength={12}
                />
                <img
                  src={showPassword ? EyeOpen : EyeClosed}
                  alt="eye closed"
                  onClick={handleShowPassword}
                  className={style.pwIcon}
                />
              </div>
              {errorsVal.password && (
                <p className={style.errorMsg}>{errorsVal.password}</p>
              )}
            </div>

            <div className={style.input}>
              <label htmlFor="passwordConfirm"> confirm Password</label>
              <div className={style.wrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="passwordConfirm"
                  id="passwordConfirm"
                  placeholder="confirm your password..."
                  className={style.pwInput}
                  onChange={handleChange}
                  required
                  minLength={12}
                />
                <img
                  src={showPassword ? EyeOpen : EyeClosed}
                  alt="eye closed"
                  onClick={handleShowPassword}
                  className={style.pwIcon}
                />
              </div>
              {errorsVal.passwordConfirm && (
                <p className={style.errorMsg}>{errorsVal.passwordConfirm}</p>
              )}
            </div>

            <div className={style.input}>
              <label htmlFor="email"> Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="enter your email..."
                onChange={handleChange}
                required
              />
              {errorsVal.email && (
                <p className={style.errorMsg}>{errorsVal.email}</p>
              )}
            </div>

            <div className={style.input}>
              <label htmlFor="profileImage"> Profile Picture</label>
              <input
                type="file"
                name="profileImage"
                id="profileImage"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <br />
            <button type="submit">Register now</button>
          </form>
          <div className={style.link}>
            <p>or</p>
            <Link to="/login">click here to login</Link>
          </div>{" "}
        </div>
      )}
    </main>
  );
};

export default Register;
