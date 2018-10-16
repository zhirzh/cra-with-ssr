import React, { Component } from 'react';

class ParaPage extends Component {
  render() {
    return (
      <div>
        <h1>ParaPage</h1>

        <pre>
          {JSON.stringify(this.props.match.params, null, 2)}
        </pre>
      </div>
    );
  }
}

export default ParaPage;
