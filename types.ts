export type HomeTypes = {
  heroTitle: string;
  heroText: string;
  heroTextUnderButton: string;
  sectionThreeTitle: string;
  sectionThreeText: string;
  sectionThreeStarsNumber: number;
  sectionThreeTextUnderStarsNumber: string;
  sectionThreeUsersNumber: number;
  sectionThreeTextUnderUsersNumber: string;
  sectionThreeTimeNumber: number;
  sectionThreeTextUnderTimeNumber: string;
  sliderTitle: string;
  sliderText: string;
  sliderAverageMonthlyIncome: string;
  sectionSixTitle: string;
  sectionSevenTitle: string;
  sectionSevenSubTitleOne: string;
  sectionSevenText: string;
  sectionFourteenTitle: string;
  reviewsText: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
};

export type FaqHomeTypes = {
  _id: string;
  question: string;
  answer: string;
};

export type PricingTypes = {
  pricingHeroTitle: string;
  pricingHeroText: string;
  pricingSectionTwoTitle: string;
  pricingSectionTwoText: string;
  priceMonth: number;
  discountMonth: number;
  discountYear: number;
  showYearlyDiscount: boolean;
  pricingLeftText: string;
  leftListItems: Array<{ _id: string; text: string }>;
  leftSmallTextUnderButtonOne: string;
  leftSmallTextUnderButtonTwo: string;
  pricingRightTitle: string;
  rightListItems: Array<{ _id: string; text: string }>;
  buttonRight: string;
  textUnderRightButton: string;
  sectionFourTitleOne: string;
  sectionFourTitleTwo: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
};

export type FaqPricingTypes = {
  _id: string;
  question: string;
  answer: string;
};

export type AffiliateTypes = {
  affiliateHeroTitle: string;
  affiliateHeroText: string;
  affiliateReviewTitle: string;
  reviewListItems: Array<{
    _id: string;
    name: string;
    position: string;
    text: string;
    authorImage: {
      _type: "image";
      asset: {
        _ref: string;
        _type: "reference";
      };
    };
  }>;
  averageUSD: number;
  percent: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
};

export type FaqAffiliateTypes = {
  _id: string;
  question: string;
  answer: string;
};

export type VideoSchemaTypes = {
  reviewsText: string;
  nameVideoOne: string;
  descriptionForPersonInVideoOne: string;
  positionInCompanyOfFirstPerson: string;
  videoFileForFirstPerson: {
    asset: {
      _id: string;
      url: string;
    };
  };
  nameVideoTwo: string;
  descriptionForPersonInVideoTwo: string;
  positionInCompanyOfSecondPerson: string;
  videoFileForSecondPerson: {
    asset: {
      _id: string;
      url: string;
    };
  };
  nameVideoThree: string;
  descriptionForPersonInVideoThree: string;
  positionInCompanyOfThirdPerson: string;
  videoFileForThirdPerson: {
    asset: {
      _id: string;
      url: string;
    };
  };
};

export type FooterTypes = {
  address: string;
  _id: string;
  _type: "socialMediaLinks";
  links: {
    _id: string;
    name: string;
    url: string;
    socialMediaImage: {
      _type: "image";
      asset: {
        _ref: string;
        _type: "reference";
      };
    };
  }[];
  textAboveIcons:string;
};
