import logo from "/public/images/logo-bookmark-footer.svg";
import facebook from "/public/images/icon-facebook.svg";
import twitter from "/public/images/icon-twitter.svg";

function Footer() {
  return (
    <footer className="bg-Very-Dark-Blue flex text-white items-center justify-center lg:justify-between flex-col lg:flex-row py-8 lg:px-40 gap-8">
      <div className="flex items-center justify-center flex-col lg:flex-row gap-8">
        <img src={logo} alt="logo" />
        <ul className="flex items-center justify-center flex-col lg:flex-row gap-4 text-Grayish-Blue">
          <li className="hover:text-Soft-Red cursor-pointer transition-colors duration-400">
            Features
          </li>
          <li className="hover:text-Soft-Red cursor-pointer transition-colors duration-400">
            Pricing
          </li>
          <li className="hover:text-Soft-Red cursor-pointer transition-colors duration-400">
            Contact
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-center gap-14">
        <i class="fa-brands fa-square-facebook text-2xl hover:text-Soft-Red cursor-pointer transition-colors duration-400"></i>
        <i class="fa-brands fa-twitter text-2xl hover:text-Soft-Red cursor-pointer transition-colors duration-400"></i>
      </div>
    </footer>
  );
}

export default Footer;
