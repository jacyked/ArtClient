import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import React from "react";


//Image carousel component using Flicking
function Carousel(props) {

    //Grab the current screen size
    const { innerWidth: width, innerHeight: height } = window;

    //Set default values for carousel
    let imgHeight = '400px';
    let imgWidth = null;
    let align = 'prev';
    let defaultIndex = 0;

    //Mobile values
    if (width <= 568){
        imgWidth = (width * 0.9) + "px";
        imgHeight= '';
        align = 'center';
        defaultIndex = 1;
    }
    //Desktop and tablet values
    else{
        imgWidth = '';
        imgHeight = (height * 0.6) + "px";
    }
    
    //Grab list of images, build links for src
    const list = props.imageList;
    list.forEach(function (item) {
        item['link'] = 'https://drive.google.com/uc?export=view&id=' + item.id;
    });

    //Build the component
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
                    <figure><img src={fig.link} alt={fig.link} style={{ width: imgWidth, height: imgHeight }}/><figcaption>{fig.name}</figcaption></figure>
                </div>
            );
        })}
      </Flicking>
    );

}

export default Carousel;