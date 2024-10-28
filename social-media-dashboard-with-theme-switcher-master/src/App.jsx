import Completeoverview from "./Components/Completeoverview";
import Nav from "./Components/Nav";
import Todayoverview from "./Components/Todayoverview";
import "./index.css";

function App() {
  return (
    <div>
      <Nav />
      <Completeoverview />
      <Todayoverview />
    </div>
  );
}

export default App;
