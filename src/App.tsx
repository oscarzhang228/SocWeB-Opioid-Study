import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import { AnalyticsProvider } from "./analytics/AnalyticsProvider";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <AnalyticsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </AnalyticsProvider>
  );
}
