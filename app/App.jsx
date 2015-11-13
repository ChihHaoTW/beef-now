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
      <a id='forkme' target='_blank' href="https://github.com/mouther/beef-now"><img src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png" /></a>
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
          { 
            this.state.cur_time ?
            this.state.data.filter(e => {
              var startTime, endTime, timeArray;
              //console.log(e.openTime[this.state.cur_time.format("ddd")]);
              if(e.openTime[this.state.cur_time.format("ddd")][0] != null)
                timeArray = e.openTime[this.state.cur_time.format("ddd")][0].split("-");
              
              startTime= timeArray[0];
              if(timeArray[1] == null) endTime = "24:00";
              else endTime = timeArray[1];

              return this.state.cur_time.isBetween(moment(startTime, 'H:m'), moment(endTime, 'H:m'));
              
             }).map(e => <tr> 
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
