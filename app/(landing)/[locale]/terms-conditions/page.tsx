import React from "react";

const TermsConditions = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 lg:px-44 ">
      <div className="px-5 py-8">
        <h1  className="text-[40px] font-bold mb-4">Terms and Conditions</h1>

        <div className="mb-6">
          <h2 className="text-[30px] font-semibold mb-2">1. Introduction</h2>
          <p className="text-[20px]">
            Welcome to Hugging Trade. By accessing or using our platform, you
            agree to comply with and be bound by the following Terms and
            Conditions. Please read them carefully before using our services.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-[30px] font-semibold mb-2">
            2. No Control Over Client Funds
          </h2>
          <p className="text-[20px]">
            Hugging Trade provides a trading strategy that clients can connect
            to their brokerage accounts, but we never have control over your
            funds. You maintain full ownership and control of your brokerage
            account, and all trades are executed through the third-party
            brokerage provider of your choice.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-[30px] font-semibold mb-2">3. Investment Risk</h2>
          <p className="text-[20px]">
            By using Hugging Trade&apos;s services, you acknowledge that all
            investments carry risks. While our strategy aims to optimize
            returns, past performance is not a guarantee of future results. You
            are responsible for assessing your own risk tolerance and making
            investment decisions accordingly. Hugging Trade is not liable for
            any financial losses incurred while using our platform.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-[30px] font-semibold mb-2">4. Profit Share</h2>
          <p className="text-[20px]">
            At the end of each month, clients are required to transfer a
            percentage of their profits to Hugging Trade. This &quot;Profit
            Share Contribution&quot; is calculated based on the profits
            generated from trades executed using our strategy. Failure to
            transfer the agreed percentage within the specified timeframe may
            result in a temporary freeze of your account access until the
            payment is settled.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-[30px] font-semibold mb-2">
            5. Third-Party Brokerage Providers
          </h2>
          <p className="text-[20px]">
            Hugging Trade operates in conjunction with third-party brokerage
            services. While we provide a connection to our trading strategy, we
            are not responsible for any issues, delays, or losses caused by
            these third-party providers. It is your responsibility to select a
            reputable brokerage provider, and Hugging Trade cannot be held
            liable for their actions or service interruptions.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-[30px] font-semibold mb-2">
            6. Client Responsibility
          </h2>
          <p className="text-[20px]">
            It is the client&apos;s responsibility to conduct their own due
            diligence before signing up for Hugging Trade. You should carefully
            consider your financial objectives, risk tolerance, and the
            credibility of any third-party brokerage provider before linking
            your account to our platform.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-[30px] font-semibold mb-2">
            7. Limitation of Liability
          </h2>
          <p className="text-[20px]">
            Hugging Trade is not liable for any direct, indirect, incidental, or
            consequential damages arising from the use of our platform,
            including but not limited to losses from investments, delays in
            trade execution, or system outages. You agree to use our platform at
            your own risk.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-[30px] font-semibold mb-2">
            8. Account Suspension or Termination
          </h2>
          <p className="text-[20px]">
            Hugging Trade reserves the right to suspend or terminate your
            account at any time if you breach these Terms and Conditions or fail
            to comply with your obligations, such as the timely payment of the
            Profit Share Contribution. Account reactivation is subject to
            fulfilling any outstanding obligations.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-[30px] font-semibold mb-2">
            9. Changes to Terms
          </h2>
          <p className="text-[20px]">
            Hugging Trade may modify or update these Terms and Conditions at any
            time. Any changes will be communicated to you through email or by
            posting the updated terms on our website. Your continued use of the
            platform constitutes acceptance of the revised terms.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-[30px] font-semibold mb-2">
            10. Contact Information
          </h2>
          <p className="text-[20px]">
            If you have any questions or concerns about these Terms and
            Conditions, please contact us at{" "}
            <a
              href="mailto:support@huggingtrade.com"
              className="text-blue-500 underline"
            >
              support@huggingtrade.com
            </a>
            
          </p>
        </div>

        <p className="text-[20px]">
          By using Hugging Trade, you acknowledge that you have read,
          understood, and agreed to these Terms and Conditions.
        </p>
      </div>
    </div>
  );
};

export default TermsConditions;
