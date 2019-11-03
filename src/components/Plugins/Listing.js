import React, { Fragment } from "react";
import PropTypes from "prop-types";

import SingleItem from "./SingleItem";
import pluginPropType from "./pluginType";
import Header from "./Header";
import FootNote from "./FootNote";

function Listing({ list, onClick }) {
  return (
    <Fragment>
      <Header title="Plugins" />
      {list.map(pluginItem => (
        <SingleItem
          key={pluginItem.name}
          name={pluginItem.name}
          description={pluginItem.description}
          onClick={() => onClick(pluginItem)}
        />
      ))}
      <FootNote />
    </Fragment>
  );
}

Listing.propTypes = {
  list: PropTypes.arrayOf(pluginPropType).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Listing;
