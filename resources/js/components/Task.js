import React from 'react';
import axios from 'axios';

export default class DataUser extends React.Component {
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
                <button onClick={this.update}>Изменить</button>
            </form>
        );
    }
}