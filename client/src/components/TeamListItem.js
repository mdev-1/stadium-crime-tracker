import React from "react";
import PropTypes from "prop-types";

const TeamListItem = ({ name, venue, address }) => {
  return (
    <div>
      <h2>{name}</h2>
      <div className="venue-name">{venue}</div>
      <div>{address}</div>
    </div>
  );
};

TeamListItem.propTypes = {
  name: PropTypes.string.isRequired,
  venue: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

export default TeamListItem;
