import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import { AnalyticsProvider } from "./analytics/AnalyticsProvider";
import Footer from "./components/Footer/Footer";
import "./styles/main.scss";
import Debrief from "./pages/Debrief";

export default function App() {
  return (
    <AnalyticsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/debrief" element={<Debrief />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </AnalyticsProvider>
  );
}
