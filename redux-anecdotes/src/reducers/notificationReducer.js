const initialState = null

const reducer = (state = initialState, action) => {
  switch(action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  case 'RESET_NOTIFICATION':
    return null
  }

  return state
}

export const notify = (notification, durationInSeconds = 5) => {
  return async (dispatch)  => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET_NOTIFICATION',
      })
    }, durationInSeconds * 1000)
  }
}

export default reducer