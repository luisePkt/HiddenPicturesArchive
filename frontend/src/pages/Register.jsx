import style from "../styles/register.module.css";

const Register = () => {
  return (
    <main className={style.main}>
      <h2>Register</h2>
      <div>
        <form action="" style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="decide for a username..."
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="create a password..."
          />
          <label htmlFor="passwordConfirm"> confirm Password</label>
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            placeholder="confirm your password..."
          />

          <label htmlFor="email"> Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="enter your email..."
          />

          <label htmlFor="profileImage"> Profile Picture</label>
          <input type="image" name="profileImage" id="profileImage" />

          <button type="submit">Register now</button>
        </form>
      </div>
    </main>
  );
};

export default Register;
