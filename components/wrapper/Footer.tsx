import React from "react";
import Image from "next/image";
import {client} from "@/sanity/lib/client";
import {FooterTypes} from "@/types";
import {urlFor} from "@/sanity/lib/image";
import Link from "next/link";
import {getTranslations} from "next-intl/server";

async function getFooter(): Promise<FooterTypes | null> {
  try {
    const query = `
    *[_type == "footer"][0] {
      address,
      textAboveIcons,
      textAboveIcons_de,
      textAboveIcons_es,
      textAboveIcons_fr,
      textAboveIcons_it,
      textAboveIcons_pt,
      _type,
      links[] {
        url,
        socialMediaImage{
          asset->{
            _id,
            url
          }
        }
      }
    }
  `;
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Failed to fetch footer data:", error);
    return null;
  }
}

export const revalidate = 10;

export default async function Footer({locale="en"}: {locale: string}) {
  const footer: FooterTypes | null = await getFooter();
  const t = await getTranslations("Footer");
  
  return (
    <div className="px-5 lg:mb-20 lg:space-y-20 lg:px-0 lg:pl-72">
      <div className="flex flex-col items-center justify-center lg:flex-row lg:items-start lg:justify-start lg:gap-80">
        <div className="flex flex-col items-center justify-center space-y-5 lg:flex-none">
          <div className="lg:mr-auto">
            <Link href={`/`}>
              <Image
                src={"/logo.svg"}
                alt="img"
                width={250}
                height={23}
                loading="eager"
                priority
              />
            </Link>
          </div>
          <p className="text-center text-[16px] lg:w-[215px] lg:text-left">{footer?.address}</p>
        </div>

        <div className="mt-5 space-y-5 lg:mt-0">
          <h2 className="text-center text-[20px] font-bold lg:text-left">{t("follow")}</h2>
          <p className="text-center text-[16px] lg:text-left">
            {/* {footer?.textAboveIcons} */}
            {locale === "en"
                  ? footer?.textAboveIcons
                  : locale === "de"
                    ? footer?.textAboveIcons_de
                    : locale === "es"
                      ? footer?.textAboveIcons_es
                      : locale === "fr"
                        ? footer?.textAboveIcons_fr
                        : locale === "it"
                          ? footer?.textAboveIcons_it
                          : footer?.textAboveIcons_pt}
            
            </p>
          <div className="flex items-center justify-center gap-5 lg:justify-start">
            {footer?.links.map((foot, index) => (
              <div
                key={foot._id || index}
                className="lg:w-[32px]"
              >
                <a
                  href={foot.url}
                  target="blank"
                >
                  <Image
                    src={urlFor(foot.socialMediaImage).url()}
                    alt="img"
                    width={32}
                    height={32}
                    loading="eager"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-20 flex flex-col justify-start gap-10 pt-10 lg:mb-0 lg:flex-row lg:items-center lg:gap-60">
        <div className="space-y-2 lg:h-40">
          <h3 className="text-[20px] font-bold">{t("resources")}</h3>
          <div className="flex flex-col space-y-2">
            <a
              href="https://help.huggingtrade.com "
              className="hover:text-[#2563EB]"
              target="_blank"
            >
              {t("helpCenter")}
            </a>
            <Link
              href={"/investment-calculator"}
              className="hover:text-[#2563EB]"
            >
              {t("investmentCalculator")}
            </Link>
          </div>
        </div>
        <div className="space-y-2 lg:h-40">
          <h3 className="text-[20px] font-bold">{t("company")}</h3>

          <div className="flex flex-col space-y-2">
            <Link
              href={"/affiliate"}
              className="hover:text-[#2563EB]"
            >
              {t("affiliateProgram")}
            </Link>
            <Link
              href={"/contact-us"}
              className="hover:text-[#2563EB]"
            >
              {t("contactInfo")}
            </Link>
          </div>
        </div>
        <div className="space-y-2 lg:h-40">
          <h3 className="text-[20px] font-bold">{t("legal")}</h3>
          <div className="flex flex-col space-y-2">
            <Link
              href={"/terms-conditions"}
              className="hover:text-[#2563EB]"
            >
              {t("terms")}
            </Link>
            <Link
              href={"/privacy-policy"}
              className="hover:text-[#2563EB]"
            >
              {t("privacy")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
