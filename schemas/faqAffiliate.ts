import { Rule } from "sanity";

export const faqAffiliate = {
  name: "faqAffiliate",
  title: "FAQ AFFILIATE PAGE",
  type: "document",
  fields: [
    {
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Question is required"),
    },
    {
      name: "answer",
      title: "Answer",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Answer is required"),
    },
  ],
};
