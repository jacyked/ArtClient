import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React from 'react';

//Pull photos from drive
function loadPictures(){
  //let toAdd = "<div><img src='";
  //let success = true;
  axios
  .get('http://localhost:5000/photos')
  .then(function (res) {
    //let toAdd = "<div><img src='";
    console.log(res);
    console.log(res.data);
    res.data.forEach(displayAndParse);


    function displayAndParse(array){
      array.forEach(function (item){
        console.log(item);
        const arr = item.split(":");
        let id = arr[1];
        let name = arr[0];
        let x = 'https://drive.google.com/uc?export=view&id=' + id
        //JSON.parse(item);
        //console.log(item.webViewLink);
        //toAdd = toAdd + item.webViewLink + "' alt='" + item.name +"'></div><div><img src='";
        const fig = document.createElement("figure");
        const cap = document.createElement("figcaption");
        const n = document.createTextNode(name);
        cap.appendChild(n);
        const image = new Image(400,400);
        image.src = x;
        fig.appendChild(image);
        fig.appendChild(cap);
        //image.crossOrigin = "Access-Control-Allow-Origin";
        document.getElementById('images').appendChild(fig);
        //image.crossOrigin
      });
    };
    //sendToPage(toAdd);
  })
  .catch(err => {
    console.error(err);
    //success = false;
  });
  //ReactDOM.render(toAdd, document.getElementById('images'));
 
  

};

function sendToPage(toAdd){
  let e = document.getElementById('images');
  e.innerHTML = toAdd;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={loadPictures}>Load Pictures</button>
        <div id='images'></div>
      </header>
      
    </div>
  );
}

export default App;
