import React from "react";
import Image from "next/image";
import {client} from "@/sanity/lib/client";
import {FooterTypes} from "@/types";
import {urlFor} from "@/sanity/lib/image";
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
    <div className="px-5 lg:mb-20 lg:space-y-20 lg:px-0 lg:pl-72">
      <div className="flex flex-col items-center justify-center lg:flex-row lg:items-start lg:justify-start lg:gap-80">
        <div className="flex flex-col items-center justify-center space-y-5 lg:flex-none">
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
          <p className="text-center text-[16px] lg:w-[215px] lg:text-left">{footer?.address}</p>
        </div>

        <div className="mt-5 space-y-5 lg:mt-0">
          <h2 className="text-center text-[20px] font-bold lg:text-left">Follow Us</h2>
          <p className="text-center text-[16px] lg:text-left">{footer?.textAboveIcons}</p>
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
          <h3 className="text-[20px] font-bold">Resources</h3>
          <div className="flex flex-col space-y-2">
            <a
              href="https://help.huggingtrade.com "
              className="hover:text-[#2563EB]"
              target="_blank"
            >
              Help Center
            </a>
            <Link
              href={"/investment-calculator"}
              className="hover:text-[#2563EB]"
            >
              Investment Calculator
            </Link>
          </div>
        </div>
        <div className="space-y-2 lg:h-40">
          <h3 className="text-[20px] font-bold">Company</h3>

          <div className="flex flex-col space-y-2">
            <Link
              href={"/affiliate"}
              className="hover:text-[#2563EB]"
            >
              Affiliate program
            </Link>
            <Link
              href={"/contact-us"}
              className="hover:text-[#2563EB]"
            >
              Contact info
            </Link>
          </div>
        </div>
        <div className="space-y-2 lg:h-40">
          <h3 className="text-[20px] font-bold">Legal</h3>
          <div className="flex flex-col space-y-2">
            <Link
              href={"/terms-conditions"}
              className="hover:text-[#2563EB]"
            >
              Terms & Conditions
            </Link>
            <Link
              href={"/privacy-policy"}
              className="hover:text-[#2563EB]"
            >
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
