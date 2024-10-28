import React from "react";
import { cartIcon, avatarImage } from "../assets/assets.jsx";

export default function Navbar() {
  return (
    <div>
      <div className="mobile_menu lg:hidden"></div>
      <div className="menu_with_links_for_pc_nav">
        <div className="logo"></div>
        <div className="links hidden lg:block"></div>
      </div>
      <div className="cart_and_profile flex">
        <div className="cart">
          <img src={cartIcon} alt="" />
        </div>
        <div className="profile">
          <img src={avatarImage} alt="" />
        </div>
      </div>
    </div>
  );
}
