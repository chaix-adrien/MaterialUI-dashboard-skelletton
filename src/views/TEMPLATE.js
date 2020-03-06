import React from 'react';
import withReducer from "redux/withReducers"
class TEMPLATE extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() { }
  componentWillUnmount() { }

  render() {
    const c = this.props.classes
    return (<div className={c.container}>

    </div>)
  }
}

const styles = theme => ({
  container: {
  }
})

export default withReducer(TEMPLATE)