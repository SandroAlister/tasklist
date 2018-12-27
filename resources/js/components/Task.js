import React from 'react';
import axios from 'axios';

export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = { target: '', duration: ''};
        this.input = this.input.bind(this);
        this.update = this.update.bind(this);
    }

    componentWillMount() {
        axios
            .get('/api/task/' + this.props.match.params.id + '/edit')
            .then(response => {
                if (response.data.target) {
                    this.setState({
                        target: response.data.target,
                        duration: response.data.duration
                    });
                } else {
                    this.props.history.push('/error404');
                }
            });
    }

    input(e) { this.setState({ [e.target.name]: e.target.value }); }

    update(e) {
        if (e.target.checkValidity()) {
            e.preventDefault();
            axios.put('/api/task/' + this.props.match.params.id, {
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

                <button className="btn btn-success" onClick={this.update}>Изменить</button>

            </form>
        );
    }
}