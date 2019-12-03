import anecdotesService from "../services/anecdotesService"

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const getId = () => (100000 * Math.random()).toFixed(0)

const reducer = (state = [], action) => {
   switch(action.type) {
     case 'VOTE':
       let upvotedState = state.map(a => a.id !== action.data.id ? a: action.data)
       return sortAnecdotes(upvotedState)
       case 'NEW_ANECDOTE':
          return state.concat(action.data)
       case 'INIT_ANECDOTES': 
          return action.data
      default:
        return state
   }
}

export const upvoteAnecdote = (anecdote) => {
  return async dispatch => {
    const upvotedAnecdote = {
      ...anecdote,
      votes: anecdote.votes +1
    }
    const newAnecdote = await anecdotesService.updateAnecdote(upvotedAnecdote)
    dispatch({
      type: 'VOTE',
      data: newAnecdote
    })
  }
}

export const createAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}
const sortAnecdotes = (anecdotes) => {
  return anecdotes.sort((a, b) => (b.votes) - (a.votes))
}

export default reducer