import anecdoteService from '../services/anecdote'

const reducer = (store = [], action) => {
  switch(action.type) {
  case 'VOTE':
    const old = store.filter(a => a.id !==action.data.id)
    let voted = store.find(a => a.id === action.data.id)

    voted = { ...voted}

    return [...old,  voted]
  case 'CREATE':
    return [...store, action.data]
  
  case 'INIT_ANECDOTES':
    return action.data
  }

  return store
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.addNew(content)
    dispatch({
      type: 'CREATE',
      data: anecdote
    })
  }
}

export const vote = (anecdote) => {
  return async (dispatch) => {
    anecdote.votes += 1
    await anecdoteService.update(anecdote)
    dispatch({
      type: 'VOTE',
      data: anecdote
    })
  }
}

export default reducer