import {Rule} from "sanity";
export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const chart = {
  name: "chart",
  title: "CHART DATA",
  type: "document",
  fields: [
    {
      name: "title_en",
      title: "Title (English)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("English title is required"),
    },
    {
      name: "title_de",
      title: "Title (German)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("German title is required"),
    },
    {
      name: "title_es",
      title: "Title (Spanish)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Spanish title is required"),
    },
    {
      name: "title_fr",
      title: "Title (French)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("French title is required"),
    },
    {
      name: "title_it",
      title: "Title (Italian)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Italian title is required"),
    },
    {
      name: "title_pt",
      title: "Title (Portuguese)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Portuguese title is required"),
    },
    {
      name: "subheading_en",
      title: "Subheading (English)",
      type: "string",
    },
    {
      name: "subheading_de",
      title: "Subheading (German)",
      type: "string",
    },
    {
      name: "subheading_es",
      title: "Subheading (Spanish)",
      type: "string",
    },
    {
      name: "subheading_fr",
      title: "Subheading (French)",
      type: "string",
    },
    {
      name: "subheading_it",
      title: "Subheading (Italian)",
      type: "string",
    },
    {
      name: "subheading_pt",
      title: "Subheading (Portuguese)",
      type: "string",
    },
    {
      name: "chartData",
      title: "Chart Data Points",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "month",
              title: "Month",
              type: "string",
              options: {
                list: MONTHS,
              },
              validation: (Rule: Rule) => Rule.required().error("Month is required"),
            },
            {
              name: "year",
              title: "Year",
              type: "number",
              options: {
                list: Array.from({length: new Date().getFullYear() - 2020 + 1}, (_, i) => 2020 + i),
              },
              validation: (Rule: Rule) => Rule.required().error("Year is required"),
            },
            {
              name: "fund",
              title: "Fund Performance (%)",
              type: "number",
              validation: (Rule: Rule) => Rule.required().error("Fund performance is required"),
            },
            {
              name: "sp500",
              title: "S&P 500 Performance (%)",
              type: "number",
              validation: (Rule: Rule) => Rule.required().error("S&P 500 performance is required"),
            },
          ],
          preview: {
            select: {
              month: "month",
              year: "year",
              fund: "fund",
              sp500: "sp500",
            },
            prepare(selection: any) {
              const {month, year, fund, sp500} = selection;
              return {
                title: `${month} ${year} (Fund: ${fund}%, S&P500: ${sp500}%)`,
              };
            },
          },
        },
      ],
      validation: (Rule: Rule) => Rule.required().min(1).error("At least one data point is required"),
    },
  ],
};
