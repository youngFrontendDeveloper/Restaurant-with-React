import React, { useState, useEffect } from "react";
import FilterContainer from "./FilterContainer/FilterContainer";

import { filterDescription } from "../../../variables/filterDescription";

const items = [ "All", "Breakfast", "Special", "Desert", "Dinner" ];

function Filter() {
  const [ arr, setArr ] = useState( filterDescription );
  const [ filter, setFilter ] = useState( "all" );
  const [ activeItemIndex, setActiveItemIndex ] = useState( 0 );

  useEffect( () => {
    const result = filterDescription.filter( (el) => {
      return el.type.includes( filter );
    } );
    setArr( result );
  }, [ filter ] );

  return (
    <div className="pricing__filter filter">
      <ul className="filter-controls">
        {
          items.map( (item, index) => {
            return <li key={ `filter-${ index }` }
                       className={ activeItemIndex === index ? "filter-controls__item text text--filter-controls filter-controls__item--active" : "filter-controls__item text text--filter-controls" }
                       onClick={ (e) => {
                         setActiveItemIndex( index );
                         setFilter( e.target.innerText.toLowerCase() );
                       } }
            >{ item }</li>;
          } )
        }

      </ul>
      <FilterContainer
        arr={ arr }
      />
    </div>
  );
}

export default Filter;
