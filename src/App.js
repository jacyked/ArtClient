import logo from './logo.svg';
import './App.css';
import axios, { Axios } from 'axios';
import React, { useEffect } from 'react';
import Flicking, { MoveEvent, WillChangeEvent } from "@egjs/react-flicking";
import { useState } from 'react';
import Carousel from './components/Carousel';
import Fader from './components/Fader';



function App() {
  
  const [categories, setCategories] = useState([]);
  

  const loadAllPictures = async () => {
    try{
      const resp = await axios.get('https://portfolio-366318.uw.r.appspot.com:5000/photos');
      //console.log("Load pictures triggered, recieved response from server: ");
      //console.log(resp);
       
      let catArray = new Array();
      resp.data.forEach(buildCategory);
      setCategories(catArray);
      //console.log("Ran build function. Resulting array: ");
      //console.log(catArray);
      //console.log("Categories array: ");
      //console.log(categories);

      function buildCategory(stringArray){
        let listOfPics = new Array();
        stringArray.forEach(function (item){

          //console.log(item);
          const arr = item.split("@");
          let category = arr[0];
          let id = arr[2];
          let title = arr[1];
          let link = 'https://drive.google.com/uc?export=view&id=' + id;
          const fig = document.createElement("figure");
          const cap = document.createElement("figcaption");
          const n = document.createTextNode(title);
          cap.appendChild(n);
          const image = new Image(400,400);
          image.src = link;
          fig.appendChild(image);
          fig.appendChild(cap);
          let pic = {category:category, id:id, name:title}; 
          listOfPics.push(pic);
          
        });
        let thisCat = {name:listOfPics[0].category, allImages:listOfPics, size:listOfPics.length};
        catArray.push(thisCat);

      }

    }catch(err){
      console.log(err);
      try{
        const resp = await axios.get('https://portfolio-366318.uw.r.appspot.com/photos');
        //console.log("Load pictures triggered, recieved response from server: ");
        //console.log(resp);
         
        let catArray = new Array();
        resp.data.forEach(buildCategory);
        setCategories(catArray);
        //console.log("Ran build function. Resulting array: ");
        //console.log(catArray);
        //console.log("Categories array: ");
        //console.log(categories);
  
        function buildCategory(stringArray){
          let listOfPics = new Array();
          stringArray.forEach(function (item){
  
            //console.log(item);
            const arr = item.split("@");
            let category = arr[0];
            let id = arr[2];
            let title = arr[1];
            let link = 'https://drive.google.com/uc?export=view&id=' + id;
            const fig = document.createElement("figure");
            const cap = document.createElement("figcaption");
            const n = document.createTextNode(title);
            cap.appendChild(n);
            const image = new Image(400,400);
            image.src = link;
            fig.appendChild(image);
            fig.appendChild(cap);
            let pic = {category:category, id:id, name:title}; 
            listOfPics.push(pic);
            
          });
          let thisCat = {name:listOfPics[0].category, allImages:listOfPics, size:listOfPics.length};
          catArray.push(thisCat);
  
        }
      }catch(err){
        console.log(err);
      }
    }
  }
  useEffect(() => {
    console.log("UseEffect Triggered.");
    console.log("Check current categories before loadPictures: " + categories.length);
    categories.forEach(function (item) {
      console.log(item.name);
    });
    if(categories.length == 0){
      loadAllPictures();
    }
    console.log("LoadPictures finished. Categories now: " + categories.length);
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hope Emily Portfolio</h1>
        <Fader text="Description" />
      </header>
      <div id='categories'>
          {categories.map((category) => {
            return (
              <div
              key={category.name}>
                <h2>{category.name}</h2>
                <Carousel
                  imageList={category.allImages}
                />
              </div>
            );
          })}
        </div>
      
      
    </div>
  );
}

export default App;
