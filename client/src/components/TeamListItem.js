import React from "react";

const TeamListItem = ({ name, venue, address }) => {
  return (
    <div>
      <h2>{name}</h2>
      <div className="venue-name">{venue}</div>
      <div>{address}</div>
    </div>
  );
};

export default TeamListItem;
