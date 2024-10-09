import { Rule } from "sanity";

export const footer = {
  name: "footer",
  title: "FOOTER",
  type: "document",
  fields: [
    {
      name: "address",
      title: "Address",
      description: "Address",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },

    {
      name: "links",
      title: "Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Name of Social Media Link",
              type: "string",
              validation: (Rule: Rule) => Rule.required().error("Required"),
            },

            {
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule: Rule) =>
                Rule.required()
                  .uri({ scheme: ["http", "https"] })
                  .error("Valid URL is required"),
            },
            {
              name: "socialMediaImage",
              title: "Social Media Image",
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
        Rule.required()
          .min(1)
          .error("At least one social media link is required"),
    },
    {
      name: "textAboveIcons",
      title: "Text Above Icons",
      description: "Text Above Icons",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
  ],
};
