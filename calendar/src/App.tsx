import React from "react";
import "./App.css";
import Calendar from './components/calendar'


const App: React.FC = (): JSX.Element => {
  return (
    <div className="App">
      <Calendar />
    </div>
  );
}

export default App;
