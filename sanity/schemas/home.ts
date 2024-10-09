import { Rule } from "sanity";

export const home = {
  name: "home",
  title: "HOME PAGE",
  type: "document",

  fields: [
    {
      name: "heroTitle",
      title: "H1 Hero Title",
      description: "H1 Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "heroText",
      title: "Hero Text",
      description: "Main text for the hero section.",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "heroTextUnderButton",
      title: "Small Hero Text Under Button",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "sectionThreeTitle",
      title: "H2 Section Three Title",
      description: "H2 Title In Section Three",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "sectionThreeText",
      title: "Section Three Text",
      description: "Text under H2 TiTle in Section Three.",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "sectionThreeStarsNumber",
      title: "Section Three Stars Number",
      description: "Section Three Stars Number",
      type: "number",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "sectionThreeTextUnderStarsNumber",
      title: "Section Three Text Under Stars Number",
      description: "Section Three Text Under Stars Number",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "sectionThreeUsersNumber",
      title: "Section Three Users Number",
      description: "Section Three Users Number",
      type: "number",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "sectionThreeTextUnderUsersNumber",
      title: "Section Three Text Under Users Number",
      description: "Section Three Text Under Users Number",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "sectionThreeTimeNumber",
      title: "Section Three Time Number",
      description: "Section Three Time Number",
      type: "number",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "sectionThreeTextUnderTimeNumber",
      title: "Section Three Text Under Time Number",
      description: "Section Three Text Under Time Number",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "sliderTitle",
      title: "H2 Slider Title",
      description: "H2 Slider Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "sliderText",
      title: "Slider Text",
      description: "Slider Text under Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "sliderAverageMonthlyIncome",
      title: "Slider Average Monthly Income",
      description: "Slider Average Monthly Income",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "reviewsText",
      title: "Review Text",
      description: "Review Text on top of video component",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "sectionSixTitle",
      title: "H2 Section Six Title",
      description: "H2 Section Six Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "sectionSevenTitle",
      title: "H2 Section Seven Title",
      description: "H2 Section Seven Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "sectionSevenText",
      title: "H2 Section Seven Text",
      description: "H2 Section Seven Text",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "sectionFourteenTitle",
      title: "H2 Section Fourteen Title",
      description: "H2 Section Fourteen Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "metaTitle",
      title: "Meta Title",
      description: "Meta Title for home page",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "metaDescription",
      title: "Meta Description",
      description: "Meta Description for home page",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "keywords",
      title: "SEO Keywords",
      description: "Keywords for SEO Home Page.",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      validation: (Rule: Rule) => Rule.required().min(1).error("At least one keyword is required"),
    },
  ],
};
