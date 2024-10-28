// Todayoverview.js
import React from "react";
import Todayoverbox from "./Todayoverbox";
// import FacebookIcon from "./src/assets/images/icon-facebook.svg";
// import UpIcon from "./src/assets/images/icon-up.svg";
// import DownIcon from "./src/assets/images/icon-down.svg";
// import instagramIcon from "./assets/images/icon-instagram.svg";
// import TwitterIcon from "./assets/images/icon-twitter.svg";
// import YoutubeIcon from "./assets/images/icon-youtube.svg";

export default function Todayoverview() {
  return (
    <div className="flex flex-col items-center px-4 py-12 lg:px-16 lg:py-8 ">
      <div className="w-full flex items-start">
        <h3 className="text-2xl font-bold text-neutral-lightTheme-veryDarkText">
          Overview - Today
        </h3>
      </div>
      <div className="flex gap-8 flex-wrap items-center justify-center">
        <Todayoverbox
          PageViews="Page Views"
          icon={"../src/assets/images/icon-facebook.svg"}
          number="87"
          iconupordown={"../src/assets/images/icon-up.svg"}
          per="3%"
        />
        <Todayoverbox
          PageViews="Likes"
          icon={"../src/assets/images/icon-facebook.svg"}
          number="52"
          iconupordown={"../src/assets/images/icon-down.svg"}
          per="2%"
        />
        <Todayoverbox
          PageViews="Likes"
          icon={"../src/assets/images/icon-instagram.svg"}
          number="5462"
          iconupordown={"../src/assets/images/icon-up.svg"}
          per="2257%"
        />
        <Todayoverbox
          PageViews="Profile Views"
          icon={"../src/assets/images/icon-instagram.svg"}
          number="52K"
          iconupordown={"../src/assets/images/icon-up.svg"}
          per="1375%"
        />
        <Todayoverbox
          PageViews="Retweets"
          icon={"../src/assets/images/icon-twitter.svg"}
          number="117"
          iconupordown={"../src/assets/images/icon-up.svg"}
          per="303%"
        />
        <Todayoverbox
          PageViews="Likes"
          icon={"../src/assets/images/icon-twitter.svg"}
          number="507"
          iconupordown={"../src/assets/images/icon-up.svg"}
          per="553%"
        />
        <Todayoverbox
          PageViews="Likes"
          icon={"../src/assets/images/icon-youtube.svg"}
          number="107"
          iconupordown={"../src/assets/images/icon-down.svg"}
          per="19%"
        />
        <Todayoverbox
          PageViews="Total Views"
          icon={"../src/assets/images/icon-youtube.svg"}
          number="1407"
          iconupordown={"../src/assets/images/icon-down.svg"}
          per="12%"
        />
      </div>
    </div>
  );
}
