import ReactDOM from 'react-dom'
import moment from 'moment'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      cur_time: moment()
    }
  }
  render() {
    return <div id='app'>
      {this.state.cur_time.format('H:m')}
    </div>
  }
}

ReactDOM.render(<App />, document.getElementsByTagName('body')[0]);

// vi:et:nowrap
