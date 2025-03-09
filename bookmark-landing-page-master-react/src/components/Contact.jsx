import React from "react";
import { useState } from "react";

function Contact() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError(true);
    } else {
      console.log("Valid email:", email);

      setEmail("");
      setError(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-Soft-Blue flex flex-col items-center justify-center gap-8 py-16 px-4 text-center"
    >
      <p className="text-white uppercase tracking-[6px] text-sm font-medium">
        35,000+ already joined
      </p>
      <h2 className="text-white text-3xl font-medium text-balance lg:w-1/3">
        Stay up-to-date with what we're doing
      </h2>
      <div className="flex items-center justify-center gap-4 lg:flex-row flex-col w-full md:w-1/2 lg:w-1/3">
        <div
          className={`w-full text-left rounded-md ${
            error ? "bg-Soft-Red p-1" : ""
          } error-message-container`}
        >
          <input
            type="text"
            placeholder="Enter your email address"
            className="rounded-md px-4 py-2 bg-white text-Soft-Blue w-full"
            value={email}
            onChange={handleEmailChange}
          />
          <p
            className={`text-white text-sm pl-2 pt-2 ${
              error ? "block" : "hidden"
            } error-message`}
          >
            Whoops, make sure it's an email
          </p>
        </div>
        <button
          type="submit"
          className="text-white bg-Soft-Red py-2 rounded-md w-full lg:w-1/3 transition-colors duration-300 cursor-pointer border-Soft-Red border-t-4 border-l-4 border-r border-b hover:bg-white hover:text-Soft-Red"
        >
          Contact Us
        </button>
      </div>
    </form>
  );
}

export default Contact;
