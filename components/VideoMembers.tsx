"use client";

import {client} from "@/sanity/lib/client";
import {VideoSchemaTypes} from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useState} from "react";

async function fetchVideoData(): Promise<VideoSchemaTypes | null> {
  try {
    const query = `
      *[_type == "video"][0] {
        reviewsText,
        nameVideoOne,
        descriptionForPersonInVideoOne,
        positionInCompanyOfFirstPerson,
        videoFileForFirstPerson {
          asset->{
            _id,
            url
          }
        },
        nameVideoTwo,
        descriptionForPersonInVideoTwo,
        positionInCompanyOfSecondPerson,
        videoFileForSecondPerson {
          asset->{
            _id,
            url
          }
        },
        nameVideoThree,
        descriptionForPersonInVideoThree,
        positionInCompanyOfThirdPerson,
        videoFileForThirdPerson {
          asset->{
            _id,
            url
          }
        }
      }
    `;

    const data: VideoSchemaTypes = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Failed to fetch video data:", error);
    return null;
  }
}

export default function VideoMembers() {
  const [video, setVideo] = useState<VideoSchemaTypes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchVideoData();
        setVideo(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching video data:", err);
        setError("Failed to load video data");
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!video) {
    return null;
  }
  return (
    <div className="-mt-10 px-5 lg:my-20 lg:-mt-0 lg:px-0">
      <div className="flex flex-col items-center justify-start gap-5 lg:flex-row lg:pl-40">
        <Image
          src={"/Images/HomePage/Frame 1261155437.svg"}
          alt="image"
          width={172}
          height={28}
        />
        <p className="text-[20px]">{video.reviewsText}</p>
      </div>

      <Image
        src={"/Images/HomePage/13.svg"}
        alt="image"
        width={84.73}
        height={74.04}
        className="-mb-5 ml-auto hidden -translate-x-32 lg:block"
      />

      <div className="flex flex-col items-center justify-center gap-5 lg:flex-row">
        <div className="space-y-5">
          <div className="flex items-center justify-center">
            <Image
              src={"/Images/HomePage/103.svg"}
              alt="image"
              width={76.86}
              height={63.36}
              className="pt-10 lg:-mt-24 lg:-translate-x-20 lg:pt-0"
            />
          </div>
          <h2 className="w-[384px] pb-10 text-center text-h2M font-bold leading-tight lg:pb-20 lg:text-left lg:text-[44px]">
            See what members are saying about Hugging Trade
          </h2>
          <div className="flex items-end justify-center lg:-ml-40 lg:flex-none lg:-translate-y-8">
            <Image
              src={"/Images/HomePage/14.svg"}
              alt="image"
              width={55.77}
              height={62.05}
              className="lg:translate-0 -ml-10 -translate-y-8"
            />

            <Link
              href="/pricing"
              className="block"
            >
              <div className="w-[280.64px] rounded-[20px] border-[2px] border-[#111827] py-3 text-center text-[22px] text-[#111827] hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-white">
                Start free trial
              </div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="px-5 lg:px-0">
            <div>
              <video
                src={video.videoFileForFirstPerson.asset.url}
                aria-label="video"
                width={250}
                height={444}
                className="w-full rounded-2xl lg:w-[250px]"
                controls
                // autoPlay
                loop
                muted
              />
            </div>

            <div className="space-y-2 py-3 text-left">
              <p className="text-[14px]">{video.positionInCompanyOfFirstPerson}</p>
              <div className="w-[20px] border-b-[3px] border-[#D1D5DB]"></div>
              <h3 className="text-[18px] font-bold">{video.descriptionForPersonInVideoOne}</h3>
              <p className="text-[12px]">{video.nameVideoOne}</p>
            </div>
          </div>

          <div className="px-5 lg:px-0">
            <div>
              <video
                src={video.videoFileForSecondPerson.asset.url}
                aria-label="video"
                width={250}
                height={444}
                className="w-full rounded-2xl lg:w-[250px]"
                controls
                // autoPlay
                loop
                muted
              />
            </div>

            <div className="space-y-2 py-3 text-left">
              <p className="text-[14px]">{video.positionInCompanyOfSecondPerson}</p>
              <div className="w-[20px] border-b-[3px] border-[#D1D5DB]"></div>
              <h3 className="text-[18px] font-bold">{video.descriptionForPersonInVideoTwo}</h3>
              <p className="text-[12px]">{video.nameVideoTwo}</p>
            </div>
          </div>

          <div className="px-5 lg:px-0">
            <video
              src={video.videoFileForThirdPerson.asset.url}
              aria-label="video"
              width={250}
              height={444}
              className="w-full rounded-2xl lg:w-[250px]"
              controls
              // autoPlay
              loop
              muted
            />

            <div className="space-y-2 py-3 text-left">
              <p className="text-[14px]">{video.positionInCompanyOfThirdPerson}</p>
              <div className="w-[20px] border-b-[3px] border-[#D1D5DB]"></div>
              <h3 className="text-[18px] font-bold">{video.descriptionForPersonInVideoThree}</h3>
              <p className="text-[12px]">{video.nameVideoThree}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
