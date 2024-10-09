import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="lg:px-64 lg:py-20 text-center lg:text-left">
      <div className="px-5 py-8">
        <h1 className="text-[40px] font-bold mb-4">Privacy Policy</h1>

        <div className="mb-6">
          <h2 className="text-[30px] font-semibold mb-2">1. Introduction</h2>
          <p className="text-[20px]">
            At Hugging Trade, we value your privacy and are committed to
            protecting your personal information. This Privacy Policy outlines
            how we collect, use, and protect your data when you visit or use our
            platform.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-[30px] font-semibold mb-2">
            2. Control Over Funds
          </h2>
          <p className="text-[20px]">
            Hugging Trade does not have access to or control over your funds.
            You maintain complete control of your brokerage account at all
            times. Our platform provides a specialized trading strategy, which
            you can choose to connect to your brokerage account, but all trading
            activities are executed through your account with third-party
            brokers. We never directly manage, transfer, or hold your funds.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-[30px] font-semibold mb-2">3. Investment Risk</h2>
          <p className="text-[20px]">
            All investments carry inherent risks. By using Hugging Trade&apos;s
            platform, you acknowledge that investment decisions should be made
            based on your own risk tolerance. While we offer a specialized
            trading strategy designed to enhance returns, all trading involves
            risk, and past performance is not indicative of future results. You
            remain in full control of your investments, and we do not guarantee
            any profits or protection from losses.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-[30px] font-semibold mb-2">
            4. Third-Party Brokerage Providers
          </h2>
          <p className="text-[20px]">
            Hugging Trade works with third-party brokerage providers to
            facilitate your trading experience. We are not liable for any
            issues, delays, or losses that arise from using third-party
            brokerage services. It is essential that you conduct your own due
            diligence on the brokerage provider before opening an account and
            connecting to our platform.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-[30px] font-semibold mb-2">5. Due Diligence</h2>
          <p className="text-[20px]">
            Before signing up for Hugging Trade, we encourage you to carefully
            evaluate our services and the third-party brokerage providers. It is
            important to fully understand the risks involved with trading and to
            verify that our platform aligns with your investment goals and risk
            profile.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-[30px] font-semibold mb-2">6. Data Collection</h2>
          <p className="text-[20px]">
            We may collect and store personal data such as your name, email
            address, and account information when you register on our platform.
            This data is used solely to provide our services and improve user
            experience. We do not sell or share your personal information with
            third parties without your consent, except as required by law.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-[30px] font-semibold mb-2">
            7. Changes to This Policy
          </h2>
          <p className="text-[20px]">
            Hugging Trade reserves the right to update or modify this Privacy
            Policy at any time. Any changes will be communicated to you through
            email or by posting an updated version on our website. We encourage
            you to review this policy regularly to stay informed of any changes.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-[30px] font-semibold mb-2">8. Contact Us</h2>
          <p className="text-[20px]">
            If you have any questions or concerns about this Privacy Policy or
            your data, please contact us at{" "}
            <a
              href="mailto:support@huggingtrade.com"
              className="text-blue-500 underline"
            >
              support@huggingtrade.com
            </a>
            .
          </p>
        </div>

        <p className="text-[20px]">
          By using our platform, you agree to the terms of this Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
