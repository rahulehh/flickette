import { useState, useEffect, createContext } from "react";
import { auth, provider } from "../services/Firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const navigate = useNavigate();

  const login = () => {
    console.info("Sign in initiated");
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const res = await axios.post("/api/signin", {
          name: result.user.displayName,
          email: result.user.email,
          user_id: result.user.uid,
        });

        setCurrentUser(res.data);

        if (res.data.isNewUser) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = async () => {
    signOut(auth)
      .then(async () => {
        localStorage.clear();
        await axios.post("/api/signout", {});
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
