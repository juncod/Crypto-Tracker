import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

interface RouterParams {
    coinId: string;
}

  interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
      USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
      };
    };
  }

const Loader = styled.span`
  text-align: center;
  display: block;
`;
const DataList = styled.div`
    display:flex;
    flex-direction:column;
    align-items:flex-start;
`

const DataItem = styled.div`
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
`

function Price(){
    const { coinId } = useParams<RouterParams>();
    const {isLoading: tickersLoading , data: tickersData} = useQuery<PriceData>(["tickers",coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
    );
    return(<div>{tickersLoading ? (<Loader>price loading...</Loader>) : (<DataList>
        <DataItem>Percent change on 1day is  {tickersData?.quotes.USD.percent_change_24h}%</DataItem>
        <DataItem>Percent change on 7days is  {tickersData?.quotes.USD.percent_change_7d}%</DataItem>
        <DataItem>Percent change on 30days is  {tickersData?.quotes.USD.percent_change_30d}%</DataItem>
        </DataList>) }</div>)
}
export default Price