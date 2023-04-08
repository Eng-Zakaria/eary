import React from "react";

const FeatureItem = ({ title, description }) => {
  return (
    <div className="feature-item">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default FeatureItem;
