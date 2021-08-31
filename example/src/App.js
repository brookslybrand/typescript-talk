import Accordions from "./accordions";
import { FormsStateProvider } from "./forms-context";

const OptimizationApp1 = () => (
  <FormsStateProvider>
    <div style={{ width: "50%", margin: "2rem auto" }}>
      <Accordions />
    </div>
  </FormsStateProvider>
);

export default OptimizationApp1;
