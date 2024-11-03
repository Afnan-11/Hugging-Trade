import { Rule } from "sanity";

export const footer = {
  name: "footer",
  title: "FOOTER",
  type: "document",
  fields: [
    

    {
      name: "address",
      title: "Address (English)",
      description: "Address in English",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Address in English is required"),
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
      title: "Text Above Icons (English)",
      description: "Text Above Icons in English",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    
    {
      name: "textAboveIcons_de",
      title: "Text Above Icons (German)",
      description: "Text Above Icons in German",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    
    {
      name: "textAboveIcons_es",
      title: "Text Above Icons (Spanish)",
      description: "Text Above Icons in Spanish",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    
    {
      name: "textAboveIcons_fr",
      title: "Text Above Icons (French)",
      description: "Text Above Icons in French",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    
    {
      name: "textAboveIcons_it",
      title: "Text Above Icons (Italian)",
      description: "Text Above Icons in Italian",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    
    {
      name: "textAboveIcons_pt",
      title: "Text Above Icons (Portuguese)",
      description: "Text Above Icons in Portuguese",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    
  ],
};
