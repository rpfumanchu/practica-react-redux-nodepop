import "./App.css";
import LoginPage from "./components/auth/LoginPage";
import AdsPage from "./components/Ads/adsPage/AdsPage";
import { Route, Routes, Navigate } from "react-router-dom";
import Page404 from "./components/shared/page404/Page404";
import AdNew from "./components/Ads/adNew/AdNew";
import AdDetail from "./components/Ads/adDetail/AdDetail";
import RequireAuth from "./components/auth/RequireAuth";
import HomePage from "./components/Ads/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/adverts/home" element={<HomePage />} />
        <Route
          path="/adverts"
          element={
            <RequireAuth>
              <AdsPage />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/adverts/new"
          element={
            <RequireAuth>
              <AdNew />
            </RequireAuth>
          }
        />
        <Route
          path="/adverts/:id"
          element={
            <RequireAuth>
              <AdDetail />
            </RequireAuth>
          }
        />

        <Route path="/" element={<Navigate to="/adverts" />} />
        <Route path="/404" element={<Page404 />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
