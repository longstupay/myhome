import { Component } from 'react'
import './app.scss'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux';

const reducers = combineReducers({
  thread: (state:{}={}, action) => {
    if (action.type === 'SET_CURRENT_THREAD') {
      return {
        ...state,
        ...action.thread
      }
    }
    return state
  },
  atgird: (name:{}={}, action) => {
    if (action.type === 'SET_CURRENT_NAME') {
      return {
        ...name,
        ...action.atgird
      }
    }
    return name
  }
})

const store = createStore(reducers)

class App extends Component {
  // this.props.children 是将要会渲染的页面
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
