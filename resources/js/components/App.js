import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import TaskList from './TaskList';
import AddTask from './AddTask';
import NotFound from './NotFound';
import Task from './Task';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Link to="/">Главная</Link>
                    <Link to="/add">Добавить</Link>
                    <Switch>
                        <Route path="/" exact component={TaskList}/>
                        <Route path="/add" exact component={AddTask}/>
                        <Route path="/error404" exact component={NotFound}></Route>
                        <Route path="/:id" exact render={p => <Task{...p}/>}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App/>, document.getElementById('app'));
}