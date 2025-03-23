import React from "react";
import Cards from "../components/Cards";

const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <h1 className="text-4xl font-bold">👋 Welcome to EDS Converter </h1>
        <p className="mt-4 text-lg text-gray-300">
          Select an option below to get started.
        </p>
        <Cards />
      </div>
    </>
  );
};

export default Home;
