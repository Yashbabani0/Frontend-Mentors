import logo from "/images/logo.svg";
import darklogo from "/images/darkLogo.svg";
import moon from "/images/icon-moon.svg";
import sun from "/images/icon-sun.svg";
import useThemeContext from "../Context/Context";

function Nav() {
  const { themeMode, darkTheme, lightTheme } = useThemeContext();
  const handleThemeChange = () => {
    if (themeMode === "light") {
      darkTheme();
    } else {
      lightTheme();
    }
  };
  return (
    <div className="w-full p-2 flex justify-between items-center bg-Neutral-0 shadow-md rounded-2xl dark:bg-Neutral-800">
      <img src={logo} alt="" className="block dark:hidden" />
      <img src={darklogo} className="hidden dark:block" alt="" />
      <div
        className="bg-Neutral-100 dark:bg-Neutral-700 dark:border dark:border-Neutral-600 p-3 rounded-lg cursor-pointer relative"
        onClick={handleThemeChange}
      >
        <img src={sun} className="hidden dark:block w-5" alt="" />
        <img src={moon} className="block dark:hidden w-5" alt="" />
      </div>
    </div>
  );
}

export default Nav;
