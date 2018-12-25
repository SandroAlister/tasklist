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
                <div>
                    <label>
                        Цель
                        <input
                            name="target"
                            value={this.state.target}
                            onChange={this.input}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Продолжительность
                        <input
                            name="duration"
                            value={this.state.duration}
                            onChange={this.input}
                            required
                            type="number"
                        />
                    </label>
                </div>
                <button onClick={this.add}>Добавить</button>
            </form>
        );
    }
}