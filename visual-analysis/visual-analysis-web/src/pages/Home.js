/* study how to create a bar chart with chartjs*/
import twitterData from "../twitter_data/test.csv";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, BarElement, Title, Tooltip, Legend);

function Home() {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    Papa.parse(twitterData, {
      download: true,
      header: true,
      dynamicTyping: true,
      delimiter: "",
      complete: (result) => {
        console.log(result);
        setChartData({
          labels: result.data
            .map((item, index) => [item[' "sentiment"']])
            .filter(Number),
          datasets: [
            {
              label: "twitter data",
              data: result.data
                .map((item, index) => [item[' "sentiment']])
                .filter(Number),
              borderColor: "black",
              backgroundColor: "red",
            },
          ],
        });
        setChartOptions({
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "ALL OSCAR WINNERS",
            },
          },
        });
      },
    });
  }, []);

  return (
    <div>
      <h1>HOME PAGE</h1>
      {chartData.datasets.length > 0 ? (
        <div>
          <Bar options={chartOptions} data={chartData} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Home;
