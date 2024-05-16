import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const {cartItem, addToCart, removeFromCart, url} = useContext(StoreContext)

  return (
    <div className="food-item" key={id}>
      <div className="food-item-img-container">
        <img className="food-item-image" src={url+"/images/"+image} alt={name} />
        {!cartItem[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id) }
            src={assets.add_icon_white}
            alt="add-food"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id) }
              src={assets.remove_icon_red}
              alt="remove-food"
            />
            <p>{cartItem[id]}</p>
            <img
              onClick={() => addToCart(id) }
              src={assets.add_icon_green}
              alt="add-more-food"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="food-rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
