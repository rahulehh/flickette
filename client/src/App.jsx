import { useContext, useMemo } from "react";
import { AuthContext } from "./context/AuthContext";
import { AppThemeContext } from "./context/AppThemeProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Authenticated from "./pages/Authenticated";
import GetStarted from "./pages/GetStarted";

function App() {
  const { currentUser } = useContext(AuthContext);
  const { appTheme } = useContext(AppThemeContext);

  const materialTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: appTheme == "dark-theme" ? "dark" : "light",
          primary: {
            main: "#674188",
          },
          secondary: {
            main: "#c3acd0",
          },
          background: {
            ...(appTheme == "dark-theme"
              ? {
                  default: "#1e1f22", // secondary
                  paper: "#1e1f22",
                }
              : {
                  default: "#f7efe5",
                  paper: "#f7efe5",
                }),
          },
        },
        typography: {
          fontFamily: '"Jetbrains Mono", monospace',
        },
        components: {
          MuiMenu: {
            styleOverrides: {
              list: {
                '&[role="menu"]': {
                  ...(appTheme == "dark-theme"
                    ? {
                        backgroundColor: "#1e1f22",
                      }
                    : {
                        backgroundColor: "#fffbf5",
                      }),
                },
              },
            },
          },
        },
      }),
    [appTheme]
  );

  return (
    <>
      <ThemeProvider theme={materialTheme}>
        <div className={`App ${appTheme}`}>
          {currentUser ? <Authenticated /> : <GetStarted />}
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
