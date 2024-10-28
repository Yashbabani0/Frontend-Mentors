import React from "react";
import Completeoverbox from "./Completeoverbox";

function App() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 text-center">
      <Completeoverbox
        socialIcon="../src/assets/images/icon-facebook.svg"
        username="@nathanf"
        count="1987"
        label="Followers"
        changeIcon="../src/assets/images/icon-up.svg"
        changeAmount="12 Today"
        borderColor="border-social-facebook"
        instagramBorder='hidden'
      />
      <Completeoverbox
        socialIcon="../src/assets/images/icon-twitter.svg"
        username="@nathanf"
        count="1044"
        label="Followers"
        changeIcon="../src/assets/images/icon-up.svg"
        changeAmount="99 Today"
        borderColor="border-social-twitter"
        instagramBorder='hidden'
      />
      <Completeoverbox
        socialIcon="../src/assets/images/icon-instagram.svg"
        username="@realnathanf"
        count="11k"
        label="Followers"
        changeIcon="../src/assets/images/icon-up.svg"
        changeAmount="1099 Today"
        borderColor="border-none"
      />
      <Completeoverbox
        socialIcon="../src/assets/images/icon-youtube.svg"
        username="Nathan F."
        count="8239"
        label="Subscribers"
        changeIcon="../src/assets/images/icon-down.svg"
        changeAmount="144 Today"
        borderColor="border-social-youtube"
        instagramBorder='hidden'
      />
    </div>
  );
}

export default App;
