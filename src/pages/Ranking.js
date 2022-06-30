import React from 'react';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  render() {
    return (
      <main>
        <h1 data-testid="ranking-title">Ranking</h1>
      </main>
    );
  }
}

export default connect()(Ranking);
