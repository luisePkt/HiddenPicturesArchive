import { useUserContext } from "../utils/Provider";

const DisplayUserData = () => {
  const { userData} = useUserContext();

  return (
    <main>
      <br />
      <p>Username: </p>
      <p>{userData.username}</p>
      <p>email</p>
      <p>{userData.email}</p>
      <p>Profile-Image</p>
      {/* <img src={userData.profileImage.url} alt="" />
      {userData.profileImage}*/}
    </main>
  );
};

export default DisplayUserData;
