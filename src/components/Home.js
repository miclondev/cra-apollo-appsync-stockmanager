import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { withAuthenticator } from 'aws-amplify-react';

class Home extends Component {
  render() {
    return (
      <div className="right">
          <Segment>
          Home
          </Segment>
      </div>
    );
  }
}

export default withAuthenticator(Home);