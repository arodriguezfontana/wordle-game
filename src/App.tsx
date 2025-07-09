import './App.css';
import HomePage from './pages/homePage';
import { Toaster } from "react-hot-toast";

function App() {
  return (
  <div>
    <Toaster position="top-center" />
    <HomePage />
  </div>
  )
};

export default App;