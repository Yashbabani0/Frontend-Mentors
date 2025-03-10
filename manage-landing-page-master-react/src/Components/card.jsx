import React from "react";
import Slider from "react-slick";

function card() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 3000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full max-w-[90%] mx-auto">
      <Slider {...settings}>
        <div className="px-4">
          <div className="relative bg-Very-Light-Gray rounded-lg p-8 pt-12 mt-12 text-center">
            <img
              src="/images/avatar-anisha.png"
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20"
              alt=""
            />
            <h3 className="text-lg font-bold text-Dark-Blue mb-4">Anisha Li</h3>
            <p className="text-Dark-Grayish-Blue">
              "Manage has supercharged our team's workflow. The ability to
              maintain visibility on larger milestones at all times keeps
              everyone motivated."
            </p>
          </div>
        </div>

        <div className="px-4">
          <div className="relative bg-Very-Light-Gray rounded-lg p-8 pt-12 mt-12 text-center">
            <img
              src="/images/avatar-ali.png"
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20"
              alt=""
            />
            <h3 className="text-lg font-bold text-Dark-Blue mb-4">Ali Bravo</h3>
            <p className="text-Dark-Grayish-Blue">
              "We have been able to cancel so many other subscriptions since
              using Manage. There is no more cross-channel confusion and
              everyone is much more focused."
            </p>
          </div>
        </div>

        <div className="px-4">
          <div className="relative bg-Very-Light-Gray rounded-lg p-8 pt-12 mt-12 text-center">
            <img
              src="/images/avatar-richard.png"
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20"
              alt=""
            />
            <h3 className="text-lg font-bold text-Dark-Blue mb-4">
              Richard Watts
            </h3>
            <p className="text-Dark-Grayish-Blue">
              "Manage allows us to provide structure and process. It keeps us
              organized and focused. I can't stop recommending them to everyone
              I talk to!"
            </p>
          </div>
        </div>

        <div className="px-4">
          <div className="relative bg-Very-Light-Gray rounded-lg p-8 pt-12 mt-12 text-center">
            <img
              src="/images/avatar-shanai.png"
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20"
              alt=""
            />
            <h3 className="text-lg font-bold text-Dark-Blue mb-4">
              Shanai Gough
            </h3>
            <p className="text-Dark-Grayish-Blue">
              "Their software allows us to track, manage and collaborate on our
              projects from anywhere. It keeps the whole team in-sync without
              being intrusive."
            </p>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default card;
