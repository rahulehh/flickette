import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { SaveButton } from "../components/Buttons";

const GetStarted = () => {
  const { login } = useContext(AuthContext);

  return (
    <div id="get-started-main">
      <h1>Flickette</h1>
      <p>
        Your go-to movie tracking <br /> web app
      </p>
      <SaveButton onClick={login}>Get Started</SaveButton>
    </div>
  );
};

export default GetStarted;
