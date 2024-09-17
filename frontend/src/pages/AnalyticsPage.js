import React, { useRef } from "react";
import SidebarIcon from "../components/sidebar/SidebarIcon";
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from "react-icons/bs";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./Analytics.css";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";

const data = [
  { name: "Jan", pv: 2400, uv: 4000 },
  { name: "Feb", pv: 1398, uv: 3000 },
  { name: "Mar", pv: 9800, uv: 2000 },
  { name: "Apr", pv: 3908, uv: 2780 },
  { name: "May", pv: 4800, uv: 1890 },
  { name: "Jun", pv: 3800, uv: 2390 },
];

const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const generatePDF = async () => {
  // Capture the charts as images using html2canvas
  const chartElements = document.querySelectorAll('.chart');
  const chartImages = [];

  for (let i = 0; i < chartElements.length; i++) {
    const chartCanvas = await html2canvas(chartElements[i]);
    const chartImg = chartCanvas.toDataURL("image/png");
    chartImages.push(`<img src="${chartImg}" style="width: 100%; height: auto;" />`);
  }

  // Create the PDF content with charts included as images
  const pdfContent = `
    <div style="font-family: Arial, sans-serif;">
      <h2>Shop Analytics</h2>
      <h3>Summary</h3>
      <table border="1" cellpadding="8" cellspacing="0" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>Total Products</th>
            <th>Wishlist Added</th>
            <th>Categories</th>
            <th>Alerts</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>300</td>
            <td>12</td>
            <td>33</td>
            <td>42</td>
          </tr>
        </tbody>
      </table>

      <h3>Charts</h3>
      ${chartImages.join('')}
    </div>
  `;

  // Create a new element to store the content for the PDF
  const element = document.createElement("div");
  element.innerHTML = pdfContent;

  // Set PDF options
  const opt = {
    margin: 1,
    filename: 'shop_analytics.pdf',
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  // Generate and save the PDF
  html2pdf().from(element).set(opt).save();
};

export default function AnalyticsPage() {
  return (
    <div className="analytics-container">
      <SidebarIcon /> {/* Sidebar with the shop info */}

      <main className="main-content">
        <div className="main-title">
          <h3>ANALYTICS DASHBOARD</h3>
          <button className="download-btn" onClick={generatePDF}>Download Analytics</button>
        </div>

        {/* Cards Section */}
        <div id="analytics-content" className="main-cards">
          <div className="card">
            <div className="card-inner">
              <h3>TOTAL PRODUCTS</h3>
            </div>
            <h1>300</h1>
          </div>

          <div className="card">
            <div className="card-inner">
              <h3>WISHLIST ADDED</h3>
            </div>
            <h1>12</h1>
          </div>

          <div className="card">
            <div className="card-inner">
              <h3>CATEGORIES</h3>
            </div>
            <h1>33</h1>
          </div>

          <div className="card">
            <div className="card-inner">
              <h3>ALERTS</h3>
            </div>
            <h1>42</h1>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts">
          {/* Flexbox container for the LineChart and PieChart */}
          <div className="chart-row">
            <div className="chart">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart width={400} height={400}>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart1">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
