import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "page/homePage/Index";
import LoginPage from "page/loginPage/Index";
import ProfilePage from "page/profilePage/Index";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "theme";
import Navbar from "page/navbar/Index";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to={"/"} />}
            ></Route>
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to={"/"} />}
            ></Route>
            <Route path="/nav" element={<Navbar />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
