import { client } from "@/sanity/lib/client";
import { FooterTypes } from "@/types";
import Link from "next/link";
import Image from "next/image";

async function getFooter(): Promise<FooterTypes | null> {
  try {
    const query = `
      *[_type == "footer"][0] {
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
  } catch (error) {
    console.error("Failed to fetch footer data:", error);
    return null;
  }
}

export default async function ContactUs() {
  const footer: FooterTypes | null = await getFooter();

  if (!footer) {
    return <p>Loading footer data...</p>; 
  }

  return (
    <div className="lg:-mt-[40px] lg:mb-20 mb-10">
      <Image
        src={"/Images/Contact Us/Vector (7).svg"}
        alt="img"
        width={1282}
        height={86}
        loading="eager"
        className="translate-x-10 translate-y-32 hidden lg:block w-[600px]"
      />
      <Image
        src={"/Images/Contact Us/1 (1).svg"}
        alt="img"
        width={69.45}
        height={72.31}
        loading="eager"
        className="lg:ml-auto -translate-x-10 translate-y-20 hidden lg:block"
      />
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
        <div className="lg:text-left text-center space-y-4">
          <h1 className="lg:text-[64px] text-[50px] font-black">
            Let’s connect!
          </h1>
          <div className="lg:text-left space-y-1">
            <h2 className="text-[24px] font-semibold">Hugging Trade</h2>
            <p className="16px lg:w-[400px]">
              {footer.address || "Address not available"}
            </p>
          </div>
          <div className="lg:text-left text-center space-y-5 lg:pt-[70px]">
            <h2 className="text-[24px] font-semibold">
              Communities in Telegram
            </h2>
            <div className="flex justify-center lg:justify-start items-center gap-3">
              <a className="text-[#2563eb] lg:hover:text-[#3b82f6]" href="#">
                English
              </a>
              <a className="text-[#2563eb] lg:hover:text-[#3b82f6]" href="#">
                Spanish
              </a>
              <a className="text-[#2563eb] lg:hover:text-[#3b82f6]" href="#">
                Russian
              </a>
            </div>
            <div>
              <h2 className="text-[24px] font-semibold">
                Social media and channels
              </h2>
              <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center lg:gap-40">
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2 lg:w-[300px] px-10 lg:px-0">
                  {footer?.links?.length ? (
                    footer.links.map((foot, index) => (
                      <div key={foot._id || index}>
                        <a
                          href={foot.url}
                          target="_blank"
                          className="text-[#2563eb] lg:hover:text-[#3b82f6]"
                        >
                          {foot.name}
                        </a>
                      </div>
                    ))
                  ) : (
                    <p>No social media links available</p>
                  )}
                </div>
                <Image
                  src={"/Images/Contact Us/Clip path group (1).svg"}
                  alt="img"
                  width={96.28}
                  height={96.28}
                  loading="eager"
                  className="animate-bounce mt-10 lg:mt-0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Customer Support and Partnership sections */}
        <div className="space-y-5 -mt-10 lg:-mt-0">
          {/* Customer Support */}
          <div className="bg-[#eff6ff] p-5 lg:p-0 rounded-[13px] lg:pl-20 lg:w-[609px] lg:h-[264px] flex flex-col lg:items-start items-center justify-center">
            <div className="space-y-5">
              <div className="space-y-2">
                <h2 className="text-[24px] font-semibold">Customer Support</h2>
                <p className="16px w-[345px]">
                  Our Support Heroes are available for you everyday and will
                  help in English, German and Russian.
                </p>
              </div>
              <div className="text-[24px] text-[#2563eb] font-semibold">
                <a href="">support@huggingtrade.com</a>
              </div>
            </div>
          </div>

          {/* Partnership */}
          <div className="bg-[#eff6ff] p-5 lg:p-0 rounded-[13px] lg:pl-20 lg:w-[609px] lg:h-[264px] flex flex-col lg:items-start items-center justify-center">
            <div className="space-y-5">
              <div className="space-y-2">
                <h2 className="text-[24px] font-semibold">Partnership</h2>
                <p className="16px w-[345px]">
                  We offer a competitive{" "}
                  <Link href="/affiliate" className="text-[#2563eb]">
                    affiliate program
                  </Link>{" "}
                  and always look for new cryptocurrency community members to
                  join.
                </p>
              </div>
              <div className="text-[24px] text-[#2563eb] font-semibold">
                <a href="">support@huggingtrade.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
