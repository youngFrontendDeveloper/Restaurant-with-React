import React from "react";

function FilterItem({ item }) {
  return (
    <div className="filter-container__item all breakfast">
      <img src={ item.img } alt="Виды блюд" width="207" height="166" loading="lazy"/>
      <p className="text text--filter-container">&#36;{ item.price }</p>
    </div>
  );
}

export default FilterItem;