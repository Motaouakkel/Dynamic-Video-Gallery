import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';

class App extends Component {
  state = {
    videos : []
  }
  componentDidMount(){
    axios.get('http://localhost:5000/video').then(res =>{
        this.setState({videos: res.data}) 
    })
  }

  render() {
    return (
      <div className='app'>
        <Navbar/>
      </div>
    );
  }
}

export default App;