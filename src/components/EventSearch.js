import React from 'react';

class EventSearch extends React.Component {
    
    render() {
        return (
            <div>
                <input type='text' name='search_events' placeholder='Search Events' />
            </div>
        );
    };
};

export default EventSearch;