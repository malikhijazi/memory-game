import React from 'react';
import prettyMs from 'pretty-ms';

export default class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      start: Date.now(),
      time: 0
    }
  }

  componentDidMount() {
    this.timer = setInterval(this.incrementTime, 1000);
  }

  incrementTime = () => {
    this.setState(state => ({ time: Date.now() - state.start }));
  }

  render() {
    return <div id='timer'>{ prettyMs(this.state.time) }</div>;
  }
}