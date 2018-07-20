import React from 'react'
import {connect} from 'react-redux'
import {vote} from '../reducers/anecdoteReducer'
import {notify} from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  voteHandler = (anecdote) => () => {
    this.props.vote(anecdote)
    this.props.notify(`you voted '${anecdote.content}'`, 5)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotesToShow.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.voteHandler(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const filterAndSortAnecdotes = (anecdotes, filter) => {
  if (filter === null) {
    return anecdotes
  }

  return anecdotes.filter(anecdote => anecdote
    .content
    .toLowerCase()
    .includes(filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: filterAndSortAnecdotes(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  vote,
  notify
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
