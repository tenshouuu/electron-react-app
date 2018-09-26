import { UPDATE_TEST} from '../reducers/consts';


export const boundUpdateTest = profiles => (dispatch) => dispatch(updateTest(profiles))

/*
 * action creators
 */

export function updateTest(profiles) {
    return {
        type: UPDATE_TEST,
        profiles
    }
}
