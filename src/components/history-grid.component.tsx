import React, {Component} from "react";
import { render } from "react-dom";
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import axios from "axios";

import {history} from './stockchart';

interface props {};
interface state {
  rowData: Array<history>
};

export default class GridHistory extends Component<props, state> {
    constructor(props) {
        super(props);
        this.state = {
            rowData: []
        }
    }
    
    componentDidMount() {
        axios.get(`/api/history?symbol=amzn`) // amzn, msft, aapl, fb, nflx
        .then((res)=>{
            this.setState({rowData: res.data[0].history});
        }).catch(e => {
            console.error(e);
            this.setState({rowData: []});
        }); 
    }
    render() {
        const rowData = this.state.rowData;

        return <div style={{textAlign: 'center'}}>
            <h1>grid</h1>
            <div className="ag-theme-alpine" style={{height: 400, width: '90%', margin:'auto'}}>
                <AgGridReact rowData={rowData}>
                    <AgGridColumn field="Date"></AgGridColumn>
                    <AgGridColumn field="Open"></AgGridColumn>
                    <AgGridColumn field="High"></AgGridColumn>
                    <AgGridColumn field="Low"></AgGridColumn>
                    <AgGridColumn field="Close"></AgGridColumn>
                    <AgGridColumn field="Adj Close"></AgGridColumn>
                    <AgGridColumn field="Volume"></AgGridColumn>
                </AgGridReact>
            </div>
        </div>;
    };    
}