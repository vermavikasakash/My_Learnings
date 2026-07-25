import React from "react";
import customHook from "./customHook";

const Utilisation = () => {
  const { loader, data, error } = customHook("http://url");

  return <div>utilisation</div>;
};

export default Utilisation;
