import close from "/images/icon-close-modal.svg";
function BackThisProject() {
  return (
    <div className="bg-black/20 w-screen min-h-screen absolute top-0 left-0">
      <div className="w-[90vw] md:w-[70vw] lg:[50vw] bg-white p-8 mt-28 mx-auto rounded-lg">
        <div className="flex items-start justify-between">
          <section>
            <h2 className="font-bold text-2xl mb-4">Back this project</h2>
            <p className="font-normal text-sm tracking-wide">
              Want to support us in bringing Mastercraft Bamboo Monitor Riser
              out in the world?
            </p>
          </section>
          <img src={close} className="cursor-pointer" alt="" />
        </div>
        
      </div>
    </div>
  );
}

export default BackThisProject;
