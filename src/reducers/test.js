import { UPDATE_TEST } from './consts';

let initialState = {
   text: 'Hello world!'
}

export default function settings(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TEST:
        return {
            ...{text:action.text}
        }
    default:
      return state
  }
}
