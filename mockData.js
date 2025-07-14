export const mockData = {
  answer: "Here's a quick overview of your sales data. January saw the highest sales, while February showed a dip. The product mix remained stable across all months.",
  chart: {
    title: "Monthly Sales",
    type: "bar",
    xKey: "month",
    yKey: "sales",
    data: [
      { month: "January", sales: 1200 },
      { month: "February", sales: 900 },
      { month: "March", sales: 1100 },
    ],
  },
  table: {
    title: "Sales Breakdown by Product",
    headers: ["Product", "January", "February", "March"],
    rows: [
      ["Product A", 400, 300, 350],
      ["Product B", 500, 400, 500],
      ["Product C", 300, 200, 250],
    ]
  }
};

 