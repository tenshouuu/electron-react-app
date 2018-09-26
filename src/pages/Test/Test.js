import React from 'react'
import {connect} from 'react-redux'

import styles from './Test.css'
import logo from '../../assets/img/logo.png'

class Test extends React.Component {

  render() {
    return (
      <div className={styles.Test}>
        <img src={logo} alt=""/>
        <div>Redux: <span>{this.props.test.text}</span></div>
      </div>
    )
  }
}

export default connect(
  (state) => {
    const { test } = state;
    return { test };
  }
)(Test)
