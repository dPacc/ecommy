import React from "react";
import { Jumbotron, NewArrivals } from "../components";

const Home = () => {
  return (
    <>
      <div className="jumbotron text-danger display-2 font-weight-bold text-center">
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div>

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        New Arrivals
      </h4>

      <NewArrivals />

      <br />
      <br />
    </>
  );
};

export default Home;
