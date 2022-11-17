// import "./FilterContainer.less";
import React from "react";
import FilterItem from "../FilterItem/FilterItem";


function FilterContainer({ arr }) {

  return (
    <div className="filter-container" id="container">
      {
        arr.map( item => {
          return (
            <FilterItem item={ item } key={ item.id }/>
          );
        } )
      }

    </div>
  );
}

export default FilterContainer;
