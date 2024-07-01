import { useEffect, createContext, useState } from "react";
import PropTypes from "prop-types";

const AppThemeContext = createContext();

const getAppTheme = () => {
  const appTheme = localStorage.getItem("appTheme");
  if (!appTheme) {
    localStorage.setItem("appTheme", "light-theme");
    return "light-theme";
  }
  return appTheme;
};

const AppThemeProvider = ({ children }) => {
  const [appTheme, setAppTheme] = useState(getAppTheme);

  function toggleAppTheme() {
    if (appTheme === "dark-theme") {
      setAppTheme("light-theme");
    } else {
      setAppTheme("dark-theme");
    }
  }

  useEffect(() => {
    const refreshTheme = () => {
      localStorage.setItem("appTheme", appTheme);
    };

    refreshTheme();
  }, [appTheme]);

  return (
    <AppThemeContext.Provider
      value={{
        appTheme,
        setAppTheme,
        toggleAppTheme,
      }}
    >
      {children}
    </AppThemeContext.Provider>
  );
};

export { AppThemeContext, AppThemeProvider };

AppThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
