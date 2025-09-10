import Image from "next/image";
import jobs from "@/components/jobs";
import JobsView from "@/components/jobs";
export default function Page() {
  return (
    <div className="z-10 bg-Green-50-Background">
      <picture>
        <source
          srcSet="/images/bg-header-desktop.svg"
          media="(min-width: 800px)"
        />
        <Image
          src="/images/bg-header-mobile.svg"
          alt="bg header"
          className="w-screen h-[15em] bg-Green-400 z-0"
          width={800}
          height={300}
        />
      </picture>
      <JobsView />
    </div>
  );
}
