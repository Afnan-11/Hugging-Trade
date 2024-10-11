import PageWrapper from "@/components/wrapper/page-wrapper";
import React from "react";
import SteppedProgress from "@/components/progress-steps";
const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <PageWrapper>
      <div className="my-[5rem]">{children}</div>
    </PageWrapper>
  );
};

export default layout;
