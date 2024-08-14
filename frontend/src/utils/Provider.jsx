import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  // const [activeUser, setActiveUser] = useState(null);
  const [activeUser, setActiveUser] = useState(false);
  const [userData, setUserdata] = useState({});
  const [userToken, setUserToken] = useState(null);
  const [profileImage, setProfileImage] = useState(undefined);
  const port = 3333;

  // fetch userdata from backend:
  const baseUrl = import.meta.env.VITE_baseUrl;
  const endpoint = import.meta.env.VITE_endpoint;
  const currentUserId = import.meta.env.VITE_currentUserId;
  // const url = `${baseUrl}/${endpoint}`;
  const url = `${baseUrl}/${endpoint}/${currentUserId}`;

  console.log("url: ", url);

  // fetch all user-data (one user)
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setUserdata(data);
      })
      .catch((error) => console.log("error getting userData", error));
  }, []);
  // console.log(userData);

  // fetch img with blob
  // useEffect(() => {
  //   fetch(`${url}/profilepic`)
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       const imageUrl = URL.createObjectURL(blob);
  //       setProfileImage(imageUrl);
  //     })
  //     .catch((error) => console.log("error getting image"));
  // }, []);

  // get userID :
  // useEffect(() => {
  //   console.log("test");
  //   fetchUserId();
  // }, [activeUser]);

  // const fetchUserId = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:3333/user/userId`, {
  //       method: "GET",
  //       credentials: "include",
  //     });
  //     if (!response.ok) {
  //       throw new Error();
  //     }
  //     const data = await response.json();
  //     console.log(data.userID);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <UserContext.Provider
      value={{ activeUser, setActiveUser, userData, profileImage, port }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export const useUserContext = () => useContext(UserContext);
