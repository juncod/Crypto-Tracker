import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import Price from "./Price";

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
  }

interface ChartProps {
  coinId: string;
  isDark: boolean;
}



function Chart({ isDark, coinId }: ChartProps) {
    const { isLoading, data } = useQuery<IHistorical[]>(
        ["ohlcv", coinId],
        () => fetchCoinHistory(coinId),
        {
          refetchInterval: 10000,
        }
  );
  // open high low close
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          series={[
            {
              name: "Price",
              data: data?.map((price) => ({'x': price.time_close, 'y':[price.open, price.high, price.low, price.close]})),
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark": "light",//dark
            },
            chart: {
              type: 'candlestick',
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
            },}}
          type="candlestick" height={350}
        />
      )}
    </div>
  );
}


export default Chart;