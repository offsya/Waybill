import './App.css';
import AppRouter from "./pages/AppRouter";
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar";



function App() {
  return (
    <div className="App">
        <NavBar/>
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    </div>
  );
}

export default App;
