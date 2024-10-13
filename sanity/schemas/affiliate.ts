import { Rule } from "sanity";

export const affiliate = {
  name: "affiliate",
  title: "AFFILIATE PAGE",
  type: "document",
  fields: [
    {
      name: "affiliateHeroTitle",
      title: "H1 Hero Title",
      description: "H1 Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "affiliateHeroText",
      title: "Hero Text",
      description: "Main text for the hero section.",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "affiliateReviewTitle",
      title: "H2 Affiliate Review Title",
      description: "H2 Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "reviewListItems",
      title: "Review List Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule: Rule) =>
                Rule.required().error("List item text is required"),
            },
            {
              name: "position",
              title: "Position",
              type: "string",
              validation: (Rule: Rule) =>
                Rule.required().error("List item text is required"),
            },
            {
              name: "text",
              title: "Text",
              type: "string",
              validation: (Rule: Rule) =>
                Rule.required().error("List item text is required"),
            },
            {
              name: "authorImage",
              title: "Author Image",
              type: "image",
              options: {
                hotspot: true,
              },
              validation: (Rule: Rule) =>
                Rule.required().error("Author image is required"),
            },
          ],
        },
      ],
      validation: (Rule: Rule) =>
        Rule.required().min(1).error("At least one list item is required"),
    },
    {
      name: "averageUSD",
      type: "number",
      title: "Average USD Value",
      description: "The average value used to calculate the affiliate income.",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "percent",
      type: "number",
      title: "Percent %",
      description: "The percent % value used to calculate the affiliate income.",
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
