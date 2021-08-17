import React, {Component, Fragment} from "react";
import StockCharts from './stockchart';
import Autocomplete from './autocomplete';
import axios from "axios";
import GridHistory from "./history-grid.component";

interface props {

};
interface state {
    userInput: string;
    filteredSuggestions: Array<suggestion>;
    showSuggestions: boolean;
    userSelection?: string;
    toggleView?: boolean;
}
export interface suggestion {
    _id: string;
    symbol: String;
    name: String;
    exch: String;
    type: String;
    exchDisp: String;
    typeDisp: String;
  };
export default class Main extends Component <props, state> {
    constructor(props) {
        super(props);
        this.autoCompleteChangehandler = this.autoCompleteChangehandler.bind(this);
        this.autoCompleteClickhandler = this.autoCompleteClickhandler.bind(this);
        this.state = {
            userInput: '',
            filteredSuggestions: [],
            showSuggestions: false,
            userSelection: '',
            toggleView: true
        }
    }
    componentDidMount() {}
    render() {
        return <>
            <Autocomplete 
                autoCompleteChangehandler={this.autoCompleteChangehandler}
                autoCompleteClickhandler={this.autoCompleteClickhandler}
                suggestions={this.state.filteredSuggestions}
                showSuggestions={this.state.showSuggestions}
                userInput={this.state.userInput}
                >
            </Autocomplete>
            {!this.state.toggleView && <StockCharts></StockCharts>}
            {this.state.toggleView && <GridHistory />}
        </>;
    }
    // Handle Methods and APIs
    autoCompleteChangehandler = (e) => {        
        this.setState({userInput: e.currentTarget.value});
        if(!e.currentTarget.value) {
            return;
        }
        axios.get(`/api/stocks?input=${e.currentTarget.value}`)
        .then((res)=>{
          this.setState({
            filteredSuggestions: res.data,
            showSuggestions: true,
          });
        }).catch(e => {
          console.error(e);
        });
    }
    autoCompleteClickhandler = (e) => {
        debugger;
        this.setState({showSuggestions: false, userInput: ''});
        this.fetchChartData(e)
    }
    fetchChartData = (e) => {
        debugger;
        console.log(e);
    }
}