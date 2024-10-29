import React from "react";
import Completeoverbox from "./Completeoverbox";
import {
  iconDown,
  iconFacebook,
  iconInstagram,
  iconTwitter,
  iconUp,
  iconYoutube,
} from "../assets/Assetsimport.jsx"; 

export default function Completeoverview() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-8 text-center relative z-20">
        <Completeoverbox
          socialIcon={iconFacebook}
          username="@nathanf"
          count="1987"
          label="Followers"
          changeIcon={iconUp}
          changeAmount="12 Today"
          borderColor="border-social-facebook"
          instagramBorder="hidden"
          textColor="text-primary-limeGreen"
        />
        <Completeoverbox
          socialIcon={iconTwitter}
          username="@nathanf"
          count="1044"
          label="Followers"
          changeIcon={iconUp}
          changeAmount="99 Today"
          borderColor="border-social-twitter"
          instagramBorder="hidden"
          textColor="text-primary-limeGreen"
        />
        <Completeoverbox
          socialIcon={iconInstagram}
          username="@realnathanf"
          count="11k"
          label="Followers"
          changeIcon={iconUp}
          changeAmount="1099 Today"
          borderColor="border-none"
          textColor="text-primary-limeGreen"
        />
        <Completeoverbox
          socialIcon={iconYoutube}
          username="Nathan F."
          count="8239"
          label="Subscribers"
          changeIcon={iconDown}
          changeAmount="144 Today"
          borderColor="border-social-youtube"
          instagramBorder="hidden"
          textColor="text-primary-brightRed"
        />
      </div>
    </div>
  );
}
