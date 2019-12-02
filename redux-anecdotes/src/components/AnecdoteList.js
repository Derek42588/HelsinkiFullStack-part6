import React from 'react'
import Anecdote from './Anecdote'
import { connect } from 'react-redux'
import { upvoteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification} from '../reducers/notificationReducer'

const AnecdoteList = ( props) => {
    return(
        <div>
            <h2>Anecdotes</h2>
            {props.anecdotesToShow.map(anecdote => 
                <Anecdote
                    key = { anecdote.id }
                    anecdote = { anecdote} 
                    handleClick = { () => {
                        props.upvoteAnecdote(anecdote.id)
                        setTimeout(() => {
                            props.removeNotification()
                        }, 5000)
                        props.setNotification(`upvoted ${anecdote.content}`)
                    }
                    }
                />
                )}
        </div>
    )
    
}

const anecdotesToShow = ( { anecdotes, filter }) => {
    return anecdotes.filter(anecdote => anecdote.content.includes(filter))
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        anecdotesToShow: anecdotesToShow(state),
        anecdotes: state.anecdotes,
        filter: state.filter,
    }
}

const mapDispatchToProps = {
    setNotification,
    upvoteAnecdote,
    removeNotification
}
const ConnectedAnecdoteList = connect(
    mapStateToProps, mapDispatchToProps
    )(AnecdoteList)

export default ConnectedAnecdoteList