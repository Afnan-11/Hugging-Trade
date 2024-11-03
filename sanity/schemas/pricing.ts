import {Rule} from "sanity";

export const pricing = {
  name: "pricing",
  title: "PRICING PAGE",
  type: "document",
  fields: [
    {
      name: "pricingHeroTitle",
      title: "H1 Hero Title",
      description: "H1 Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "pricingHeroTitle_de",
      title: "H1 Hero Title (German)",
      description: "H1 Title in German",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "pricingHeroTitle_es",
      title: "H1 Hero Title (Spanish)",
      description: "H1 Title in Spanish",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "pricingHeroTitle_fr",
      title: "H1 Hero Title (French)",
      description: "H1 Title in French",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "pricingHeroTitle_it",
      title: "H1 Hero Title (Italian)",
      description: "H1 Title in Italian",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "pricingHeroTitle_pt",
      title: "H1 Hero Title (Portuguese)",
      description: "H1 Title in Portuguese",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "pricingHeroText",
      title: "Hero Text",
      description: "Main text for the hero section.",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "pricingHeroText_de",
      title: "Hero Text (German)",
      description: "Main text for the hero section in German.",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "pricingHeroText_es",
      title: "Hero Text (Spanish)",
      description: "Main text for the hero section in Spanish.",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "pricingHeroText_fr",
      title: "Hero Text (French)",
      description: "Main text for the hero section in French.",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "pricingHeroText_it",
      title: "Hero Text (Italian)",
      description: "Main text for the hero section in Italian.",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "pricingHeroText_pt",
      title: "Hero Text (Portuguese)",
      description: "Main text for the hero section in Portuguese.",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "pricingSectionTwoTitle",
      title: "H2 Section Two Title",
      description: "H2 Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "pricingSectionTwoTitle_de",
      title: "H2 Section Two Title (German)",
      description: "H2 Title in German",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "pricingSectionTwoTitle_es",
      title: "H2 Section Two Title (Spanish)",
      description: "H2 Title in Spanish",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "pricingSectionTwoTitle_fr",
      title: "H2 Section Two Title (French)",
      description: "H2 Title in French",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "pricingSectionTwoTitle_it",
      title: "H2 Section Two Title (Italian)",
      description: "H2 Title in Italian",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "pricingSectionTwoTitle_pt",
      title: "H2 Section Two Title (Portuguese)",
      description: "H2 Title in Portuguese",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "pricingSectionTwoText",
      title: "Section Two Text",
      description: "Text for the second section.",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "pricingSectionTwoText_de",
      title: "Section Two Text (German)",
      description: "Text for the second section in German.",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "pricingSectionTwoText_es",
      title: "Section Two Text (Spanish)",
      description: "Text for the second section in Spanish.",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "pricingSectionTwoText_fr",
      title: "Section Two Text (French)",
      description: "Text for the second section in French.",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "pricingSectionTwoText_it",
      title: "Section Two Text (Italian)",
      description: "Text for the second section in Italian.",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "pricingSectionTwoText_pt",
      title: "Section Two Text (Portuguese)",
      description: "Text for the second section in Portuguese.",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "priceMonth",
      title: "Price Month",
      description: "Price Month",
      type: "number",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "discountMonth",
      title: "Discount Month",
      description: "Discount Month",
      type: "number",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "discountYear",
      title: "Discount Year",
      description: "Discount Year",
      type: "number",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "showYearlyDiscount",
      title: "Show Yearly Discount on Count Down Timer",
      type: "boolean",
      description: "Toggle to show the yearly discount. If unchecked, the monthly discount will be shown.",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "pricingLeftText",
      title: "Pricing Left Text",
      description: "Text for the second section.",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "pricingLeftText_de",
      title: "Pricing Left Text (German)",
      description: "Text for the second section in German.",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "pricingLeftText_es",
      title: "Pricing Left Text (Spanish)",
      description: "Text for the second section in Spanish.",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "pricingLeftText_fr",
      title: "Pricing Left Text (French)",
      description: "Text for the second section in French.",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "pricingLeftText_it",
      title: "Pricing Left Text (Italian)",
      description: "Text for the second section in Italian.",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "pricingLeftText_pt",
      title: "Pricing Left Text (Portuguese)",
      description: "Text for the second section in Portuguese.",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "leftListItems",
      title: "Left List Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "text_en",
              title: "Text (English)",
              type: "string",
              validation: (Rule: Rule) => Rule.required().error("List item text in English is required"),
            },
            {
              name: "text_de",
              title: "Text (German)",
              type: "string",
              validation: (Rule: Rule) => Rule.required().error("List item text in German is required"),
            },
            {
              name: "text_es",
              title: "Text (Spanish)",
              type: "string",
              validation: (Rule: Rule) => Rule.required().error("List item text in Spanish is required"),
            },
            {
              name: "text_fr",
              title: "Text (French)",
              type: "string",
              validation: (Rule: Rule) => Rule.required().error("List item text in French is required"),
            },
            {
              name: "text_it",
              title: "Text (Italian)",
              type: "string",
              validation: (Rule: Rule) => Rule.required().error("List item text in Italian is required"),
            },
            {
              name: "text_pt",
              title: "Text (Portuguese)",
              type: "string",
              validation: (Rule: Rule) => Rule.required().error("List item text in Portuguese is required"),
            },
          ],
        },
      ],
      validation: (Rule: Rule) => Rule.required().min(1).error("At least one list item is required"),
    },

    {
      name: "leftSmallTextUnderButtonOne",
      title: "Left Small Text Under Button One (English)",
      description: "Small Text Under Button One in English",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "leftSmallTextUnderButtonOne_de",
      title: "Left Small Text Under Button One (German)",
      description: "Small Text Under Button One in German",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "leftSmallTextUnderButtonOne_es",
      title: "Left Small Text Under Button One (Spanish)",
      description: "Small Text Under Button One in Spanish",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "leftSmallTextUnderButtonOne_fr",
      title: "Left Small Text Under Button One (French)",
      description: "Small Text Under Button One in French",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "leftSmallTextUnderButtonOne_it",
      title: "Left Small Text Under Button One (Italian)",
      description: "Small Text Under Button One in Italian",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "leftSmallTextUnderButtonOne_pt",
      title: "Left Small Text Under Button One (Portuguese)",
      description: "Small Text Under Button One in Portuguese",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "leftSmallTextUnderButtonTwo",
      title: "Left Small Text Under Button Two (English)",
      description: "Small Text Under Button Two in English",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "leftSmallTextUnderButtonTwo_de",
      title: "Left Small Text Under Button Two (German)",
      description: "Small Text Under Button Two in German",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "leftSmallTextUnderButtonTwo_es",
      title: "Left Small Text Under Button Two (Spanish)",
      description: "Small Text Under Button Two in Spanish",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "leftSmallTextUnderButtonTwo_fr",
      title: "Left Small Text Under Button Two (French)",
      description: "Small Text Under Button Two in French",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "leftSmallTextUnderButtonTwo_it",
      title: "Left Small Text Under Button Two (Italian)",
      description: "Small Text Under Button Two in Italian",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "leftSmallTextUnderButtonTwo_pt",
      title: "Left Small Text Under Button Two (Portuguese)",
      description: "Small Text Under Button Two in Portuguese",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "pricingRightTitle",
      title: "Pricing Right Title (English)",
      description: "H3 Title in English",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "pricingRightTitle_de",
      title: "Pricing Right Title (German)",
      description: "H3 Title in German",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "pricingRightTitle_es",
      title: "Pricing Right Title (Spanish)",
      description: "H3 Title in Spanish",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "pricingRightTitle_fr",
      title: "Pricing Right Title (French)",
      description: "H3 Title in French",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "pricingRightTitle_it",
      title: "Pricing Right Title (Italian)",
      description: "H3 Title in Italian",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "pricingRightTitle_pt",
      title: "Pricing Right Title (Portuguese)",
      description: "H3 Title in Portuguese",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "rightListItems",
      title: "Right List Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "text_en",
              title: "Text (English)",
              type: "string",
              validation: (Rule: Rule) => Rule.required().error("List item text in English is required"),
            },
            {
              name: "text_de",
              title: "Text (German)",
              type: "string",
              validation: (Rule: Rule) => Rule.required().error("List item text in German is required"),
            },
            {
              name: "text_es",
              title: "Text (Spanish)",
              type: "string",
              validation: (Rule: Rule) => Rule.required().error("List item text in Spanish is required"),
            },
            {
              name: "text_fr",
              title: "Text (French)",
              type: "string",
              validation: (Rule: Rule) => Rule.required().error("List item text in French is required"),
            },
            {
              name: "text_it",
              title: "Text (Italian)",
              type: "string",
              validation: (Rule: Rule) => Rule.required().error("List item text in Italian is required"),
            },
            {
              name: "text_pt",
              title: "Text (Portuguese)",
              type: "string",
              validation: (Rule: Rule) => Rule.required().error("List item text in Portuguese is required"),
            },
          ],
        },
      ],
      validation: (Rule: Rule) => Rule.required().min(1).error("At least one list item is required"),
    },
    

    {
      name: "buttonRight",
      title: "Button Right (English)",
      description: "Button Right in English",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "buttonRight_de",
      title: "Button Right (German)",
      description: "Button Right in German",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "buttonRight_es",
      title: "Button Right (Spanish)",
      description: "Button Right in Spanish",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "buttonRight_fr",
      title: "Button Right (French)",
      description: "Button Right in French",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "buttonRight_it",
      title: "Button Right (Italian)",
      description: "Button Right in Italian",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "buttonRight_pt",
      title: "Button Right (Portuguese)",
      description: "Button Right in Portuguese",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "textUnderRightButton",
      title: "Text Under Right Button (English)",
      description: "Text Under Right Button in English",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "textUnderRightButton_de",
      title: "Text Under Right Button (German)",
      description: "Text Under Right Button in German",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "textUnderRightButton_es",
      title: "Text Under Right Button (Spanish)",
      description: "Text Under Right Button in Spanish",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "textUnderRightButton_fr",
      title: "Text Under Right Button (French)",
      description: "Text Under Right Button in French",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "textUnderRightButton_it",
      title: "Text Under Right Button (Italian)",
      description: "Text Under Right Button in Italian",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "textUnderRightButton_pt",
      title: "Text Under Right Button (Portuguese)",
      description: "Text Under Right Button in Portuguese",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "sectionFourTitleOne",
      title: "H2 Section Four Title One (English)",
      description: "H2 Title One in English",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "sectionFourTitleOne_de",
      title: "H2 Section Four Title One (German)",
      description: "H2 Title One in German",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "sectionFourTitleOne_es",
      title: "H2 Section Four Title One (Spanish)",
      description: "H2 Title One in Spanish",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "sectionFourTitleOne_fr",
      title: "H2 Section Four Title One (French)",
      description: "H2 Title One in French",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "sectionFourTitleOne_it",
      title: "H2 Section Four Title One (Italian)",
      description: "H2 Title One in Italian",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "sectionFourTitleOne_pt",
      title: "H2 Section Four Title One (Portuguese)",
      description: "H2 Title One in Portuguese",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "sectionFourTitleTwo",
      title: "H2 Section Four Title Two (English)",
      description: "H2 Title Two in English",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "sectionFourTitleTwo_de",
      title: "H2 Section Four Title Two (German)",
      description: "H2 Title Two in German",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "sectionFourTitleTwo_es",
      title: "H2 Section Four Title Two (Spanish)",
      description: "H2 Title Two in Spanish",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "sectionFourTitleTwo_fr",
      title: "H2 Section Four Title Two (French)",
      description: "H2 Title Two in French",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "sectionFourTitleTwo_it",
      title: "H2 Section Four Title Two (Italian)",
      description: "H2 Title Two in Italian",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "sectionFourTitleTwo_pt",
      title: "H2 Section Four Title Two (Portuguese)",
      description: "H2 Title Two in Portuguese",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "metaTitle",
      title: "Meta Title (English)",
      description: "Meta Title for pricing page in English",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "metaTitle_de",
      title: "Meta Title (German)",
      description: "Meta Title for pricing page in German",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "metaTitle_es",
      title: "Meta Title (Spanish)",
      description: "Meta Title for pricing page in Spanish",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "metaTitle_fr",
      title: "Meta Title (French)",
      description: "Meta Title for pricing page in French",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "metaTitle_it",
      title: "Meta Title (Italian)",
      description: "Meta Title for pricing page in Italian",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "metaTitle_pt",
      title: "Meta Title (Portuguese)",
      description: "Meta Title for pricing page in Portuguese",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "metaDescription",
      title: "Meta Description (English)",
      description: "Meta Description for pricing page in English",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "metaDescription_de",
      title: "Meta Description (German)",
      description: "Meta Description for pricing page in German",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "metaDescription_es",
      title: "Meta Description (Spanish)",
      description: "Meta Description for pricing page in Spanish",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "metaDescription_fr",
      title: "Meta Description (French)",
      description: "Meta Description for pricing page in French",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "metaDescription_it",
      title: "Meta Description (Italian)",
      description: "Meta Description for pricing page in Italian",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "metaDescription_pt",
      title: "Meta Description (Portuguese)",
      description: "Meta Description for pricing page in Portuguese",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "keywords",
      title: "SEO Keywords",
      description: "Keywords for SEO Pricing Page.",
      type: "array",
      of: [{type: "string"}],
      options: {
        layout: "tags",
      },
      validation: (Rule: Rule) => Rule.required().min(1).error("At least one keyword is required"),
    },
  ],
};
