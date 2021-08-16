import axios from "axios";
import React, { Component, Fragment } from "react";
import CanvasJSReact from '../assets/canvasjs.stock.react';

// import obj from 'canvasjs-react-charts';
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

interface props {

};
interface state {
  dataPoints1: Array<any>;
  dataPoints2: Array<any>;
  dataPoints3: Array<any>;
  isLoaded: boolean;
}
export interface history {
  Date: string;
  Open: string;
  High: string;
  Low: string;
  Close: string;
  "Adj Close": string;
  Volume: string;
}

class App extends Component<props, state> {
    constructor(props) {
      super(props);
      this.state = { dataPoints1: [], dataPoints2: [], dataPoints3: [], isLoaded: false };
    }
   
    componentDidMount() {
      axios.get(`/api/history?symbol=amzn`) // amzn, msft, aapl, fb, nflx
      .then((res)=>{
        const dps1:any = [], dps2:any = [], dps3:any = [];
        const intermediateState =  res.data[0].history.map((rec: history) => {
          dps1.push({
            x: new Date(rec.Date),
            y: [
              Number(rec.Open),
              Number(rec.High),
              Number(rec.Low),
              Number(rec.Close)
            ]
          });
          dps2.push({x: new Date(rec.Date), y: Number(rec.Volume)});
          dps3.push({x: new Date(rec.Date), y: Number(rec.Close)});
          return {
            close: rec.Close,
            date: rec.Date,
            high: rec.High,
            low:  rec.Low,
            open: rec.Open,
            volume_ltc: rec.Volume          
          };
        });
        this.setState({
          isLoaded: true,
          dataPoints1: dps1,
          dataPoints2: dps2,
          dataPoints3: dps3
        });          
      }).catch(e => {
        console.error(e);
      });      
    }
   
    render() {
      const options = {
        theme: "light2",
        subtitles: [{
          text: "Price-Volume Trend"
        }],
        charts: [{
          axisX: {
            lineThickness: 5,
            tickLength: 0,
            labelFormatter: function(e) {
              return "";
            },
            crosshair: {
              enabled: true,
              snapToDataPoint: true,
              labelFormatter: function(e) {
                return "";
              }
            }
          },
          axisY: {
            title: "Litecoin Price",
            prefix: "$",
            tickLength: 0
          },
          toolTip: {
            shared: true
          },
          data: [{
            name: "Price (in USD)",
            yValueFormatString: "$#,###.##",
            type: "candlestick",
            dataPoints : this.state.dataPoints1
          }]
        },{
          height: 100,
          axisX: {
            crosshair: {
              enabled: true,
              snapToDataPoint: true
            }
          },
          axisY: {
            title: "Volume",
            prefix: "$",
            tickLength: 0
          },
          toolTip: {
            shared: true
          },
          data: [{
            name: "Volume",
            yValueFormatString: "$#,###.##",
            type: "column",
            dataPoints : this.state.dataPoints2
          }]
        }],
        navigator: {
          data: [{
            dataPoints: this.state.dataPoints3
          }],
          slider: {
            minimum: new Date("2018-05-01"),
            maximum: new Date("2018-07-01")
          }
        }
      };
      const containerProps = {
        width: "100%",
        height: "450px",
        margin: "auto"
      };
      return <Fragment><div> 
            {
              // Reference: https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator
              this.state.isLoaded && 
              <CanvasJSStockChart containerProps={containerProps} options = {options}
                /* onRef = {ref => this.chart = ref} */
              />
            }
        </div>
        </Fragment>;
    }
  }
  export default App; 