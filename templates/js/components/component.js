import React from 'react';
import Relay from 'react-relay';

class name extends React.Component {
  render() {
    return (
      <div>
        <h1>Widget list</h1>
        <ul>
          {this.props.viewer.widgets.edges.map(edge =>
            <li key={edge.node.id}>{edge.node.name}(ID: {edge.node.id})</li>
          )}
        </ul>
      </div>
    );
  }
}