import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = () => {
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);

  useEffect(() => {
    const pieChart = new Chart(pieChartRef.current, {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [{
          label: 'My First Dataset',
          data: [12, 19, 3, 5, 2],
          backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple'],
          borderColor: ['red', 'blue', 'yellow', 'green', 'purple'],
          borderWidth: 1,
        }],
      },
    });

    const barChart = new Chart(barChartRef.current, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Rainfall',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [65, 59, 80, 81, 56, 55, 40],
        }],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true, // Enable responsiveness
        scales: {
          y: {
            beginAtZero: true 
          }
        }
      }
    });

    return () => {
      pieChart.destroy();
      barChart.destroy();
    };
  }, []);

  return (
    <div className="container mx-auto py-6 px-4 flex flex-col items-center">
      <div className="w-full flex justify-between">
        <div className="w-1/2 mr-4" style={{ height: '500px', width: '600px' }}>
          <h2 className="text-lg text-black font-semibold mb-2">Finance Report</h2>
          <canvas ref={pieChartRef}></canvas>
        </div>
        <div className="w-1/2" style={{ height: '500px', width: '600px' }}>
          <h2 className="text-lg text-black font-semibold mb-2">Population</h2>
          <canvas ref={barChartRef}></canvas>
        </div>
      </div>
      <div className="w-full mt-8">
        <h2 className="text-lg text-black font-semibold mb-2">Sample Data</h2>
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border text-black border-gray-400 px-4 py-2">City</th>
              <th className="border text-black border-gray-400 px-4 py-2">Temperature</th>
              <th className="border text-black border-gray-400 px-4 py-2">Population</th>
            </tr>
          </thead>
          <tbody>
  <tr>
    <td className="border text-black border-gray-400 px-4 py-2">Delhi</td>
    <td className="border text-black border-gray-400 px-4 py-2">30°C</td>
    <td className="border text-black border-gray-400 px-4 py-2">18,710,922</td>
  </tr>
  <tr>
    <td className="border text-black border-gray-400 px-4 py-2">Mumbai</td>
    <td className="border text-black border-gray-400 px-4 py-2">28°C</td>
    <td className="border text-black border-gray-400 px-4 py-2">12,478,447</td>
  </tr>
  <tr>
    <td className="border text-black border-gray-400 px-4 py-2">Bangalore</td>
    <td className="border text-black border-gray-400 px-4 py-2">27°C</td>
    <td className="border text-black border-gray-400 px-4 py-2">8,443,675</td>
  </tr>
  <tr>
    <td className="border text-black border-gray-400 px-4 py-2">Kolkata</td>
    <td className="border text-black border-gray-400 px-4 py-2">29°C</td>
    <td className="border text-black border-gray-400 px-4 py-2">14,850,536</td>
  </tr>
</tbody>

        </table>
      </div>
    </div>
  );
};

export default ChartComponent;
