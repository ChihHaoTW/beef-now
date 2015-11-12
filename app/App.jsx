import ReactDOM from 'react-dom'
import moment from 'moment'
import 'semanticJS'
import 'semanticCSS'
import './app.styl'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      data: require('res/beef2.json'),
      cur_time: null
    }
  }
  render() {
    return <div id='app'>
      <button onClick={() => this.setState({cur_time: moment()})}>
        start
      </button>
      <div>
        { this.state.cur_time ?
          this.state.data.filter(e => this.state.cur_time.isBetween(moment(e.startTime, 'H:m'), moment(e.endTime, 'H:m')))
            .map(e => <h2>{e.title}</h2>) : null }
      </div>
    </div>
  }
}

ReactDOM.render(<App />, document.getElementsByTagName('body')[0]);

// vi:et:nowrap
