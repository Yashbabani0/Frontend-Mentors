import {
  iconMenu,
  iconCloseMenu,
  iconTodo,
  iconCalendar,
  iconReminders,
  iconPlanning,
} from "./Images";

export default function Mobilemenu() {
  return (
    <div className="lg:hidden">
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer-4" className="drawer-button">
            <img src={iconMenu} className=" cursor-pointer" alt="" />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-Almost-White text-Medium-Gray font-medium min-h-full w-60 py-8 px-4">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay flex items-center justify-end cursor-pointer"
            >
              <img src={iconCloseMenu} alt="" />
            </label>
            <li className="pt-4">
              <details>
                <summary className="w-[50%]">Features</summary>
                <ul>
                  <li>
                    <a>
                      <img src={iconTodo} className="w-4" alt="" /> Todo List
                    </a>
                  </li>
                  <li>
                    <a>
                      <img src={iconCalendar} className="w-4" alt="" /> Calender
                    </a>
                  </li>
                  <li>
                    <a>
                      <img src={iconReminders} className="w-4" alt="" />
                      Reminders
                    </a>
                  </li>
                  <li>
                    <a>
                      <img src={iconPlanning} className="w-4" alt="" /> Planning
                    </a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary className="w-[50%]">Company</summary>
                <ul className="flex flex-col gap-2">
                  <li>History</li>
                  <li>Our Team</li>
                  <li>Blog</li>
                </ul>
              </details>
            </li>
            <li>
              <a>Careers</a>
            </li>
            <li>
              <a>About</a>
            </li>
            <hr className="my-4" />
            <button>Login</button>
            <button className="border-2 border-Medium-Gray py-3 my-4 rounded-xl">
              Register
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
}
