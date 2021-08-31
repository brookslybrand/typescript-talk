import Accordions from "./accordions";
import { FormsStateProvider } from "./forms-context";

function App() {
  return (
    <FormsStateProvider>
      <div style={{ width: "50%", margin: "2rem auto" }}>
        <Accordions />
      </div>
    </FormsStateProvider>
  );
}

export default App;
