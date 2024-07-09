type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key:string]: any
}




export const userReducer = (state: StateType, action: ActionType): StateType => {



    switch (action.type) {
        case "INC_AGE":
            let newState = {...state};
            newState.age = state.age + 1;
            return newState;
        case "INC_CHILDREN_COUNT":
            return {
                ...state,
                childrenCount: state.childrenCount + 1
            }
           /* let newState = {...state};
            newState.childrenCount = state.childrenCount + 1;
            return newState;*/
        case "CHANGE_NAME":
            return {
                ...state,
                name: action.newName
            }
        default:
            throw new Error( 'I dont understand this action type')
    }
}