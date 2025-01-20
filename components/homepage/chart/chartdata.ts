import {client} from "@/sanity/lib/client";
import {MONTHS} from "@/sanity/schemas/chart";

type ChartDataPoint = {
  date: string;
  fund: number;
  sp500: number;
};

type ChartDocument = {
  title: string;
  description: string | null;
  chartData: ChartDataPoint[];
};

export async function getChartData() {
  try {
    const query = `*[_type == "chart"][0] {
      chartData[] {
        month,
        year,
        fund,
        sp500
      }
    }`;
    const chartDoc = await client.fetch<ChartDocument>(query);
    if (!chartDoc) {
      return null;
    }
    return chartDoc.chartData
      .filter(
        (point: any) =>
          point.month !== undefined &&
          point.year !== undefined &&
          point.fund !== undefined &&
          point.sp500 !== undefined,
      )
      .map((point: any) => ({
        date: new Date(point.year, MONTHS.indexOf(point.month)),
        fund: point.fund,
        sp500: point.sp500,
        month: point.month,
      }));
  } catch (error) {
    console.error("Failed to fetch chart data:", error);
    return null;
  }
}

// export const chartData = [
//   {month: "January", fund: 60, sp500: -0.98, date: new Date(2020, 0)},
//   {month: "February", fund: 68, sp500: 8.37, date: new Date(2020, 1)},
//   {month: "March", fund: 75, sp500: -12.51, date: new Date(2020, 2)},
//   {month: "April", fund: 70, sp500: 12.68, date: new Date(2020, 3)},
//   {month: "May", fund: 65, sp500: 4.58, date: new Date(2020, 4)},
//   {month: "June", fund: 73, sp500: 1.84, date: new Date(2020, 5)},
//   {month: "July", fund: 62, sp500: 5.51, date: new Date(2020, 6)},
//   {month: "August", fund: 78, sp500: 7.19, date: new Date(2020, 7)},
//   {month: "September", fund: 69, sp500: -3.92, date: new Date(2020, 8)},
//   {month: "October", fund: 55, sp500: 2.65, date: new Date(2020, 9)},
//   {month: "November", fund: 74, sp500: 10.75, date: new Date(2020, 10)},
//   {month: "December", fund: 67, sp500: 12.68, date: new Date(2020, 11)},
//   // 2021 Data
//   {month: "January", fund: 70, sp500: -0.03, date: new Date(2021, 0)},
//   {month: "February", fund: 85, sp500: 4.3, date: new Date(2021, 1)},
//   {month: "March", fund: 90, sp500: 4.76, date: new Date(2021, 2)},
//   {month: "April", fund: 78, sp500: 5.72, date: new Date(2021, 3)},
//   {month: "May", fund: 95, sp500: 0.58, date: new Date(2021, 4)},
//   {month: "June", fund: 88, sp500: 2.25, date: new Date(2021, 5)},
//   {month: "July", fund: 105, sp500: 2.18, date: new Date(2021, 6)},
//   {month: "August", fund: 92, sp500: 2.82, date: new Date(2021, 7)},
//   {month: "September", fund: 100, sp500: -3.92, date: new Date(2021, 8)},
//   {month: "October", fund: 65, sp500: 6.89, date: new Date(2021, 9)},
//   {month: "November", fund: 107, sp500: 10.75, date: new Date(2021, 10)},
//   {month: "December", fund: 99, sp500: 4.46, date: new Date(2021, 11)},
//   // 2022 Data
//   {month: "January", fund: 95, sp500: -0.19, date: new Date(2022, 0)},
//   {month: "February", fund: 110, sp500: 5.02, date: new Date(2022, 1)},
//   {month: "March", fund: 125, sp500: -3.92, date: new Date(2022, 2)},
//   {month: "April", fund: 115, sp500: -8.41, date: new Date(2022, 3)},
//   {month: "May", fund: 130, sp500: 6.86, date: new Date(2022, 4)},
//   {month: "June", fund: 100, sp500: -9.32, date: new Date(2022, 5)},
//   {month: "July", fund: 135, sp500: 19.37, date: new Date(2022, 6)},
//   {month: "August", fund: 120, sp500: -6.69, date: new Date(2022, 7)},
//   {month: "September", fund: 105, sp500: -7.41, date: new Date(2022, 8)},
//   {month: "October", fund: 90, sp500: 6.89, date: new Date(2022, 9)},
//   {month: "November", fund: 128, sp500: 8.39, date: new Date(2022, 10)},
//   {month: "December", fund: 118, sp500: 10.84, date: new Date(2022, 11)},
//   // // 2023 Data
//   {month: "January", fund: 110, sp500: -4.64, date: new Date(2023, 0)},
//   {month: "February", fund: 130, sp500: 4.88, date: new Date(2023, 1)},
//   {month: "March", fund: 150, sp500: 7.24, date: new Date(2023, 2)},
//   {month: "April", fund: 140, sp500: -2.73, date: new Date(2023, 3)},
//   {month: "May", fund: 160, sp500: 1.3, date: new Date(2023, 4)},
//   {month: "June", fund: 120, sp500: -0.36, date: new Date(2023, 5)},
//   {month: "July", fund: 175, sp500: 5.49, date: new Date(2023, 6)},
//   {month: "August", fund: 155, sp500: -3.87, date: new Date(2023, 7)},
//   {month: "September", fund: 135, sp500: -8.5, date: new Date(2023, 8)},
//   {month: "October", fund: 105, sp500: 2.89, date: new Date(2023, 9)},
//   {month: "November", fund: 170, sp500: 10.75, date: new Date(2023, 10)},
//   {month: "December", fund: 145, sp500: 4.29, date: new Date(2023, 11)},
//   // 2024 Data (Hypothetical)
//   {month: "January", fund: 160, sp500: 3.0, date: new Date(2024, 0)},
//   {month: "February", fund: 180, sp500: 4.5, date: new Date(2024, 1)},
//   {month: "March", fund: 200, sp500: -2.0, date: new Date(2024, 2)},
//   {month: "April", fund: 175, sp500: 5.0, date: new Date(2024, 3)},
//   {month: "May", fund: 205, sp500: 6.0, date: new Date(2024, 4)},
//   {month: "June", fund: 185, sp500: -1.5, date: new Date(2024, 5)},
//   {month: "July", fund: 195, sp500: 7.0, date: new Date(2024, 6)},
//   {month: "August", fund: 170, sp500: -3.0, date: new Date(2024, 7)},
//   {month: "September", fund: 155, sp500: 2.5, date: new Date(2024, 8)},
//   {month: "October", fund: 150, sp500: 4.0, date: new Date(2024, 9)},
//   {month: "November", fund: 205, sp500: 5.5, date: new Date(2024, 10)},
//   {month: "December", fund: 190, sp500: 3.5, date: new Date(2024, 11)},
// ];
