import Completeoverview from "/Components/Completeoverview";
import Nav from "/Components/Nav";
import Todayoverview from "/Components/Todayoverview";
import "/index.css";

function App() {
  return (
    <div className="dark:bg-neutral-darkTheme-bg bg-white -z-20">
      <Nav />
      <Completeoverview />
      <Todayoverview />
    </div>
  );
}

export default App;
