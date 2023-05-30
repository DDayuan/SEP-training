import './App.css';
import React from 'react'
import Todolist from './Components/Todolist/Todolist';

class App extends React.Component {

  render() {
    return(
      <div className='app'>
        <h1>happy holliday</h1>
        <Todolist/>
      </div>
    )
  }
};


export default App;
