import React from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { FooterTypes } from "@/types";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

async function getFooter(): Promise<FooterTypes | null> {
  try {
    const query = `
    *[_type == "footer"][0] {
      address,
      textAboveIcons,
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

export default async function Footer() {
  const footer: FooterTypes | null = await getFooter();
  return (
    <div className="lg:pl-72 lg:space-y-20 lg:mb-20 px-5 lg:px-0">
      <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-start lg:items-start lg:gap-80">
        <div className="flex flex-col justify-center items-center lg:flex-none space-y-5">
          <div className="lg:mr-auto">
            <Link href={`/`}>
              <Image
                src={"/HuggingPrimaryWEBSITETextAndIcon (1).svg"}
                alt="img"
                width={250}
                height={23}
                loading="eager"
                priority
              />
            </Link>
          </div>
          <p className="lg:w-[215px] text-[16px] text-center lg:text-left">
            {footer?.address}
          </p>
        </div>

        <div className="space-y-5 lg:mt-0 mt-5">
          <h2 className="font-bold text-[20px] text-center lg:text-left">
            Follow Us
          </h2>
          <p className=" text-[16px] text-center lg:text-left">
            {footer?.textAboveIcons}
          </p>
          <div className="flex lg:justify-start justify-center items-center gap-5">
            {footer?.links.map((foot, index) => (
              <div key={foot._id || index} className="lg:w-[32px]">
                <a href={foot.url} target="blank">
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

      <div className="pt-10 flex flex-col lg:flex-row justify-start  lg:items-center gap-10 lg:gap-60 mb-20 lg:mb-0">
        <div className="space-y-2">
          <h3 className="text-[20px] font-bold">Resources</h3>
          <p>Blog</p>
          <p>Knowledge base</p>
          <p>Exchanges</p>
          <p>Price converter</p>
          <p>Feedback</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-[20px] font-bold">Company</h3>
          <p>Blog</p>
          <p>About us</p>
          <p>Affiliate program</p>
          <p>Affiliate competition</p>
          <div>
            <Link href={"/contact-us"}>Contact info</Link>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-[20px] font-bold">Legal</h3>
          <div className="flex flex-col space-y-2">
            <Link href={"/terms-conditions"}>Terms & Conditions</Link>
            <Link href={"/privacy-policy"}>Privacy policy</Link>
          </div>
          <p>Refund policy</p>
          <p>Cookie policy</p>
          <p>Affiliate policy</p>
        </div>
      </div>
    </div>
  );
}
