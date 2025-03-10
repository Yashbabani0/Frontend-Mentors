import React from "react";

function Aboutmanage() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 my-24 lg:flex-row lg:px-36 lg:items-start lg:my-32 relative z-40">
      <div className="absolute rotate-45 -bottom-20 -left-24 hidden lg:block  bg-Very-Pale-Red min-w-[15em] min-h-[30em] rounded-full -z-10"></div>
      <div className="absolute rotate-45 -top-80 -right-28 lg:hidden  bg-Very-Pale-Red min-w-[10em] min-h-[25em] rounded-full -z-10"></div>
      <div className="flex flex-col items-center justify-center gap-4 text-center px-6 lg:text-left z-40">
        <h2 className="text-3xl font-bold text-Dark-Blue">
          What's different about Manage?
        </h2>
        <p className="text-Dark-Grayish-Blue lg:pr-16 lg:text-balance">
          Manage provides all the functionality your team needs, without the
          complexity. Our software is tailor-made for modern digital product
          teams.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 z-40">
        <section className="px-4 flex items-center justify-center gap-4 flex-col">
          <div className="bg-Very-Pale-Red rounded-full flex items-center justify-start gap-4 text-Dark-Blue font-medium pr-4 w-full lg:bg-transparent">
            <p className="bg-Bright-Red w-16 h-10 font-medium text-white rounded-full flex items-center justify-center">
              01
            </p>
            Track company-wide progress
          </div>
          <div className="lg:pl-20">
            <p className="text-Dark-Grayish-Blue">
              See how your day-to-day tasks fit into the wider vision. Go from
              tracking progress at the milestone level all the way done to the
              smallest of details. Never lose sight of the bigger picture again.
            </p>
          </div>
        </section>
        <section className="px-4 flex items-center justify-center gap-4 flex-col">
          <div className="bg-Very-Pale-Red rounded-full flex items-center justify-start gap-4 text-Dark-Blue font-medium pr-4 w-full lg:bg-transparent">
            <p className="bg-Bright-Red w-16 h-10 font-medium text-white rounded-full flex items-center justify-center">
              02
            </p>
            Advanced built-in reports
          </div>
          <div className="lg:pl-20">
            <p className="text-Dark-Grayish-Blue">
              Set internal delivery estimates and track progress toward company
              goals. Our customisable dashboard helps you build out the reports
              you need to keep key stakeholders informed.
            </p>
          </div>
        </section>
        <section className="px-4 flex items-center justify-center gap-4 flex-col">
          <div className="bg-Very-Pale-Red rounded-full flex items-center justify-start gap-4 text-Dark-Blue font-medium pr-4 w-full lg:bg-transparent">
            <p className="bg-Bright-Red w-16 h-10 font-medium text-white rounded-full flex items-center justify-center">
              03
            </p>
            Everything you need in one place
          </div>
          <div className="lg:pl-20">
            <p className="text-Dark-Grayish-Blue">
              Stop jumping from one service to another to communicate, store
              files, track tasks and share documents. Manage offers an
              all-in-one team productivity solution.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Aboutmanage;
