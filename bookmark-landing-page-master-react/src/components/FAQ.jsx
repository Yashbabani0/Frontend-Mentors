import React from "react";

function FAQ() {
  return (
    <div className="flex flex-col gap-4 w-full md:w-1/2 lg:w-1/3 bg-white mx-auto my-28 px-4">
      <h2 className="text-center text-Very-Dark-Blue text-2xl lg:text-3xl font-semibold px-4">
        Frequently Asked Questions
      </h2>
      <p className="text-center text-Grayish-Blue text-sm px-4 my-4 font-medium">
        Here are some of our FAQs. If you have any other questions you’d like
        answered please feel free to email us.
      </p>
      <div className="collapse collapse-arrow bg-white text-Very-Dark-Blue">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title font-semibold hover:text-Soft-Red cursor-pointer">
          What is Bookmark?
        </div>
        <div className="collapse-content text-sm hover:text-Soft-Red cursor-pointer text-Grayish-Blue">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
          tincidunt justo eget ultricies fringilla. Phasellus blandit ipsum quis
          quam ornare mattis.
        </div>
      </div>
      <div className="collapse collapse-arrow bg-white text-Very-Dark-Blue">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title font-semibold hover:text-Soft-Red cursor-pointer">
          How can I request a new browser?
        </div>
        <div className="collapse-content text-sm hover:text-Soft-Red cursor-pointer text-Grayish-Blue">
          Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa,
          ultricies non ligula. Suspendisse imperdiet. Vivamus luctus eros
          aliquet convallis ultricies. Mauris augue massa, ultricies non ligula.
          Suspendisse imperdie tVivamus luctus eros aliquet convallis ultricies.
          Mauris augue massa, ultricies non ligula. Suspendisse imperdiet.
        </div>
      </div>
      <div className="collapse collapse-arrow bg-white text-Very-Dark-Blue">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title font-semibold hover:text-Soft-Red cursor-pointer">
          Is there a mobile app?
        </div>
        <div className="collapse-content text-sm hover:text-Soft-Red cursor-pointer text-Grayish-Blue">
          Sed consectetur quam id neque fermentum accumsan. Praesent luctus
          vestibulum dolor, ut condimentum urna vulputate eget. Cras in ligula
          quis est pharetra mattis sit amet pharetra purus. Sed sollicitudin ex
          et ultricies bibendum.
        </div>
      </div>
      <div className="collapse collapse-arrow bg-white text-Very-Dark-Blue">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title font-semibold hover:text-Soft-Red cursor-pointer">
          What about other Chromium browsers?
        </div>
        <div className="collapse-content text-sm hover:text-Soft-Red cursor-pointer text-Grayish-Blue">
          Integer condimentum ipsum id imperdiet finibus. Vivamus in placerat
          mi, at euismod dui. Aliquam vitae neque eget nisl gravida pellentesque
          non ut velit.
        </div>
      </div>
      <button className="bg-Soft-Blue text-sm md:text-lg text-White px-4 py-2 rounded-md cursor-pointer border-2 border-Soft-Blue hover:bg-transparent hover:text-Soft-Blue transition-all duration-300 w-fit mx-auto">
        More Info
      </button>
    </div>
  );
}

export default FAQ;
