import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import React, { useState, useEffect } from "react";

function Carousel(props) {
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
        align="prev"
        circular={true}
        onMoveEnd={e => {
          console.log(e);
        }}>
        {list.map((fig) => {
            return(
                <div
                    key={fig.id}
                >
                    <figure><img src={fig.link} style={{ height: '400px', }}/><figcaption>{fig.name}</figcaption></figure>
                </div>
            );
        })}
      </Flicking>
    );

}

export default Carousel;