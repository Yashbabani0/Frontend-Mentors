import React, { useState } from "react";
import illustrationFeaturesTab1 from "/public/images/illustration-features-tab-1.svg";
import illustrationFeaturesTab2 from "/public/images/illustration-features-tab-2.svg";
import illustrationFeaturesTab3 from "/public/images/illustration-features-tab-3.svg";

function Features() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="flex flex-col items-center text-center px-8 pt-16 pb-24">
      <h2 className="text-Very-Dark-Blue text-2xl md:text-4xl font-medium">
        Features
      </h2>
      <p className="text-Grayish-Blue font-medium lg:w-1/2 py-4">
        Our aim is to make it quick and easy for you to access your favourite
        websites. Your bookmarks sync between your devices so you can access
        them on the go.
      </p>

      <div className="mt-8 flex flex-col lg:flex-row gap-4 border-t-2 lg:border-t-0 border-Grayish-Blue">
        <button
          className={`px-6 py-3 text-sm md:text-lg font-medium border-b-2 border-Grayish-Blue transition ${
            activeTab === 1
              ? "text-Very-Dark-Blue border-b-Soft-Red border-b-4"
              : "text-Grayish-Blue "
          }`}
          onClick={() => setActiveTab(1)}
        >
          Simple Bookmarking
        </button>
        <button
          className={`px-6 py-3 text-sm md:text-lg font-medium border-b-2 border-t-2 lg:border-t-0 border-Grayish-Blue transition ${
            activeTab === 2
              ? "text-Very-Dark-Blue border-b-Soft-Red border-b-4 "
              : "text-Grayish-Blue"
          }`}
          onClick={() => setActiveTab(2)}
        >
          Speedy Searching
        </button>
        <button
          className={`px-6 py-3 text-sm md:text-lg font-medium border-b-2 border-t-2 lg:border-t-0 border-Grayish-Blue transition ${
            activeTab === 3
              ? "text-Very-Dark-Blue border-b-Soft-Red border-b-4 border-t-2 lg:border-t-0"
              : "text-Grayish-Blue "
          }`}
          onClick={() => setActiveTab(3)}
        >
          Easy Sharing
        </button>
      </div>

      <div className="mt-10 flex flex-col items-center">
        {activeTab === 1 && (
          <div className="animate-fadeIn my-16 lg:my-32 lg:flex lg:flex-row lg:items-center lg:justify-center lg:text-left">
            <div className="relative mb-14 lg:min-w-1/2 lg:flex lg:items-end lg:justify-end">
              <img
                src={illustrationFeaturesTab1}
                className="w-3/3 lg:w-[30em] mx-auto lg:mx-0"
                alt="Feature 1"
              />
              <div className="bg-Soft-Blue rounded-tr-full rounded-br-full w-[100%] h-50 lg:h-80 absolute -bottom-8 -left-16 -z-10"></div>
            </div>
            <div className="lg:w-1/2 lg:px-20 lg:flex items-start flex-col justify-center ">
              <h3 className="text-2xl md:text-4xl font-semibold text-Very-Dark-Blue mt-6">
                Bookmark in one click
              </h3>
              <p className="text-Grayish-Blue mt-4">
                Organize your bookmarks however you like. Our simple
                drag-and-drop interface gives you complete control over how you
                manage your favourite sites.
              </p>
              <button className="bg-Soft-Blue hidden lg:block text-White px-6 py-3 rounded-md mt-4 cursor-pointer hover:bg-transparent hover:text-Soft-Blue border-2 border-Soft-Blue transition-colors duration-300">
                More Info
              </button>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className="animate-fadeIn my-16 lg:my-32 lg:flex lg:flex-row lg:items-center lg:justify-center lg:text-left">
            <div className="relative mb-14 lg:min-w-1/2 lg:flex lg:items-end lg:justify-end">
              <img
                src={illustrationFeaturesTab2}
                className="w-3/3 lg:w-[30em] mx-auto lg:mx-0"
                alt="Feature 1"
              />
              <div className="bg-Soft-Blue rounded-tr-full rounded-br-full w-[100%] h-50 lg:h-80 absolute -bottom-8 -left-16 -z-10"></div>
            </div>
            <div className="lg:w-1/2 lg:px-20 lg:flex items-start flex-col justify-center ">
              <h3 className="text-2xl md:text-4xl font-semibold text-Very-Dark-Blue mt-6">
                Intelligent search
              </h3>
              <p className="text-Grayish-Blue mt-4">
                Our powerful search feature will help you find saved sites in no
                time at all. No need to trawl through all of your bookmarks.
              </p>
              <button className="bg-Soft-Blue hidden lg:block text-White px-6 py-3 rounded-md mt-4 cursor-pointer hover:bg-transparent hover:text-Soft-Blue border-2 border-Soft-Blue transition-colors duration-300">
                More Info
              </button>
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div className="animate-fadeIn my-16 lg:my-32 lg:flex lg:flex-row lg:items-center lg:justify-center lg:text-left">
            <div className="relative mb-14 lg:min-w-1/2 lg:flex lg:items-end lg:justify-end">
              <img
                src={illustrationFeaturesTab3}
                className="w-3/3 lg:w-[30em] mx-auto lg:mx-0"
                alt="Feature 1"
              />
              <div className="bg-Soft-Blue rounded-tr-full rounded-br-full w-[100%] h-50 lg:h-80 absolute -bottom-8 -left-16 -z-10"></div>
            </div>
            <div className="lg:w-1/2 lg:px-20 lg:flex items-start flex-col justify-center ">
              <h3 className="text-2xl md:text-4xl font-semibold text-Very-Dark-Blue mt-6">
                Share your bookmarks
              </h3>
              <p className="text-Grayish-Blue mt-4">
                Easily share your bookmarks and collections with others. Create
                a shareable link that you can send at the click of a button.
              </p>
              <button className="bg-Soft-Blue hidden lg:block text-White px-6 py-3 rounded-md mt-4 cursor-pointer hover:bg-transparent hover:text-Soft-Blue border-2 border-Soft-Blue transition-colors duration-300">
                More Info
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Features;
