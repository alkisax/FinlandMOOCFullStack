const Notification = ({ message, notStatus }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    color: 'white',
    textAlign: 'center',
    backgroundColor: notStatus === 'green' ? 'green' : 'red',
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification