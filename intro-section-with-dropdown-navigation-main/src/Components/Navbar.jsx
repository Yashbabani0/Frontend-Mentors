import React, { useState } from "react";
import {
  iconArrowDown,
  iconArrowUp,
  iconCalendar,
  iconMenu,
  iconPlanning,
  iconReminders,
  iconTodo,
  logo,
} from "./Images";
import Mobilemenu from "./Mobilemenu";

export default function Navbar() {
  const [isFeaturesOpen, setFeaturesOpen] = useState(false);
  const [isCompanyOpen, setCompanyOpen] = useState(false);

  const toggleFeatures = () => {
    setFeaturesOpen((prev) => !prev);
    setCompanyOpen(false); // Close other dropdown if open
  };

  const toggleCompany = () => {
    setCompanyOpen((prev) => !prev);
    setFeaturesOpen(false); // Close other dropdown if open
  };

  return (
    <div className="w-full min-h-[15vh] flex items-center justify-between p-6 lg:py-8 lg:px-32">
      <section className="flex items-center justify-center gap-16">
        <img src={logo} alt="Logo" />
        <div className="lg:flex items-center justify-center gap-8 hidden">
          <div
            className="text-Medium-Gray hover:text-Almost-Black flex items-center justify-center gap-2 relative cursor-pointer"
            onClick={toggleFeatures}
          >
            Features
            <img
              src={isFeaturesOpen ? iconArrowUp : iconArrowDown}
              alt="Toggle Features"
              className="w-3 h-3"
            />
            {isFeaturesOpen && (
              <div className="shadow-xl rounded-lg absolute left-0 top-full mt-2 p-4 bg-white items-start gap-2 text-sm flex flex-col w-[140%]">
                <a
                  href="#"
                  className="text-Medium-Gray hover:text-Almost-Black flex gap-2"
                >
                  <img src={iconTodo} className="w-4" alt="Todo" /> Todo List
                </a>
                <a
                  href="#"
                  className="text-Medium-Gray hover:text-Almost-Black flex gap-2"
                >
                  <img src={iconCalendar} className="w-4" alt="Calendar" />{" "}
                  Calendar
                </a>
                <a
                  href="#"
                  className="text-Medium-Gray hover:text-Almost-Black flex gap-2"
                >
                  <img src={iconReminders} className="w-4" alt="Reminders" />
                  Reminders
                </a>
                <a
                  href="#"
                  className="text-Medium-Gray hover:text-Almost-Black flex gap-2"
                >
                  <img src={iconPlanning} className="w-4" alt="Planning" />{" "}
                  Planning
                </a>
              </div>
            )}
          </div>
          <div
            className="text-Medium-Gray hover:text-Almost-Black flex items-center justify-center gap-2 relative cursor-pointer"
            onClick={toggleCompany}
          >
            Company
            <img
              src={isCompanyOpen ? iconArrowUp : iconArrowDown}
              alt="Toggle Company"
              className="w-3 h-3"
            />
            {isCompanyOpen && (
              <div className="shadow-xl text-sm rounded-lg absolute left-0 top-full mt-2 py-2 px-3 bg-white flex flex-col w-[110%]">
                <a
                  href="#"
                  className="text-Medium-Gray hover:text-Almost-Black"
                >
                  History
                </a>
                <a
                  href="#"
                  className="text-Medium-Gray hover:text-Almost-Black"
                >
                  Our Team
                </a>
                <a
                  href="#"
                  className="text-Medium-Gray hover:text-Almost-Black"
                >
                  Blog
                </a>
              </div>
            )}
          </div>
          <a href="#" className="text-Medium-Gray hover:text-Almost-Black">
            Careers
          </a>
          <a href="#" className="text-Medium-Gray hover:text-Almost-Black">
            About
          </a>
        </div>
      </section>
      <section className="lg:flex hidden gap-8">
        <button className="text-Medium-Gray hover:text-Almost-Black">
          Login
        </button>
        <button className="border-2 border-Almost-Black text-Medium-Gray hover:text-Almost-Black py-3 px-6 my-4 rounded-xl">
          Register
        </button>
      </section>
      <section className="lg:hidden">
        <Mobilemenu />
      </section>
    </div>
  );
}
