"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import data from "@/data.json";

export default function JobsView() {
  const [jobs, setJobs] = useState<null | typeof data>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const storedJobs = localStorage.getItem("jobsView");
      if (storedJobs) {
        try {
          setJobs(JSON.parse(storedJobs));
        } catch {
          setJobs(data);
        }
      } else {
        localStorage.setItem("jobsView", JSON.stringify(data));
        setJobs(data);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!jobs) return <JobsSkeleton />;

  // Filtering logic
  const filteredJobs =
    selectedTags.length === 0
      ? jobs
      : jobs.filter((job) => {
          const tags = [
            job.role,
            job.level,
            ...(job.languages || []),
            ...(job.tools || []),
          ];
          return selectedTags.every((tag) => tags.includes(tag));
        });

  // Handlers
  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  };

  const clearTags = () => setSelectedTags([]);

  return (
    <div className="w-full">
      {/* Filter bar */}
      {selectedTags.length > 0 && (
        <div className="z-10 bg-white rounded-lg shadow absolute top-40 w-full max-w-5xl mx-auto left-1/2 transform -translate-x-1/2 p-6 md:px-12 flex items-center justify-between">
          <div className="flex gap-3 flex-wrap">
            {selectedTags.map((tag) => (
              <button
                key={tag}
                className="uppercase bg-Green-50-Background text-Green-400 h-10 pl-3 rounded-md font-bold flex items-center gap-2 overflow-hidden"
              >
                {tag}
                <span
                  onClick={() => removeTag(tag)}
                  className="h-full flex items-center justify-center py-2 px-3 bg-Green-400 hover:bg-green-900 transition-all duration-300 ease-initial cursor-pointer"
                >
                  <Image
                    src="/images/icon-remove.svg"
                    alt="icon remove"
                    width={10}
                    height={10}
                  />
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={clearTags}
            className="text-gray-400 hover:text-Green-400 transition cursor-pointer text-lg font-bold"
          >
            Clear
          </button>
        </div>
      )}

      {/* Jobs */}
      <main className="mx-auto max-w-5xl mt-16 pb-12 flex flex-col items-center justify-center gap-14 md:gap-6">
        {filteredJobs.map((job) => {
          const tags = [
            job.role,
            job.level,
            ...(job.languages || []),
            ...(job.tools || []),
          ];

          return (
            <div
              key={job.id}
              className={`bg-white relative rounded-lg shadow-2xl flex flex-col items-center justify-between sm:flex-row gap-6 w-full py-4 ${
                job.featured ? "border-l-6 border-Green-400" : ""
              }`}
            >
              {/* Logo + Company Info */}
              <div className="flex gap-8 items-center justify-start w-full px-6 pt-4 md:pt-0">
                <div className="absolute -top-10 left-5 md:relative md:top-auto md:left-auto flex items-center justify-center text-center">
                  <Image
                    src={job.logo}
                    alt={job.company}
                    width={60}
                    height={60}
                    className="min:w-10 min:h-10 sm:w-20 sm:h-20"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <section className="flex flex-row justify-start items-center gap-3">
                    <p className="text-Green-400 font-bold text-lg">
                      {job.company}
                    </p>
                    {job.new && (
                      <p className="bg-Green-400 font-bold text-sm text-white inline-block px-4 py-2 rounded-full">
                        NEW!
                      </p>
                    )}
                    {job.featured && (
                      <p className="bg-green-900 font-bold text-sm text-white inline-block px-4 py-2 rounded-full">
                        FEATURED
                      </p>
                    )}
                  </section>
                  <h2 className="font-bold text-green-900 text-xl">
                    {job.position}
                  </h2>
                  <section className="flex items-center justify-start text-gray-400 flex-row gap-3">
                    <p>{job.postedAt}</p>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                    <p>{job.contract}</p>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                    <p>{job.location}</p>
                  </section>
                </div>
              </div>

              {/* Tags */}
              <div>
                <section className="flex flex-row gap-3 flex-wrap md:flex-nowrap md:pr-8 border-t border-green-900 pt-6 sm:border-0">
                  {tags.map((tag) => (
                    <p
                      key={tag}
                      onClick={() => addTag(tag)}
                      className="bg-Green-50-Background text-Green-400 font-bold text-sm px-4 py-2 rounded-lg cursor-pointer hover:bg-Green-400 hover:text-Green-50-Background transition-all duration-300 ease-linear"
                    >
                      {tag}
                    </p>
                  ))}
                </section>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}

function JobsSkeleton() {
  return (
    <main className="mx-auto max-w-5xl mt-16 pb-12 flex flex-col items-center justify-center gap-6">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-white relative rounded-lg shadow-2xl p-6 flex flex-col sm:flex-row gap-6 w-full"
        >
          <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-md" />
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex flex-row items-center gap-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-12 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="h-6 w-48" />
            <div className="flex flex-row gap-3">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <div className="flex flex-row gap-3 flex-wrap">
            <Skeleton className="h-6 w-16 rounded-lg" />
            <Skeleton className="h-6 w-16 rounded-lg" />
            <Skeleton className="h-6 w-16 rounded-lg" />
          </div>
        </div>
      ))}
    </main>
  );
}
