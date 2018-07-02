import React from 'react';
import { connect } from 'react-redux'

class HomePage extends React.Component {

  state = {
    myEvents: []
  }

  componentDidMount(){
    this.getMyEvents();
  }
  
  getMyEvents = () => {
    fetch('http://localhost:3000/api/v1/events').then( response => response.json() ).then(array => {
      array.forEach(event => {
        if (event.user_id === this.props.userId){
          this.setState({
            myEvents: [...this.state.myEvents, event]
          });
        };
      });
    });
  };

  checkEvents = () => {
    console.log('event state', this.state.myEvents[0].title);
  };

  render() {
    return (
      <div>
        <h1 onClick={this.checkEvents}>HomePage</h1>
        <ul>
          <h3>My Events:</h3>
          {this.state.myEvents.forEach(event => <li>{event.title}</li>)}
        </ul>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    userId: state.userId
  }
}

export default connect(mapStateToProps)(HomePage);