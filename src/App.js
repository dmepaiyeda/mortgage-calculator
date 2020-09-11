import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import CalculatorForm from './CalculatorForm';

class App extends React.Component{
  render(){
    return (
      <div style={{padding: '2em'}}>
        <CalculatorForm/>
      </div>
    );
  } 
}

export default App;
