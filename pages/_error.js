import React from 'react'

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    debugger
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render() {
    return (
      <p>
        {this.props.statusCode
          ? <h2>An error {this.props.statusCode} occurred on server</h2>
          : 'An error occurred on client'}
      </p>
    )
  }
}

export default Error