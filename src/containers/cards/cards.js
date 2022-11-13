import React from "react";
import CardItem from "./cardItem";
import "./cards.css";

import src1 from "../../helpers/pictures/test-img.jpg";
import src2 from "../../helpers/pictures/test-img-2.jpg";

//all cards
function Cards() {
  return (
    <div className="cards">
      <div className="cards__container">
        <div className="cards__wrapper">
          <div className="cards__items">
            {/* inside we pass the actual card component */}
            <CardItem
              src={src1}
              text="post1"
              label1="fanart"
              href1="/@"
              label2="NPC"
              href2="/login"
              path="/#"
            />

            <CardItem
              src={src2}
              text="post2"
              label1="cosplay"
              href1="/@"
              path="/#"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
