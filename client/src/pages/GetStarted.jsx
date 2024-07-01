import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const GetStarted = () => {
  const { login } = useContext(AuthContext);

  return (
    <div id="get-started-main">
      <div>
        <h1>Flickette</h1>
        <p>
          A movie tracking web application where you can catalog the movies you
          watched. Get started by signing up with your google account.
        </p>
        <button type="button" onClick={login}>
          Sign in with Google
        </button>
      </div>
      <img src="/src/assets/flickette_icon.svg" alt="flickette_icon" />
    </div>
  );
};

export default GetStarted;
