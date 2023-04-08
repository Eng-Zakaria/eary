import React from "react";
import FeatureItem from "./FeatureItem";

const Features = () => {
  return (
    <section className="features">
      <div className="container">
        <h2>Features</h2>
        <div className="row">
          <div className="col-md-4">
            <FeatureItem
              title="Flashcards"
              description="Study, memorize, and quiz yourself with our digital flashcards."
            />
          </div>
          <div className="col-md-4">
            <FeatureItem
              title="Games"
              description="Make studying fun with our interactive games and activities."
            />
          </div>
          <div className="col-md-4">
            <FeatureItem
              title="Study Guides"
              description="Get ready for your tests with our helpful study guides."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
