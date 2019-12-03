import React from 'react'
import Anecdote from './Anecdote'
import { connect } from 'react-redux'
import { upvoteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ( props) => {
    return(
        <div>
            <h2>Anecdotes</h2>
            {props.anecdotesToShow.map(anecdote => 
                <Anecdote
                    key = { anecdote.id }
                    anecdote = { anecdote} 
                    handleClick = { () => {
                        props.upvoteAnecdote(anecdote)
                        // setTimeout(() => {
                        //     props.removeNotification()
                        // }, 5000)
                        props.setNotification(`upvoted ${anecdote.content}`, 10)
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
    return {
        anecdotesToShow: anecdotesToShow(state),
        anecdotes: state.anecdotes,
        filter: state.filter,
    }
}

const mapDispatchToProps = {
    setNotification,
    upvoteAnecdote,
}
const ConnectedAnecdoteList = connect(
    mapStateToProps, mapDispatchToProps
    )(AnecdoteList)

export default ConnectedAnecdoteList