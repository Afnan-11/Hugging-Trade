"use client";

import {client} from "@/sanity/lib/client";
import {VideoSchemaTypes} from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {useTranslations} from "next-intl";

async function fetchVideoData(): Promise<VideoSchemaTypes | null> {
  try {
    const query = `
      *[_type == "video"][0] {
  reviewsText,
  reviewsText_de,
  reviewsText_es,
  reviewsText_fr,
  reviewsText_it,
  reviewsText_pt,

  nameVideoOne,
  descriptionForPersonInVideoOne,
  descriptionForPersonInVideoOne_de,
  descriptionForPersonInVideoOne_es,
  descriptionForPersonInVideoOne_fr,
  descriptionForPersonInVideoOne_it,
  descriptionForPersonInVideoOne_pt,
  positionInCompanyOfFirstPerson,
  positionInCompanyOfFirstPerson_de,
  positionInCompanyOfFirstPerson_es,
  positionInCompanyOfFirstPerson_fr,
  positionInCompanyOfFirstPerson_it,
  positionInCompanyOfFirstPerson_pt,
  videoFileForFirstPerson {
    asset->{
      _id,
      url
    }
  },

  nameVideoTwo,
  descriptionForPersonInVideoTwo,
  descriptionForPersonInVideoTwo_de,
  descriptionForPersonInVideoTwo_es,
  descriptionForPersonInVideoTwo_fr,
  descriptionForPersonInVideoTwo_it,
  descriptionForPersonInVideoTwo_pt,
  positionInCompanyOfSecondPerson,
  positionInCompanyOfSecondPerson_de,
  positionInCompanyOfSecondPerson_es,
  positionInCompanyOfSecondPerson_fr,
  positionInCompanyOfSecondPerson_it,
  positionInCompanyOfSecondPerson_pt,
  videoFileForSecondPerson {
    asset->{
      _id,
      url
    }
  },

  nameVideoThree,
  descriptionForPersonInVideoThree,
  descriptionForPersonInVideoThree_de,
  descriptionForPersonInVideoThree_es,
  descriptionForPersonInVideoThree_fr,
  descriptionForPersonInVideoThree_it,
  descriptionForPersonInVideoThree_pt,
  positionInCompanyOfThirdPerson,
  positionInCompanyOfThirdPerson_de,
  positionInCompanyOfThirdPerson_es,
  positionInCompanyOfThirdPerson_fr,
  positionInCompanyOfThirdPerson_it,
  positionInCompanyOfThirdPerson_pt,
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

export default function VideoMembers({locale}: {locale: string}) {
  const [video, setVideo] = useState<VideoSchemaTypes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const t = useTranslations("HomePage");

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
        <p className="text-[20px]">
          {/* {video.reviewsText} */}
          {locale === "en"
                  ? video.reviewsText
                  : locale === "de"
                    ? video.reviewsText_de
                    : locale === "es"
                      ? video.reviewsText_es
                      : locale === "fr"
                        ? video.reviewsText_fr
                        : locale === "it"
                          ? video.reviewsText_it
                          : video.reviewsText_pt}
          </p>
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
          {t("videoMembers")}
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
              href="/sign-up"
              className="block"
            >
              <div className="w-[330px] rounded-[20px] border-[2px] border-[#111827] py-3 text-center text-[22px] text-[#111827] hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-white">
              {t("startFreeTrial")}
              </div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="px-5 lg:px-0 lg:w-[250px]">
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
              <p className="text-[14px]">
                {/* {video.positionInCompanyOfFirstPerson} */}
                {locale === "en"
                  ? video.positionInCompanyOfFirstPerson
                  : locale === "de"
                    ? video.positionInCompanyOfFirstPerson_de
                    : locale === "es"
                      ? video.positionInCompanyOfFirstPerson_es
                      : locale === "fr"
                        ? video.positionInCompanyOfFirstPerson_fr
                        : locale === "it"
                          ? video.positionInCompanyOfFirstPerson_it
                          : video.positionInCompanyOfFirstPerson_pt}

                </p>
              <div className="w-[20px] border-b-[3px] border-[#D1D5DB]"></div>
              <h3 className="text-[18px] font-bold">
                {/* {video.descriptionForPersonInVideoOne} */}
                {locale === "en"
                  ? video.descriptionForPersonInVideoOne
                  : locale === "de"
                    ? video.descriptionForPersonInVideoOne_de
                    : locale === "es"
                      ? video.descriptionForPersonInVideoOne_es
                      : locale === "fr"
                        ? video.descriptionForPersonInVideoOne_fr
                        : locale === "it"
                          ? video.descriptionForPersonInVideoOne_it
                          : video.descriptionForPersonInVideoOne_pt}
                </h3>
              <p className="text-[12px]">
                {video.nameVideoOne}
                </p>
            </div>
          </div>

          <div className="px-5 lg:px-0 lg:w-[250px]">
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
              <p className="text-[14px]">
                {/* {video.positionInCompanyOfSecondPerson} */}
                {locale === "en"
                  ? video.positionInCompanyOfSecondPerson
                  : locale === "de"
                    ? video.positionInCompanyOfSecondPerson_de
                    : locale === "es"
                      ? video.positionInCompanyOfSecondPerson_es
                      : locale === "fr"
                        ? video.positionInCompanyOfSecondPerson_fr
                        : locale === "it"
                          ? video.positionInCompanyOfSecondPerson_it
                          : video.positionInCompanyOfSecondPerson_pt}
                </p>
              <div className="w-[20px] border-b-[3px] border-[#D1D5DB]"></div>
              <h3 className="text-[18px] font-bold">
                {/* {video.descriptionForPersonInVideoTwo} */}
                {locale === "en"
                  ? video.descriptionForPersonInVideoTwo
                  : locale === "de"
                    ? video.descriptionForPersonInVideoTwo_de
                    : locale === "es"
                      ? video.descriptionForPersonInVideoTwo_es
                      : locale === "fr"
                        ? video.descriptionForPersonInVideoTwo_fr
                        : locale === "it"
                          ? video.descriptionForPersonInVideoTwo_it
                          : video.descriptionForPersonInVideoTwo_pt}
                </h3>
              <p className="text-[12px]">{video.nameVideoTwo}</p>
            </div>
          </div>

          <div className="px-5 lg:px-0 lg:w-[250px]">
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
              <p className="text-[14px]">
                {/* {video.positionInCompanyOfThirdPerson} */}
                {locale === "en"
                  ? video.positionInCompanyOfThirdPerson
                  : locale === "de"
                    ? video.positionInCompanyOfThirdPerson_de
                    : locale === "es"
                      ? video.positionInCompanyOfThirdPerson_es
                      : locale === "fr"
                        ? video.positionInCompanyOfThirdPerson_fr
                        : locale === "it"
                          ? video.positionInCompanyOfThirdPerson_it
                          : video.positionInCompanyOfThirdPerson_pt}
                </p>
              <div className="w-[20px] border-b-[3px] border-[#D1D5DB]"></div>
              <h3 className="text-[18px] font-bold">
                {/* {video.descriptionForPersonInVideoThree} */}
                {locale === "en"
                  ? video.descriptionForPersonInVideoThree
                  : locale === "de"
                    ? video.descriptionForPersonInVideoThree_de
                    : locale === "es"
                      ? video.descriptionForPersonInVideoThree_es
                      : locale === "fr"
                        ? video.descriptionForPersonInVideoThree_fr
                        : locale === "it"
                          ? video.descriptionForPersonInVideoThree_it
                          : video.descriptionForPersonInVideoThree_pt}
                </h3>
              <p className="text-[12px]">{video.nameVideoThree}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
