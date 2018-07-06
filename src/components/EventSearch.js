import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setActiveEvent, setCurrentLocation } from '../reducers/index';

class EventSearch extends React.Component {
    state = {
        searchTerm: '',
        foundEvents: []
    };

    inputControl = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        this.searchEvents(e);
    };

    clearState = () => {
        this.setState({
            searchTerm: '',
            foundEvents: []
        });
    };

    fetchEvents = (searchTerm) => {
        fetch('http://localhost:3000/api/v1/events', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          }
        }).then( response => response.json() ).then(array => {
            const foundEvents = array.filter(event => event.title.toLowerCase().includes(searchTerm.toLowerCase()) && event.user_id !== parseInt(localStorage.getItem('user_id'), 10));
            this.setState({
                foundEvents
            });
        });
    };

    searchEvents = (e) => {
        if (e.target.value === '' || e.target.value === ' '){
            this.clearState(e);
        }else{
            this.fetchEvents(e.target.value);
        };
    };

    exploreEvent = (event) => {
        this.clearState();
        this.props.dispatch(setCurrentLocation('/events/'+event.id));
        this.props.dispatch(setActiveEvent(event));
    };

    render() {
        return (
            <div>
                <input type='text' name='searchTerm' placeholder='Search Events' value={this.state.searchTerm} onChange={this.inputControl} />
                <ul>
                    {this.state.foundEvents.map(event => <li key={event.id}><Link to={'/events/'+event.id} onClick={() => this.exploreEvent(event)}>{event.title}</Link></li>)}
                </ul>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
      activeUser: state.activeUser
    };
  };

export default connect(mapStateToProps)(EventSearch);