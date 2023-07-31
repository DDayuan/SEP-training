import logo from "./logo.svg";
import "./App.css";
import Carousel from "./components/carousel/Carousel";

function App() {
  return (
    <div className="App">
      <Carousel>
        <div><h1>slide1</h1></div>
        <div><h1>slide2</h1></div>
        <div><h1>slide3</h1></div>
      </Carousel>
    </div>
  );
}

export default App;
