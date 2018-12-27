import React from 'react';
import axios from 'axios';

export default class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = { target: '', duration: ''};
        this.input = this.input.bind(this);
        this.add = this.add.bind(this);
    }

    input(e) { this.setState({ [e.target.name]: e.target.value }); }

    add(e) {
        if (e.target.checkValidity()) {
            e.preventDefault();
            axios.post('/api/task', {
                target: this.state.target,
                duration: this.state.duration
            });
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <form>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Цель</span>
                    </div>
                    <input
                        className="form-control"
                        name="target"
                        value={this.state.target}
                        onChange={this.input}
                        required
                    />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Продолжительность</span>
                    </div>
                    <input
                        className="form-control"
                        name="duration"
                        value={this.state.duration}
                        onChange={this.input}
                        required
                        type="number"
                    />
                </div>

                <button className="btn btn-success" onClick={this.add}>Добавить</button>

            </form>
        );
    }
}