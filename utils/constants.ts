import {HomeIcon, Settings, Calculator, CreditCard, Users} from "lucide-react";

export const TITLE_TAILWIND_CLASS = "text-2xl sm:text-2xl md:text-3xl lg:text-4xl";
export const BROKER_OPTIONS = [
  {
    value: "ic_markets",
    name: "IC Markets",
    logo: "/icons/ic-markets.svg",
    rating: 4.5,
    reviews: 1000,
    countries: "United Kingdom, Europe, Asia, Africa, Oceania, Americas",
    url: "https://www.icmarkets.com/global/en/open-trading-account/live",
    benefits: [
      "Simple and easy to use platform",
      "Highly regulated (ASIC, CySEC, FSA)",
      "Fast deposits and withdrawals",
      "Competitive spreads from 0.0 pips",
      "24/7 customer support",
    ],
    trustFactors: ["True ECN broker", "Segregated client funds", "Negative balance protection"],
  },
  {
    value: "oanda",
    name: "Oanda",
    logo: "/icons/oanda.svg",
    rating: 4.5,
    reviews: 1000,
    countries: "USA, Canada",
    url: "https://www.oanda.com/apply/",
    benefits: [
      "Award-winning fxTrade platform",
      "Regulated by major financial authorities",
      "Transparent pricing",
      "Advanced charting and analysis tools",
    ],
    trustFactors: ["20+ years of experience", "Fully regulated in USA and Canada", "Bank-grade security measures"],
  },
];

export const MetaApiUrl = "https://mt-provisioning-api-v1.agiliumtrade.agiliumtrade.ai";
export const MetaApiStatsUrl = "https://metastats-api-v1.new-york.agiliumtrade.ai";
export const CopyFactoryUrl = "https://copyfactory-api-v1.new-york.agiliumtrade.ai";
export const STRATEGY_ID = "B0fG";

export const plans = [
  {
    title: "Basic",
    monthlyPrice: 10,
    yearlyPrice: 100,
    description: "Essential features you need to get started",
    features: ["Example Feature Number 1", "Example Feature Number 2", "Example Feature Number 3"],
    priceIdMonthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY,
    priceIdYearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY,
    actionLabel: "Get Started",
  },
];

export const N_OF_DAYS_BEFORE_PAYMENT_REQUEST = 30;
export const N_OF_DAYS_BEFORE_PAYMENT_REQUEST_OVERDUE = 5;
export const N_OF_DAYS_BEFORE_PAYMENT_REQUEST_FROZEN = 10;
export const EXTRA_FEES_PERCENTAGE = 0.05;
export const PROFIT_SHARE_PERCENTAGE = 0.35;

type Route = {
  href: string;
  icon: React.ElementType;
  label: string;
};

export const userRoutes: Route[] = [
  {href: "/dashboard", icon: HomeIcon, label: "Home"},
  {href: "/dashboard/profit-calculator", icon: Calculator, label: "Profit Calculator"},
  {href: "/dashboard/payment/profit-share", icon: CreditCard, label: "Profit Share Payment"},
  {href: "/dashboard/affiliate", icon: Users, label: "Affiliate Program"},
  // {href: "/dashboard/subscription", icon: Settings, label: "Subscription"},
  {href: "/dashboard/settings", icon: Settings, label: "Settings"},
];

export const adminRoutes: Route[] = [
  {href: "/admin", icon: HomeIcon, label: "Admin Home"},
  {href: "/admin/users", icon: Users, label: "Users"},
  {href: "/admin/invoices", icon: CreditCard, label: "Invoices"},
  {href: "/admin/payment-requests", icon: CreditCard, label: "Payment Requests"},
];
