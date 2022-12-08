import './App.css';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Carousel from './components/Carousel';
import Fader from './components/Fader';



function App() {
  
  const [categories, setCategories] = useState([]);
  
  //Grab photo info from server 
  const loadAllPictures = async () => {
    try{
      const resp = await axios.get('https://hopeemilyportfolio.uw.r.appspot.com/photos');
       
      let catArray = [];
      resp.data.forEach(buildCategory);
      setCategories(catArray);

      //Builds an array of images within each category
      function buildCategory(stringArray){
        let listOfPics = [];
        stringArray.forEach(function (item){

          const arr = item.split("@");
          let category = arr[0];
          let id = arr[2];
          let title = arr[1];

          let pic = {category:category, id:id, name:title}; 
          listOfPics.push(pic);
          
        });
        let thisCat = {name:listOfPics[0].category, allImages:listOfPics, size:listOfPics.length};
        catArray.push(thisCat);

      }

    }catch(err){
      console.log(err);
      //TODO add placeholders if server cannot be reached
    }
  }

  useEffect(() => {
    if(categories.length == 0){
      loadAllPictures();
    }
  });



  return (
    <div className="App">
      <header className="App-header">
        <h1>Hope Emily Portfolio</h1>
        <h3> Oil  &#9900;  Acrylic  &#9900;  Illustration  &#9900;  Mixed Media </h3>
        <Fader text="Scroll to view" />
        
      </header>
      <div className="App-content" id='categories'>
          {categories.map((category) => {
            return (
              <div
              key={category.name}>
                <h3>{category.name}</h3>
                <Carousel
                  imageList={category.allImages}
                />
              </div>
            );
          })}
        </div>
        <div className="App-footer">
          <table>
            <tbody>
              <tr><td><strong> Instagram: </strong> @placeholder </td><td><strong> Email: </strong> placeholder@gmail.com </td></tr>
            </tbody>
          </table>
        </div>
    </div>
  );
}

export default App;
