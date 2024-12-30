import React from "react";

export default function Pcmenu() {
  return (
    <div className="hidden md:flex">
      <ul className="menu md:menu-horizontal gap-4 md:mb-auto">
        <li>
          <details>
            <summary
              className="text-neutral-grayishBlue text-lg hover:text-white transition-colors duration-200"
              aria-expanded="false"
              aria-controls="product-menu"
            >
              Product
            </summary>
            <ul id="product-menu" className="bg-white rounded-lg">
              <li className="text-neutral-veryDarkGrayishBlue hover:text-neutral-veryDarkBlackBlue hover:font-semibold">
                <a>Overview</a>
              </li>
              <li className="text-neutral-veryDarkGrayishBlue hover:text-neutral-veryDarkBlackBlue hover:font-semibold">
                <a>Pricing</a>
              </li>
              <li className="text-neutral-veryDarkGrayishBlue hover:text-neutral-veryDarkBlackBlue hover:font-semibold">
                <a>Marketplace</a>
              </li>
              <li className="text-neutral-veryDarkGrayishBlue hover:text-neutral-veryDarkBlackBlue hover:font-semibold">
                <a>Features</a>
              </li>
              <li className="text-neutral-veryDarkGrayishBlue hover:text-neutral-veryDarkBlackBlue hover:font-semibold">
                <a>Integrations</a>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary
              className="text-neutral-grayishBlue text-lg hover:text-white transition-colors duration-200"
              aria-expanded="false"
              aria-controls="product-menu"
            >
              Company
            </summary>
            <ul id="product-menu" className="bg-white rounded-lg">
              <li className="text-neutral-veryDarkGrayishBlue hover:text-neutral-veryDarkBlackBlue hover:font-semibold">
                <a>About</a>
              </li>
              <li className="text-neutral-veryDarkGrayishBlue hover:text-neutral-veryDarkBlackBlue hover:font-semibold">
                <a>Team</a>
              </li>
              <li className="text-neutral-veryDarkGrayishBlue hover:text-neutral-veryDarkBlackBlue hover:font-semibold">
                <a>Blog</a>
              </li>
              <li className="text-neutral-veryDarkGrayishBlue hover:text-neutral-veryDarkBlackBlue hover:font-semibold">
                <a>Careers</a>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary
              className="text-neutral-grayishBlue text-lg hover:text-white transition-colors duration-200"
              aria-expanded="false"
              aria-controls="product-menu"
            >
              Connect
            </summary>
            <ul id="product-menu" className="bg-white rounded-lg">
              <li className="text-neutral-veryDarkGrayishBlue hover:text-neutral-veryDarkBlackBlue hover:font-semibold">
                <a>Contact</a>
              </li>
              <li className="text-neutral-veryDarkGrayishBlue hover:text-neutral-veryDarkBlackBlue hover:font-semibold">
                <a>Newsletter</a>
              </li>
              <li className="text-neutral-veryDarkGrayishBlue hover:text-neutral-veryDarkBlackBlue hover:font-semibold">
                <a>LinkedIn</a>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  );
}
