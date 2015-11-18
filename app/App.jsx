import ReactDOM from 'react-dom'
import moment from 'moment'
import 'semanticJS'
import 'semanticCSS'
import './app.styl'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      data: require('res/dist/beef2.json'),
      cur_time: null
    }
  }
  render() {
    return <div id='app'>
      <a id='forkme' target='_blank' href="https://github.com/mouther/beef-now"><img src={require('res/image/fork-me.png')} alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png" /></a>
      <button id='start' className='center' onClick={() => this.setState({cur_time: moment()})}>
        start
      </button>
      <table className='beefs center ui celled table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Opne Time</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
        { 
          this.state.cur_time ?
            this.state.data.filter(e => {
              if(!e.openTime[this.state.cur_time.format("ddd")][0]) return false

              var endTime
              var timeArray = e.openTime[this.state.cur_time.format("ddd")][0].split("-")
              var startTime= timeArray[0]
              if(!timeArray[1]) endTime = "24:00"
              else endTime = timeArray[1]

              return this.state.cur_time.isBetween(moment(startTime, 'H:m'), moment(endTime, 'H:m'))
             }).map(e => <tr> 
                <td>{e.title}</td> 
                <td>{e.價格}</td> 
                <td>{e.openTime[this.state.cur_time.format("ddd")].map(e => <div className='openTime'>{e}<br /></div> )}</td> 
                <td>{e.地址}</td> 
              </tr>)
          : null }
        </tbody>
      </table>
    </div>
  }
}

ReactDOM.render(<App />, document.getElementsByTagName('body')[0]);

// vi:et:nowrap
