export { handleServerError }

function handleServerError(err) {
  if (process.env.NODE_ENV !== 'production') {
    console.error('Error', err) // eslint-disable-line
  }
  alert('Server error, Please check your internet connection or contact administrator for more info!!!')
}
