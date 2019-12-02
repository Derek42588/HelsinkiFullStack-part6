import React from 'react'
import { connect } from 'react-redux'

const Notification = ( props ) =>{
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  
  let notification = props.notification

  if (notification === '') {
    return null
  } else {
  return (
    <div style={style}>
      {notification}
    </div>
  )
}
}

const mapStateToProps = (state) => {
  return {
    notification: state.notifications
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification