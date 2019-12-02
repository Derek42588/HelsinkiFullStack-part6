import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe ('anecdoteReducer', () => {

    const anecdotesAtStart = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
      ]
      
      const getId = () => (100000 * Math.random()).toFixed(0)
      
      const asObject = (anecdote) => {
        return {
          content: anecdote,
          id: getId(),
          votes: 0
        }
      }
      
      const initialState = anecdotesAtStart.map(asObject)

    test('returns default state with undefined initial', () => {
        const state = {}
        const action = {
            type: 'BLANK',
            data: {
                content: 'blank'
            }
        }
        deepFreeze(state)

        const newState = anecdoteReducer(undefined, action)
        expect(newState.length).toBe(6)

    })
    test('upvotes anecdote correctly', () => {
        const state = initialState
        const anecdoteToUpvote = state[0].id

        const action = {
            type: 'VOTE',
            data: { 
                id: anecdoteToUpvote
            }
        }

        deepFreeze(state)
        const newState = anecdoteReducer(state, action)
        const anecdote = newState.find(a => a.id === anecdoteToUpvote)
        
        expect(anecdote.votes).toEqual(1)
    })
    test('add anecdote correctly', () => {
        const state = initialState
        const action = {
            type: 'NEW_ANECDOTE',
            data: {
                content: 'testing is really important',
                id: getId(),
                votes: 0
            }
        }
        deepFreeze(state)

        const newState = anecdoteReducer(state, action)
        expect(newState.length).toBe(initialState.length + 1)
        expect(newState).toContainEqual(action.data)
    })
    test('test that sort works', () => {
        const state = initialState
        const anecdoteToUpvote = state[3].id
        const action = {
            type: 'VOTE',
            data: {
                id: anecdoteToUpvote
            }
        }
        deepFreeze(state)

        const sortedAndUpvotedState = anecdoteReducer(state, action)
        expect(sortedAndUpvotedState[0].id).toEqual(anecdoteToUpvote)
        })
})