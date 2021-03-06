import React, { Component } from 'react';
import _ from 'lodash';
import {
  Task,
  // TaskBar,
} from './_index';

export default  class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 'all',
      allTags: [],
      status: 'all',
    }

    this.selectTab = this.selectTab.bind(this);
    this.selectStatus = this.selectStatus.bind(this);
  }

  getTabClass(tab) {
    return this.state.tab === tab ? 'tab open' : 'tab';
  }

  selectTab(e, tab) {
    e.preventDefault();
    this.setState({ tab });
  }

  selectStatus(status) {
    this.setState({ status });
  }

  renderTabs() {
    return this.props.tasks.reduce((memo, task) => {
      if (task.tags)
        task.tags.forEach(tag => {
          if (memo.indexOf(tag) < 0)
            memo.push(tag);
        });
      return memo;
    }, [])
    .map(tabName => {
      tabName = tabName.slice(1);
      return (
        <button
          className={this.getTabClass(tabName)}
          onClick={(e) => this.selectTab(e, tabName)}
          key={_.uniqueId()}
        >{tabName}</button>
      );
    });
  }

  renderTasks() {
    const open = [];
    const closed = [];
    this.props.tasks.forEach((task, i) => {
      const tags = task.tags ? task.tags.join(' ') : '';
      const name = task.taskName;
      if (this.state.tab !== 'all' && task.tags.indexOf('#' + this.state.tab) < 0)
        return null;
      if (this.state.status !== 'all' && task.status !== this.state.status)
        return null;
      const taskEl = (
        <Task
          key={_.uniqueId()}
          position={i}
          name={name}
          tags={tags}
          closed={task.status === 'closed'}
          running={this.props.running}
        />
      );
      task.status === 'closed' ? closed.push(taskEl) : open.push(taskEl);
    });
    return [...open, ...closed];
  }

  render() {
    return (
      <div
        className="task-manager"
      >
        <div
          className="status-form"
        >
          <div
            onClick={() => this.selectStatus('all')}
            className={this.state.status === 'all' ? 'selected' : null}
          >
            <p>all</p>
          </div>
          <div
            onClick={() => this.selectStatus('open')}
            className={this.state.status === 'open' ? 'selected' : null}
          >
            <p>open</p>
          </div>
          <div
            onClick={() => this.selectStatus('closed')}
            className={this.state.status === 'closed' ? 'selected' : null}
          >
            <p>closed</p>
          </div>
        </div>
        <div
          className="tabs-box"
        >
          <button
            className={this.getTabClass('all')}
            onClick={(e) => this.selectTab(e, 'all')}
          >all</button>
          {this.renderTabs()}
        </div>
        <div
          className="task-list"
        >
          {this.renderTasks()}
        </div>
      </div>
    );
  }
}