import React from "react";
import Image from "next/image";
import {client} from "@/sanity/lib/client";
import {FooterTypes} from "@/types";
import Link from "next/link";
import {getTranslations} from "next-intl/server";

async function getFooter() {
  const query = `
    *[_type == "footer"] [0] {
      address,
      _type,
      links[] {
        name,
        url,
        
      }
    }
  `;

  const data = await client.fetch(query);
  return data;
}

export const revalidate = 10;

export default async function ContactUs() {
  const footer: FooterTypes = await getFooter();
  const t = await getTranslations("ContactUsPage");
  return (
    <div className="pt-7 md:pt-0 mb-10 overflow-hidden lg:-mt-[40px] lg:mb-20">
      <Image
        src={"/Images/Contact Us/Vector (7).svg"}
        alt="img"
        width={1282}
        height={86}
        loading="eager"
        className="hidden w-[600px] translate-x-10 translate-y-32 lg:block"
      />
      <Image
        src={"/Images/Contact Us/1 (1).svg"}
        alt="img"
        width={69.45}
        height={72.31}
        loading="eager"
        className="hidden -translate-x-10 translate-y-20 lg:ml-auto lg:block"
      />
      <div className="flex flex-col items-center justify-center gap-10 lg:flex-row">
        <div className="space-y-4 text-center lg:text-left">
          <h1 className="text-[30px] md:text-[40px] font-black lg:text-[64px]">{t("letConnect")}</h1>
          <div className="space-y-1 px-5 lg:px-0 lg:text-left">
            <h2 className="text-[24px] font-semibold">{t("logo")}</h2>
            <p className="16px lg:w-[400px]">{footer.address}</p>
          </div>
          <div className="space-y-5 text-center lg:pt-[70px] lg:text-left">
            <div className="">
              <h2 className="text-[24px] font-semibold">{t("socialMedia")}</h2>
              <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-start lg:gap-40">
                <div className="flex flex-wrap items-center justify-center gap-2 px-10 lg:w-[300px] lg:justify-start lg:px-0">
                  {footer.links.map((foot, index) => (
                    <div
                      key={foot._id || index}
                      className=" "
                    >
                      <a
                        href={foot.url}
                        target="blank"
                        className="text-[#2563eb] lg:hover:text-[#3b82f6]"
                      >
                        {foot.name}
                      </a>
                    </div>
                  ))}
                </div>
                <Image
                  src={"/Images/Contact Us/Clip path group (1).svg"}
                  alt="img"
                  width={96.28}
                  height={96.28}
                  loading="eager"
                  className="mt-10 animate-bounce lg:mt-0"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="-mt-10 space-y-5 lg:-mt-0">
          <div className="flex flex-col items-center justify-center rounded-[13px] bg-[#eff6ff] p-5 lg:h-[264px] lg:w-[609px] lg:items-start lg:p-0 lg:pl-20">
            <div className="space-y-5 text-center lg:text-left">
              <div className="space-y-2">
                <h2 className="text-[24px] font-semibold">{t("customerSupport")}</h2>
                <p className="16px w-[345px] px-5 lg:px-0">{t("customerSupportText")}</p>
              </div>
              <div className="font-semibold text-[#2563eb] sm:text-[20px] md:text-[24px]">
                <a href="mailto:support@huggingtrade.com">support@huggingtrade.com</a>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center rounded-[13px] bg-[#eff6ff] p-5 lg:h-[264px] lg:w-[609px] lg:items-start lg:p-0 lg:pl-20">
            <div className="space-y-5 text-center lg:text-left">
              <div className="space-y-2">
                <h2 className="text-[24px] font-semibold">{t("partnership")}</h2>
                <p className="16px w-[345px] px-5 lg:px-0">
                  {t("weOffer")}{" "}
                  <Link
                    href="/affiliate"
                    className="text-[#2563eb]"
                  >
                    {t("affiliate")}
                  </Link>{" "}
                  {t("partnershipText")}
                </p>
              </div>
              <div className="font-semibold text-[#2563eb] sm:text-[20px] md:text-[24px]">
                <a href="mailto:support@huggingtrade.com">support@huggingtrade.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
