import {Rule} from "sanity";

export const faqHome = {
  name: "faqHome",
  title: "FAQ HOME PAGE",
  type: "document",
  fields: [
    {
      name: "question",
      title: "Question (English)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Question is required"),
    },
    {
      name: "question_de",
      title: "Question (German)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Question (German) is required"),
    },
    {
      name: "question_es",
      title: "Question (Spanish)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Question (Spanish) is required"),
    },
    {
      name: "question_fr",
      title: "Question (French)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Question (French) is required"),
    },
    {
      name: "question_it",
      title: "Question (Italian)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Question (Italian) is required"),
    },
    {
      name: "question_pt",
      title: "Question (Portuguese)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Question (Portuguese) is required"),
    },
    {
      name: "answer",
      title: "Answer (English)",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Answer is required"),
    },
    {
      name: "answer_de",
      title: "Answer (German)",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Answer (German) is required"),
    },
    {
      name: "answer_es",
      title: "Answer (Spanish)",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Answer (Spanish) is required"),
    },
    {
      name: "answer_fr",
      title: "Answer (French)",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Answer (French) is required"),
    },
    {
      name: "answer_it",
      title: "Answer (Italian)",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Answer (Italian) is required"),
    },
    {
      name: "answer_pt",
      title: "Answer (Portuguese)",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Answer (Portuguese) is required"),
    },
  ],
};
