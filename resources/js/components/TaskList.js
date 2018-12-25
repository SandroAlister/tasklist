import React from 'react';
import axios from 'axios';

export default class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tasks: [] };
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
                    status: task.status
                }
            ]})));
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

    updateTaskList() {
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
                        status: task.status
                    }
                ]})));
    }

    render() {
        return (
            <div>
                <button onClick={this.updateTaskList}>Обновить</button>
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
                                <td><button onClick={() => this.editTask(task.id)}>Редактировать</button></td>
                                <td><button onClick={() => this.deleteTask(task.id)}>Удалить</button></td>
                                <td><button onClick={() => this.finishTask(task.id)}>Завершить</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}