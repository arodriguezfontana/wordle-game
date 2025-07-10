import Home from './pages/home';
import { Toaster } from "react-hot-toast";

function App() {
  return (
  <div>
    <Toaster position="top-center" />
    <Home />
  </div>
  )
};

export default App;