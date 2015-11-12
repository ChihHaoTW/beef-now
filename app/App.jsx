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
      <button id='start' className='center' onClick={() => this.setState({cur_time: moment()})}>
        start
      </button>
      <table className='beefs center ui celled table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          { this.state.cur_time ?
            this.state.data.filter(e => this.state.cur_time.isBetween(moment(e.startTime, 'H:m'), moment(e.endTime, 'H:m')))
              .map(e => <tr> 
                <td>{e.title}</td> 
                <td>{e.價格}</td> 
                <td>{e.startTime}</td> 
                <td>{e.endTime}</td> 
                <td>{e.地址}</td> 
              </tr>) : null }
        </tbody>
      </table>
    </div>
  }
}

ReactDOM.render(<App />, document.getElementsByTagName('body')[0]);

// vi:et:nowrap
