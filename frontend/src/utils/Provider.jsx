import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  // const [activeUser, setActiveUser] = useState(null);
  const [activeUser, setActiveUser] = useState(false);

  return (
    <UserContext.Provider value={{ activeUser, setActiveUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export const useUserContext = () => useContext(UserContext);
