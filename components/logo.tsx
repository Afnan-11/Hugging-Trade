import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Logo = ({className}: {className?: string}) => {
  return (
    <Link
      href={`/`}
      className={className}
    >
      <Image
        src={"/HuggingPrimaryWEBSITETextAndIcon (1).svg"}
        alt="Hugging Trade"
        width={200}
        height={23}
        loading="eager"
        priority
        className="dark:hidden"
      />

      <Image
        src={"/HuggingwhiteTextAndIcon.png"}
        alt="Hugging Trade"
        width={200}
        height={23}
        loading="eager"
        priority
        className="hidden dark:block"
      />
    </Link>
  );
};
