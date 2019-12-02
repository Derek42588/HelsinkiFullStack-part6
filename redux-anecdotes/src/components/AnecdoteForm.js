import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        setTimeout(() => {
            props.removeNotification()
        }, 5000)
        props.setNotification(`added new anecdote: ${content}`)
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit = {addAnecdote}>
                <input name = "anecdote" />
                <button type = "submit">create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    createAnecdote,
    setNotification,
    removeNotification
}
const ConnectedAnecdoteForm = connect(
    null, mapDispatchToProps
)(AnecdoteForm)
export default ConnectedAnecdoteForm