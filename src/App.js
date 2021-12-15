/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import V3cFilter from "./V3C_Find";
import V3cEdit from "./V3C_Edit";

const columnDefs = [
    {
        headerName: "Id",
        field: "id",
        cellRenderer: "idRenderer",
    },
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "email" },
];

const defaultColDef = {
    editable: false,
    flex: 1,
    filter: false,
    sortable: true,
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            filterData: [],
            name: "",
            id: "",
            sname: "",
            sid: "",
            ename: "",
            eid: "",
            filtering: false,
            filtered: false,
            showEdit: false,
            svalues: {
                id: '',
                name: ''
            }
        };
        this.setState = this.setState.bind(this);
    }

    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    };

    onBtnExport = () => {
        this.gridApi.exportDataAsCsv();
    };

    componentDidUpdate() {
        if (this.state.filtering) {
            let filterd = false;
            if(this.state.id  !== '' || this.state.name !== ''){
                filterd = true
            }
            const fd = this.state.data.filter((i) => {
                return (
                    i.name.toLowerCase().includes(this.state.name) &&
                    i.id.toString().includes(this.state.id.toString())
                );
            });
            this.setState({
                filterData: fd,
                filtering: false,
                filterd: filterd,
            });
        }
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/comments").then(
            async (res) => {
                const data = await res.json();
                this.setState({
                    data: data,
                    filterData: data,
                });
            }
        );
    }

    showsave = (e) => {
        this.setState({
            sname: e.data.name,
            sid: e.data.id,
            ename: e.data.name,
            eid: e.data.id,
            showEdit: true,
        });
    };

    IdRenderer = (p) => {
        // put the value in bold
        return (
            <span onClick={() => this.showsave(p)} className="idCell">
                {" "}
                {p.value}{" "}
            </span>
        );
    };

    handlefilter = (e) => {
        if(e.target){
            this.setState({
                [e.target.name]: e.target.value.toLowerCase(),
                filtering: true,
            });
            var w = document.querySelector(`[col-id="${e.target.name}"]`);
            const t = w.querySelector(".ag-filter-icon");
            if (e.target.value !== "") {
                t.style = "display:block !important";
            } else {
                t.style.display = "";
            }
        }else{
            var s = document.querySelector(`[col-id=${e}]`);
            const t = s.querySelector(".ag-filter-icon");
            t.style.display = "";
        }
    };

    clearFilter = () => {
        const t = document.querySelectorAll(".ag-filter-icon");
        t.forEach((e) => {
            e.style.display = "";
        });
        this.setState({
            id: "",
            name: "",
            filtering: true,
        });
    };

    handleSave = (e) => {
      console.log(this.state.eid)
        e.preventDefault();
        const item = this.state.data.filter(
            (e) => e.id.toString() === this.state.eid.toString()
        );
        if (item.length < 1) {
            return alert("Row not found");
        }

        // const nData = this.state.data.map((el) =>
        //     el.id === parseInt(this.state.eid)
        //         ? {
        //               ...el,
        //               id: parseInt(this.state.sid),
        //               name: this.state.sname,
        //           }
        //         : el
        // );
        this.setState({
            sid: "",
            sname: "",
            showEdit: false,
            svalues: {
                id: this.state.sid,
                name:this.state.sname
            }
        });
        this.clearFilter();
    };

    render() {
        return (
            <div className="App">
                <V3cFilter
                    setState={this.setState}
                    clearFilter={this.clearFilter}
                    handlefilter={this.handlefilter}
                    state={this.state}
                />
                <br></br>
                <br></br>
                {this.state.showEdit ? (
                    <V3cEdit
                        handleSave={this.handleSave}
                        setState={this.setState}
                        state={this.state}
                    />
                ) : (
                    ""
                )}
                <br></br>
                <span>{this.state.svalues.id}</span>
                <br></br>
                <span>{this.state.svalues.name}</span>
                <br></br>
                {this.state.filterData.length > 0 ? (
                    <button onClick={() => this.onBtnExport()}>Export</button>
                ) : (
                    <button disabled>Export</button>
                )}
                <br></br>
                <br></br>
                <div
                    className="ag-theme-balham margin10"
                    style={{ height: "200px", width: "600px" }}
                >
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={this.state.filterData}
                        suppressExcelExport={true}
                        defaultColDef={defaultColDef}
                        onGridReady={this.onGridReady}
                        frameworkComponents={{ idRenderer: this.IdRenderer }}
                    ></AgGridReact>
                </div>
            </div>
        );
    }
}

export default App;
