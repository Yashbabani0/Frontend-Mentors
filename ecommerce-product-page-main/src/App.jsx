import React from "react";
import Nav from "./Components/Nav";
import Mobilemenu from "./Components/Mobilemenu";
import ProductImgmobile from "./Components/ProductImgmobile";
import Productdescription from "./Components/Productdescription";
import ProductImg from "./Components/ProductImg";
export default function App() {
  return (
    <div className="bg-light-grayish-blue h-full md:min-h-[100vh] w-screen">
      <Mobilemenu />
      <Nav />
      <ProductImgmobile />
      <div className="md:w-full md:flex md:p-20">
        <ProductImg />
        <Productdescription />
      </div>
    </div>
  );
}
