import { Toaster } from "react-hot-toast";
import AppRoutes from "./Routes/appRoutes";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <AppRoutes />
    </>
  );
}

export default App;