import BackgroundImg from "./Components/BackgroundImg";
import Nav from "./Components/Nav";
import AboutProject from "./Components/AboutProject";
import BackThisProject from "./Components/BackThisProject";
import TotalContribution from "./Components/TotalContribution";
import ThankuforSupport from "./Components/ThankuforSupport";
import Header from "./Components/Header";

function App() {
  return (
    <div className="relative z-20">
      <BackgroundImg />
      <Nav />
      <Header />
      <TotalContribution />
      <AboutProject />
      <BackThisProject />
      <ThankuforSupport />
    </div>
  );
}

export default App;
