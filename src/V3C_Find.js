import React, { Component } from "react";

export default class W3C_Filter extends Component {
    render() {
        return (
            <>
            <h2>V3C_Find</h2>
            <div className='form'>
                <div className='width100'>
                {this.props.state.filterd ? (
                    <button onClick={this.props.clearFilter}>
                        clear filter
                    </button>
                ) : (
                    <button disabled>clear filter</button>
                )}
                </div>
                <br />
                <br />
                <div className="flex">
                    <p
                        onClick={() =>
                            {this.props.setState({ id: "", filtering: true })
                            this.props.handlefilter('id')
                        }
                        }
                        className={this.props.state.id && "link"}
                    >
                        Id:
                    </p>
                    <input
                        type="number"
                        name="id"
                        id="id"
                        value={this.props.state.id}
                        onChange={this.props.handlefilter}
                    />
                </div>
                <div className="flex">
                    <p
                        onClick={() =>
                            {this.props.setState({ name: "", filtering: true })
                            this.props.handlefilter('name')
                        }
                        }
                        className={this.props.state.name && "link"}
                    >
                        Name:
                    </p>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={this.props.state.name}
                        onChange={this.props.handlefilter}
                    />
                </div>
            </div>
            </>
        );
    }
}
