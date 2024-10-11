import { Rule } from "sanity";

export const faqHome = {
  name: "faqHome",
  title: "FAQ HOME PAGE",
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
