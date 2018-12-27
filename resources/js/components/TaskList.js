import React from 'react';
import axios from 'axios';

export default class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tasks: [], timerId: null };
    }

    componentWillMount() {
        axios
            .get('/api/task')
            .then(response => response.data.map(task => this.setState({ tasks: [
                ...this.state.tasks,
                {
                    id: task.id,
                    target: task.target,
                    duration: task.duration,
                    start: new Date(task.created_at * 1000),
                    finish: this.getFinish(task.created_at * 1000, task.duration),
                    status: task.finished ?
                        'Завершенная' :
                        new Date() > this.getFinish(task.created_at * 1000, task.duration) ?
                        'Просроченная' :
                        'Актуальная'
                }
            ]})));

        const timerId = setInterval(() => {
            this.state.tasks.map((task, index) => {
                if (new Date() > task.finish && task.status != 'Завершенная') this.state.tasks[index].status = 'Просроченная';
            });
            this.forceUpdate();
        }, 1000);
        this.setState({ timerId: timerId });
    }

    componentWillUnmount() {
        clearInterval(this.state.timerId);
    }

    getFinish(milliseconds, minutes) {
        let date = new Date(milliseconds);
        date.setMinutes(date.getMinutes() + minutes);
        return date;
    }

    getDate(date) {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear() % 100;
        let hours = date.getHours();
        let minutes = date.getMinutes();
        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;
        if (year < 10) year = '0' + year;
        if (minutes < 10) minutes = '0' + minutes;
        return hours + ':' + minutes + ' ' + day + '.' + month + '.' + year;
    }

    editTask(id) {
        this.props.history.push('/' + id);
    }

    deleteTask(id) {
        axios.delete('/api/task/' + id);
        this.state.tasks.map((task, index) => {
            if (task.id == id) delete this.state.tasks[index];
        });
        this.forceUpdate();
    }

    finishTask(id) {
        axios.post('/api/end/' + id);
        this.state.tasks.map((task, index) => {
            if (task.id == id) this.state.tasks[index].status = 'Завершенная';
        });
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <div className="table-responsive">
                    <table className="table">
                        <thead >
                        <tr>
                            <th>Цель</th>
                            <th>Начало</th>
                            <th>Конец</th>
                            <th>Продолжительность</th>
                            <th>Статус</th>
                            <th colSpan="3"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.tasks.map(task => (
                            <tr>
                                <td>{task.target}</td>
                                <td>{this.getDate(task.start)}</td>
                                <td>{this.getDate(task.finish)}</td>
                                <td>{task.duration}</td>
                                <td>{task.status}</td>
                                <td>{task.status != 'Завершенная' ? <button
                                    className="btn btn-secondary"
                                    onClick={() => this.editTask(task.id)}
                                >Редактировать</button> : ''
                                }</td>
                                <td><button
                                    className="btn btn-danger"
                                    onClick={() => this.deleteTask(task.id)}
                                >Удалить</button></td>
                                <td>{task.status == 'Актуальная' ?
                                    <button
                                        className="btn btn-success"
                                        onClick={() => this.finishTask(task.id)}
                                    >Завершить</button> : ''
                                }</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}