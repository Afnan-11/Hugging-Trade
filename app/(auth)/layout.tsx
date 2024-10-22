import PageWrapper from "@/components/wrapper/page-wrapper";
import React from "react";
const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <PageWrapper>
      <div className="flex min-h-[80vh] items-center justify-center py-[8rem]">{children}</div>
    </PageWrapper>
  );
};

export default layout;
