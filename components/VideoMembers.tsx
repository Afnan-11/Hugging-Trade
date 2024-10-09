import { client } from "@/sanity/lib/client";
import { VideoSchemaTypes } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function getVideo() {
  const query = `
    *[_type == "video"][0] {
      reviewsText,
      nameVideoOne,
      descriptionForPersonInVideoOne,
      positionInCompanyOfFirstPerson,
      videoFileForFirstPerson {
        asset->{
          _id,
          url // Make sure 'url' is being fetched
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

  const data = await client.fetch(query);
  return data;
}

export const revalidate = 10;

export default async function VideoMembers() {
  const video: VideoSchemaTypes = await getVideo();
  return (
    <div className="lg:my-20 -mt-10 lg:-mt-0 px-5 lg:px-0">
      <div className="flex flex-col lg:flex-row justify-start items-center gap-5 lg:pl-40">
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
        className="ml-auto -mb-5 -translate-x-32 hidden lg:block"
      />

      <div className="flex flex-col lg:flex-row justify-center items-center gap-5">
        <div className="space-y-5">
          <div className="flex justify-center items-center">
            <Image
              src={"/Images/HomePage/103.svg"}
              alt="image"
              width={76.86}
              height={63.36}
              className="lg:-translate-x-20 pt-10 lg:pt-0 lg:-mt-24"
            />
          </div>
          <h2 className="font-bold text-h2M lg:text-[44px] text-center lg:text-left w-[384px]  pb-10 lg:pb-20 leading-tight">
            See what members are saying about Hugging Trade
          </h2>
          <div className=" flex justify-center items-end lg:flex-none lg:-ml-40 lg:-translate-y-8">
            <Image
              src={"/Images/HomePage/14.svg"}
              alt="image"
              width={55.77}
              height={62.05}
              className="-ml-10 -translate-y-8 lg:translate-0"
            />

            <Link href="/" className="block ">
              <div className="text-[22px] text-[#111827] text-center w-[280.64px] py-3   rounded-[20px] border-[2px] border-[#111827]">
                See All Reviews
              </div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 ">
          <div className="px-5 lg:px-0">
            <div>
              <video
                src={video.videoFileForFirstPerson.asset.url}
                aria-label="video"
                width={250}
                height={444}
                className="rounded-2xl w-full lg:w-[250px]"
                controls
                autoPlay
                loop
                muted
              />
            </div>

            <div className="text-left space-y-2 py-3">
              <p className="text-[14px] ">
                {video.positionInCompanyOfFirstPerson}
              </p>
              <div className="border-[#D1D5DB] border-b-[3px] w-[20px]"></div>
              <h3 className="font-bold text-[18px] ">
                {video.descriptionForPersonInVideoOne}
              </h3>
              <p className="text-[12px] ">{video.nameVideoOne}</p>
            </div>
          </div>

          <div className="px-5 lg:px-0">
            <div>
              <video
                src={video.videoFileForSecondPerson.asset.url}
                aria-label="video"
                width={250}
                height={444}
                className="rounded-2xl w-full lg:w-[250px]"
                controls
                autoPlay
                loop
                muted
              />
            </div>

            <div className="text-left space-y-2 py-3">
              <p className="text-[14px] ">
                {video.positionInCompanyOfSecondPerson}
              </p>
              <div className="border-[#D1D5DB] border-b-[3px] w-[20px]"></div>
              <h3 className="font-bold text-[18px] ">
                {video.descriptionForPersonInVideoTwo}
              </h3>
              <p className="text-[12px] ">{video.nameVideoTwo}</p>
            </div>
          </div>

          <div className="px-5 lg:px-0">
            <video
              src={video.videoFileForThirdPerson.asset.url}
              aria-label="video"
              width={250}
              height={444}
              className="rounded-2xl w-full lg:w-[250px]"
              controls
              autoPlay
              loop
              muted
            />

            <div className="text-left space-y-2 py-3">
              <p className="text-[14px] ">
                {video.positionInCompanyOfThirdPerson}
              </p>
              <div className="border-[#D1D5DB] border-b-[3px] w-[20px]"></div>
              <h3 className="font-bold text-[18px] ">
                {video.descriptionForPersonInVideoThree}
              </h3>
              <p className="text-[12px] ">{video.nameVideoThree}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
