import 'bootstrap/dist/css/bootstrap.min.css';

const Message = ({ message, type }) => {
  // const messageStyle = {
  //   color: type === 'error' ? 'red' : 'green',
  //   fontStyle: 'italic',
  //   fontSize: 16,
  //   border: `1px solid ${type === 'error' ? 'red' : 'green'}`,
  //   padding: '5px',
  //   marginBottom: '10px'
  // }
  return (
    message && (
      <div
        className={`alert ${type === 'error' ? 'alert-danger' : 'alert-success'} mt-3`}
        role="alert"
      >
        {message}
      </div>
    )
  );
}

export default Message