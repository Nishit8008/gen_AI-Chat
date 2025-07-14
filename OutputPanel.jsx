import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend
} from "recharts";



 const lineChartData = {
  chart: {
    title: "Website Traffic",
    type: "line",
    xKey: "day",
    yKey: "visits",
    data: [
      { day: "Mon", visits: 100 },
      { day: "Tue", visits: 200 },
      { day: "Wed", visits: 150 },
      { day: "Thu", visits: 300 },
      { day: "Fri", visits: 250 },
    ]
  }
};

const pieChartData = {
  chart: {
    title: "Market Share",
    type: "pie",
    xKey: "company",
    yKey: "share",
    data: [
      { company: "Apple", share: 40 },
      { company: "Samsung", share: 30 },
      { company: "Other", share: 30 }
    ]
  }
};


const renderChart = (chart) => {
  const { type, data, xKey, yKey } = chart;

  if (type === "bar") {
    return (
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={yKey} fill="#3182ce" />
      </BarChart>
    );
  }
  if (type === "line") {
    return (
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={yKey} stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    );
  }
  if (type === "pie") {
    return (
      <PieChart>
        <Tooltip />
        <Legend />
        <Pie data={data} dataKey={yKey} nameKey={xKey} cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={["#8884d8", "#82ca9d", "#ffc658"][index % 3]} />
          ))}
        </Pie>
      </PieChart>
    );
  }
  return <p className="text-sm text-red-500">⚠️ Unsupported chart type: {type}</p>;
};

export default function OutputPanel({ responseData, setResponseData, mockData }) {
  return (
    <div className="w-full md:w-1/2 p-6 bg-gray-50 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Dynamic Output</h2>
            
       
               <div className="mb-4 flex items-center gap-2">
                 <label htmlFor="mock-select" className="text-sm font-medium">🔍 Test Mock:</label>
                 <select
                   id="mock-select"
                   className="px-2 py-1 border rounded"
                   onChange={(e) => {
                     const val = e.target.value;
                     if (val === "bar") setResponseData(mockData);
                     else if (val === "line") setResponseData({ ...lineChartData, answer: "📈 Website traffic trend this week." });
                     else if (val === "pie") setResponseData({ ...pieChartData, answer: "📊 Market share distribution." });
                   }}
                 >
                   <option value="bar">Bar Chart</option>
                   <option value="line">Line Chart</option>
                   <option value="pie">Pie Chart</option>
                 </select>
               </div>
     
               
     
               {responseData?.answer && (
                 <p className="text-base text-gray-800 mb-4">💬 {responseData.answer}</p>
               )}
     
               {responseData?.chart && responseData.chart.data && (
                 <div className="mb-4 border border-gray-300 rounded-lg shadow-sm">
                   <div className="p-4">
                     <p className="text-sm text-gray-600">Chart: {responseData.chart.title}</p>
                     <div className="mt-4 h-64">
                       <ResponsiveContainer width="100%" height="100%">
                         {renderChart(responseData.chart)}
                       </ResponsiveContainer>
                     </div>
                   </div>
                 </div>
               )}
     

      {responseData?.table && (
        <div className="border border-gray-300 rounded-lg shadow-sm">
          <div className="p-4">
            <p className="text-sm text-gray-600">Table: {responseData.table.title}</p>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    {responseData.table.headers.map((header, idx) => (
                      <th key={idx} className="pb-2 pr-4">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {responseData.table.rows.map((row, idx) => (
                    <tr key={idx}>
                      {row.map((cell, cidx) => (
                        <td key={cidx} className="pr-4 py-1">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
