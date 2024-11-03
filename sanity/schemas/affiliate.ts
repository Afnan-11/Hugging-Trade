import { Rule } from "sanity";

export const affiliate = {
  name: "affiliate",
  title: "AFFILIATE PAGE",
  type: "document",
  fields: [
   
    {
      name: "affiliateHeroTitle",
      title: "H1 Hero Title (English)",
      description: "H1 Title in English",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Hero Title in English is required"),
    },
    {
      name: "affiliateHeroTitle_de",
      title: "H1 Hero Title (German)",
      description: "H1 Title in German",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Hero Title in German is required"),
    },
    {
      name: "affiliateHeroTitle_es",
      title: "H1 Hero Title (Spanish)",
      description: "H1 Title in Spanish",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Hero Title in Spanish is required"),
    },
    {
      name: "affiliateHeroTitle_fr",
      title: "H1 Hero Title (French)",
      description: "H1 Title in French",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Hero Title in French is required"),
    },
    {
      name: "affiliateHeroTitle_it",
      title: "H1 Hero Title (Italian)",
      description: "H1 Title in Italian",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Hero Title in Italian is required"),
    },
    {
      name: "affiliateHeroTitle_pt",
      title: "H1 Hero Title (Portuguese)",
      description: "H1 Title in Portuguese",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Hero Title in Portuguese is required"),
    },
    

   
    
    {
      name: "affiliateHeroText",
      title: "Hero Text (English)",
      description: "Main text for the hero section in English.",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Hero Text in English is required"),
    },
    {
      name: "affiliateHeroText_de",
      title: "Hero Text (German)",
      description: "Main text for the hero section in German.",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Hero Text in German is required"),
    },
    {
      name: "affiliateHeroText_es",
      title: "Hero Text (Spanish)",
      description: "Main text for the hero section in Spanish.",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Hero Text in Spanish is required"),
    },
    {
      name: "affiliateHeroText_fr",
      title: "Hero Text (French)",
      description: "Main text for the hero section in French.",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Hero Text in French is required"),
    },
    {
      name: "affiliateHeroText_it",
      title: "Hero Text (Italian)",
      description: "Main text for the hero section in Italian.",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Hero Text in Italian is required"),
    },
    {
      name: "affiliateHeroText_pt",
      title: "Hero Text (Portuguese)",
      description: "Main text for the hero section in Portuguese.",
      type: "text",
      validation: (Rule: Rule) => Rule.required().error("Hero Text in Portuguese is required"),
    },
    

   
    
    {
      name: "affiliateReviewTitle",
      title: "H2 Affiliate Review Title (English)",
      description: "H2 Title in English",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Affiliate Review Title in English is required"),
    },
    {
      name: "affiliateReviewTitle_de",
      title: "H2 Affiliate Review Title (German)",
      description: "H2 Title in German",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Affiliate Review Title in German is required"),
    },
    {
      name: "affiliateReviewTitle_es",
      title: "H2 Affiliate Review Title (Spanish)",
      description: "H2 Title in Spanish",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Affiliate Review Title in Spanish is required"),
    },
    {
      name: "affiliateReviewTitle_fr",
      title: "H2 Affiliate Review Title (French)",
      description: "H2 Title in French",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Affiliate Review Title in French is required"),
    },
    {
      name: "affiliateReviewTitle_it",
      title: "H2 Affiliate Review Title (Italian)",
      description: "H2 Title in Italian",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Affiliate Review Title in Italian is required"),
    },
    {
      name: "affiliateReviewTitle_pt",
      title: "H2 Affiliate Review Title (Portuguese)",
      description: "H2 Title in Portuguese",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Affiliate Review Title in Portuguese is required"),
    },
    

    // 

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
                Rule.required().error("Author's name is required"),
            },
            {
              name: "position",
              title: "Position",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "string", validation: (Rule: Rule) => Rule.required().error("Position in English is required") },
                { name: "de", title: "German", type: "string", validation: (Rule: Rule) => Rule.required().error("Position in German is required") },
                { name: "es", title: "Spanish", type: "string", validation: (Rule: Rule) => Rule.required().error("Position in Spanish is required") },
                { name: "fr", title: "French", type: "string", validation: (Rule: Rule) => Rule.required().error("Position in French is required") },
                { name: "it", title: "Italian", type: "string", validation: (Rule: Rule) => Rule.required().error("Position in Italian is required") },
                { name: "pt", title: "Portuguese", type: "string", validation: (Rule: Rule) => Rule.required().error("Position in Portuguese is required") },
              ],
            },
            {
              name: "text",
              title: "Review Text",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "text", validation: (Rule: Rule) => Rule.required().error("Review text in English is required") },
                { name: "de", title: "German", type: "text", validation: (Rule: Rule) => Rule.required().error("Review text in German is required") },
                { name: "es", title: "Spanish", type: "text", validation: (Rule: Rule) => Rule.required().error("Review text in Spanish is required") },
                { name: "fr", title: "French", type: "text", validation: (Rule: Rule) => Rule.required().error("Review text in French is required") },
                { name: "it", title: "Italian", type: "text", validation: (Rule: Rule) => Rule.required().error("Review text in Italian is required") },
                { name: "pt", title: "Portuguese", type: "text", validation: (Rule: Rule) => Rule.required().error("Review text in Portuguese is required") },
              ],
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
      title: "Meta Title (English)",
      description: "Meta title for the pricing page",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Meta title in English is required"),
    },
    {
      name: "metaTitle_de",
      title: "Meta Title (German)",
      description: "Meta title for the pricing page in German",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Meta title in German is required"),
    },
    {
      name: "metaTitle_es",
      title: "Meta Title (Spanish)",
      description: "Meta title for the pricing page in Spanish",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Meta title in Spanish is required"),
    },
    {
      name: "metaTitle_fr",
      title: "Meta Title (French)",
      description: "Meta title for the pricing page in French",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Meta title in French is required"),
    },
    {
      name: "metaTitle_it",
      title: "Meta Title (Italian)",
      description: "Meta title for the pricing page in Italian",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Meta title in Italian is required"),
    },
    {
      name: "metaTitle_pt",
      title: "Meta Title (Portuguese)",
      description: "Meta title for the pricing page in Portuguese",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Meta title in Portuguese is required"),
    },
    

    {
      name: "metaDescription",
      title: "Meta Description (English)",
      description: "Meta description for the pricing page in English",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Meta description in English is required"),
    },
    {
      name: "metaDescription_de",
      title: "Meta Description (German)",
      description: "Meta description for the pricing page in German",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Meta description in German is required"),
    },
    {
      name: "metaDescription_es",
      title: "Meta Description (Spanish)",
      description: "Meta description for the pricing page in Spanish",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Meta description in Spanish is required"),
    },
    {
      name: "metaDescription_fr",
      title: "Meta Description (French)",
      description: "Meta description for the pricing page in French",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Meta description in French is required"),
    },
    {
      name: "metaDescription_it",
      title: "Meta Description (Italian)",
      description: "Meta description for the pricing page in Italian",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Meta description in Italian is required"),
    },
    {
      name: "metaDescription_pt",
      title: "Meta Description (Portuguese)",
      description: "Meta description for the pricing page in Portuguese",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Meta description in Portuguese is required"),
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
