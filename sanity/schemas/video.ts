import { Rule } from "sanity";

export const video = {
  name: "video",
  title: "REVIEWS VIDEO",
  type: "document",

  fields: [
    {
      name: "reviewsText",
      title: "Review Text",
      description: "Review Text on top of video component",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "nameVideoOne",
      title: "Name Video One",
      description: "Name of Person in First Video",
      type: "string",
      validation: (Rule: Rule) =>
        Rule.required().error("Video name is required"),
    },
    {
      name: "descriptionForPersonInVideoOne",
      title: "Description For Person In Video One",
      description: "Description For Person In Video One",
      type: "string",
      validation: (Rule: Rule) =>
        Rule.required().error("Video name is required"),
    },
    {
      name: "positionInCompanyOfFirstPerson",
      title: "Position In Company Of First Person",
      type: "string",
      validation: (Rule: Rule) =>
        Rule.required().error("Video title is required"),
    },

    {
      name: "videoFileForFirstPerson",
      title: "Upload Video For First Person",
      type: "file",
      options: {
        accept: "video/*",
      },
      validation: (Rule: Rule) =>
        Rule.required().error("Video file is required"),
    },

    {
      name: "nameVideoTwo",
      title: "Name Video Two",
      description: "Name of Person in Second Video",
      type: "string",
      validation: (Rule: Rule) =>
        Rule.required().error("Video name is required"),
    },
    {
      name: "descriptionForPersonInVideoTwo",
      title: "Description For Person In Video Two",
      description: "Description For Person In Video Two",
      type: "string",
      validation: (Rule: Rule) =>
        Rule.required().error("Video name is required"),
    },
    {
      name: "positionInCompanyOfSecondPerson",
      title: "Position In Company Of Second Person",
      type: "string",
      validation: (Rule: Rule) =>
        Rule.required().error("Video title is required"),
    },
    {
      name: "videoFileForSecondPerson",
      title: "Upload Video For Second Person",
      type: "file",
      options: {
        accept: "video/*",
      },
      validation: (Rule: Rule) =>
        Rule.required().error("Video file is required"),
    },

    {
      name: "nameVideoThree",
      title: "Name Video Three",
      description: "Name of Person in Third Video",
      type: "string",
      validation: (Rule: Rule) =>
        Rule.required().error("Video name is required"),
    },
    {
      name: "descriptionForPersonInVideoThree",
      title: "Description For Person In Video Three",
      description: "Description For Person In Video Three",
      type: "string",
      validation: (Rule: Rule) =>
        Rule.required().error("Video name is required"),
    },
    {
      name: "positionInCompanyOfThirdPerson",
      title: "Position In Company Of Third Person",
      type: "string",
      validation: (Rule: Rule) =>
        Rule.required().error("Video title is required"),
    },
    {
      name: "videoFileForThirdPerson",
      title: "Upload Video For Third Person",
      type: "file",
      options: {
        accept: "video/*",
      },
      validation: (Rule: Rule) =>
        Rule.required().error("Video file is required"),
    },
  ],
};
