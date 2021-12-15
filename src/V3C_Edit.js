/* eslint-disable eqeqeq */
import React, { Component } from "react";

export default class W3C_Edit extends Component {
    render() {
        return (
            <>
                <h2>V3C_Edit</h2>
                <form onSubmit={this.props.handleSave}>
                    <div className="width100">
                        {this.props.state.sid != this.props.state.eid ||
                        this.props.state.sname != this.props.state.ename ? (
                            <button type="submit">save</button>
                        ) : (
                            <button disabled>save</button>
                        )}
                    </div>
                    <br />
                    <br />
                    <div className="flex">
                        <p>Id:</p>
                        <input
                            type="number"
                            name="sid"
                            id="sid"
                            value={this.props.state.sid}
                            onChange={(e) =>
                                this.props.setState({ sid: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div className="flex">
                        <p>Name:</p>
                        <input
                            type="text"
                            name="sname"
                            id="sname"
                            value={this.props.state.sname}
                            onChange={(e) =>
                                this.props.setState({ sname: e.target.value })
                            }
                            required
                        />
                    </div>
                </form>
            </>
        );
    }
}
