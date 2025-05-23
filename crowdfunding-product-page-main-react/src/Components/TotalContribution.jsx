function TotalContribution() {
  return (
    <div className="flex flex-col items-center justify-center bg-white p-8 w-[90vw] md:w-[70vw] lg:[50vw] mt-12 mx-auto rounded-xl ">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-16 w-full items-center md:items-start justify-center md:justify-start">
        <section className="flex gap-2 flex-col text-center border-b-2 md:border-b-0 md:border-r-2 md:pr-8 border-gray-200 pb-2 md:text-left">
          <h2 className="font-bold text-2xl md:text-3xl">$89,914</h2>
          <p className="text-Gray-500 text-sm">of $100,000 backed</p>
        </section>
        <section className="flex gap-2 flex-col text-center border-b-2 md:border-b-0 md:border-r-2 md:pr-8 border-gray-200 pb-2 md:text-left">
          <h2 className="font-bold text-2xl md:text-3xl">5,007</h2>
          <p className="text-Gray-500 text-sm">total backers</p>
        </section>
        <section className="flex gap-2 flex-col text-center pb-2 md:text-left">
          <h2 className="font-bold text-2xl md:text-3xl">56</h2>
          <p className="text-Gray-500 text-sm">days left</p>
        </section>
      </div>
      <div></div>
    </div>
  );
}

export default TotalContribution;
