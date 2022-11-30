import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import React, { useState, useEffect } from "react";

function Carousel(props) {
    const { innerWidth: width, innerHeight: height } = window;
    //console.log("Window Size: " + width + " x " + height);
    let imgHeight = '400px';
    let imgWidth = null;
    let resize = false;
    let align = 'prev';
    let defaultIndex = 0;
    if (width <= 568){
        imgWidth = (width * 0.9) + "px";
        imgHeight= '';
        resize = true;
        align = 'center';
        defaultIndex = 1;
    }else{
        imgWidth = '';
        imgHeight = (height * 0.6) + "px";
    }
    //imgHeight = '400px';
    const list = props.imageList;
    list.forEach(function (item) {
        item['link'] = 'https://drive.google.com/uc?export=view&id=' + item.id;
    });
    //console.log(list);
    //list.forEach(function (item) {
        //console.log(item.html.toString);
    //});
    return (
        <Flicking 
        className="flicking"
        align={align}
        defaultIndex={defaultIndex}
        circular={true}
        circularFallback="bound"
        resizeOnContentsReady={true}
        onMoveEnd={e => {
          console.log(e);
        }}>
        {list.map((fig) => {
            return(
                <div
                    key={fig.id}
                >
                    <figure><img src={fig.link} style={{ width: imgWidth, height: imgHeight }}/><figcaption>{fig.name}</figcaption></figure>
                </div>
            );
        })}
      </Flicking>
    );

}

export default Carousel;