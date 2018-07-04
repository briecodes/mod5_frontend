import React from 'react';
import { connect } from 'react-redux';

class EventSearch extends React.Component {
    state = {
        searchTerm: '',
        foundEvents: []
    };

    inputControl = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        this.searchEvents();
    };

    fetchEvents = () => {
        fetch('http://localhost:3000/api/v1/events').then( response => response.json() ).then(array => {
            const foundEvents = array.filter(event => event.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()) && event.user_id !== this.props.activeUser.id);
            this.setState({
                foundEvents
            });
        });
    };

    searchEvents = () => {
        if (this.state.searchTerm === ''){
            this.setState({
                foundEvents: []
            });
        }else{
            this.fetchEvents();
        };
    };

    render() {
        return (
            <div>
                <input type='text' name='searchTerm' placeholder='Search Events' value={this.state.searchTerm} onChange={this.inputControl} />
                <ul>
                    {this.state.foundEvents.map(event => <li key={event.id}>{event.title}</li>)}
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