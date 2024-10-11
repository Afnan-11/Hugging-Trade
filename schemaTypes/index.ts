import { type SchemaTypeDefinition } from "sanity";
import { home } from "../schemas/home";
import { faqHome } from "../schemas/faqHome";
import { pricing } from "../schemas/pricing";
import { faqPricing } from "../schemas/faqPricing";
import { affiliate } from "../schemas/affiliate";
import { faqAffiliate } from "../schemas/faqAffiliate";
import { video } from "../schemas/video";
import { footer } from "../schemas/footer";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    home,
    faqHome,
    pricing,
    faqPricing,
    affiliate,
    faqAffiliate,
    video,
    footer,
  ],
};
