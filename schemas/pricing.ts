import { Rule } from "sanity";

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
      name: "pricingHeroText",
      title: "Hero Text",
      description: "Main text for the hero section.",
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
      name: "pricingSectionTwoText",
      title: "Section Two Text",
      description: "Text for the second section.",
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
      name: "pricingLeftText",
      title: "Pricing Left Text",
      description: "Text for the second section.",
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
              name: "text",
              title: "Text",
              type: "string",
              validation: (Rule: Rule) =>
                Rule.required().error("List item text is required"),
            },
          ],
        },
      ],
      validation: (Rule: Rule) =>
        Rule.required().min(1).error("At least one list item is required"),
    },

    {
      name: "leftSmallTextUnderButtonOne",
      title: "p Left Small Text Under Button One",
      description: "Small Text Under Button One",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "leftSmallTextUnderButtonTwo",
      title: "p  Left Small Text Under Button Two",
      description: "Small Text Under Button Two",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "pricingRightTitle",
      title: "H3 Pricing Right Title",
      description: "H3 Title",
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
              name: "text",
              title: "Text",
              type: "string",
              validation: (Rule: Rule) =>
                Rule.required().error("List item text is required"),
            },
          ],
        },
      ],
      validation: (Rule: Rule) =>
        Rule.required().min(1).error("At least one list item is required"),
    },

    {
      name: "buttonRight",
      title: "Button Right",
      description: "Button Right",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "textUnderRightButton",
      title: "Text Under Right Button",
      description: "Text Under Right Button",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "sectionFourTitleOne",
      title: "H2 Section Four Title One",
      description: "H2 Title One",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "sectionFourTitleTwo",
      title: "H2 Section Four Title Two",
      description: "H2 Title Two",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "metaTitle",
      title: "Meta Title",
      description: "Meta Title for pricing page",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "metaDescription",
      title: "Meta Description",
      description: "Meta Description for pricing page",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "keywords",
      title: "SEO Keywords",
      description: "Keywords for SEO Pricing Page.",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      validation: (Rule: Rule) => Rule.required().min(1).error("At least one keyword is required"),
    },
  ],
};
