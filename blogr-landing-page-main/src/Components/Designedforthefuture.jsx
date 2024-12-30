import React from "react";
import { images } from "./Images";

export default function Designedforthefuture() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-16 md:py-24 lg:my-[6em] gap-10 md:h-screen">
      <h2 className="text-primary-veryDarkBlue text-2xl md:text-3xl lg:text-4xl font-medium">
        Designed for the future
      </h2>
      <section className="flex flex-col gap-8 md:flex-row relative items-center justify-center">
        <div>
          <img
            src={images.illustrationEditorMobile}
            className="md:hidden"
            alt=""
          />
        </div>
        <div className="flex items-center justify-center flex-col text-center md:text-left px-10 gap-8 md:w-1/2 md:h-[80vh] md:justify-evenly md:px-20 lg:px-32">
          <section className="flex flex-col gap-4">
            <h3 className="text-primary-veryDarkBlue text-3xl">
              Introducing an extensible editor
            </h3>
            <p className="text-neutral-veryDarkGrayishBlue">
              Blogr features an exceedingly intuitive interface which lets you
              focus on one thing: creating content. The editor supports
              management of multiple blogs and allows easy manipulation of
              embeds such as images, videos, and Markdown. Extensibility with
              plugins and themes provide easy ways to add functionality or
              change the looks of a blog.
            </p>
          </section>
          <section className="flex flex-col gap-4">
            <h3 className="text-primary-veryDarkBlue text-3xl">
              Robust content management
            </h3>
            <p className="text-neutral-veryDarkGrayishBlue">
              Flexible content management enables users to easily move through
              posts. Increase the usability of your blog by adding customized
              categories, sections, format, or flow. With this functionality,
              you’re in full control.
            </p>
          </section>
        </div>
        <div className="relative hidden md:flex w-1/2 h-full">
          <img
            src={images.illustrationEditorDesktop}
            className="hidden md:block absolute right-[-28%]"
            alt=""
          />
        </div>
      </section>
    </div>
  );
}
