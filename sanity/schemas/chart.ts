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
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Title is required"),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
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
        },
      ],
      validation: (Rule: Rule) => Rule.required().min(1).error("At least one data point is required"),
    },
  ],
};
