import { useUserContext } from "../utils/Provider";

const DisplayUserData = () => {
  const { userData, profileImage } = useUserContext();

  return (
    <main>
      <h2>Display User Data</h2>
      <br />
      <p>Username: </p>
      <p>{userData.username}</p>
      <p>email</p>
      <p>{userData.email}</p>
      <p>Profile-Image</p>
      {/* <img src={userData.profileImage.url} alt="" />
      {userData.profileImage}
      {profileImage} */}
    </main>
  );
};

export default DisplayUserData;
