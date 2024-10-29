import React from "react";
import Todayoverbox from "./Todayoverbox.jsx";
import {
  iconDown,
  iconFacebook,
  iconInstagram,
  iconTwitter,
  iconUp,
  iconYoutube,
} from "../assets/Assetsimport.jsx";

export default function Todayoverview() {
  return (
    <div className="flex flex-col items-center px-4 py-12 lg:px-16 lg:py-8 ">
      <div className="w-full flex items-start">
        <h3 className="text-2xl font-bold text-neutral-lightTheme-veryDarkText">
          Overview - Today
        </h3>
      </div>
      <div className="flex gap-8 mt-4 flex-wrap items-center justify-center">
        <Todayoverbox
          PageViews="Page Views"
          icon={iconFacebook}
          number="87"
          iconupordown={iconUp}
          per="3%"
          textColor="text-primary-limeGreen"
        />
        <Todayoverbox
          PageViews="Likes"
          icon={iconFacebook}
          number="52"
          iconupordown={iconDown}
          per="2%"
          textColor="text-primary-brightRed"
        />
        <Todayoverbox
          PageViews="Likes"
          icon={iconInstagram}
          number="5462"
          iconupordown={iconUp}
          per="2257%"
          textColor="text-primary-limeGreen"
        />
        <Todayoverbox
          PageViews="Profile Views"
          icon={iconInstagram}
          number="52K"
          iconupordown={iconUp}
          per="1375%"
          textColor="text-primary-limeGreen"
        />
        <Todayoverbox
          PageViews="Retweets"
          icon={iconTwitter}
          number="117"
          iconupordown={iconUp}
          per="303%"
          textColor="text-primary-limeGreen"
        />
        <Todayoverbox
          PageViews="Likes"
          icon={iconTwitter}
          number="507"
          iconupordown={iconUp}
          per="553%"
          textColor="text-primary-limeGreen"
        />
        <Todayoverbox
          PageViews="Likes"
          icon={iconYoutube}
          number="107"
          iconupordown={iconDown}
          per="19%"
          textColor="text-primary-brightRed"
        />
        <Todayoverbox
          PageViews="Total Views"
          icon={iconYoutube}
          number="1407"
          iconupordown={iconDown}
          per="12%"
          textColor="text-primary-brightRed"
        />
      </div>
    </div>
  );
}
