import React, { Component } from 'react';
import _ from 'lodash';
import {
  Task,
} from './_index';

export default  class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 'all',
      allTags: [],
    }

    this.selectTab = this.selectTab.bind(this);
  }

  getTabClass(tab) {
    return this.state.tab === tab ? 'tab open' : 'tab';
  }

  selectTab(e, tab) {
    e.preventDefault();
    this.setState({ tab });
  }

  renderTabs() {
    return this.props.tasks.reduce((memo, task) => {
      if (task.tags)
        return [...memo, ...task.tags]
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
    return this.props.tasks.map((task, i) => {
      var tags = task.tags ? task.tags.join(' ') : '';
      var name = task.taskName;
      if (this.state.tab !== 'all' && task.tags.indexOf('#' + this.state.tab) < 0)
        return null;
      return (
        <Task
          key={_.uniqueId()}
          position={i}
          name={name}
          tags={tags}
          closed={task.status === 'closed'}
          running={this.props.running}
        />
      );
    });
  }

  render() {
    return (
      <div
        className="task-manager"
      >
      <div>
        <button
          className={this.getTabClass('all')}
          onClick={(e) => this.selectTab(e, 'all')}
        >all</button>
        {this.renderTabs()}
      </div>
        {this.renderTasks()}
      </div>
    );
  }
}