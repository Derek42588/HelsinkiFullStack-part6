const initialNotification = ''

const notificationReducer = (state = initialNotification, action) => {
    switch(action.type) {
      case 'SET_NOTIFICATION':
          return action.notification
      case 'REMOVE_NOTIFICATION':
          return ''
       default:
         return state
    }
 }

 export const setNotification = (notification, timeOut) => {
     return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            notification
        })
        await setTimeout(() => {
            dispatch({
                type: 'REMOVE_NOTIFICATION',
            })
        }, (timeOut * 1000))
     }
 }

 export const removeNotification = () => {
     return {
         type: 'REMOVE_NOTIFICATION'
     }
 }

 export default notificationReducer