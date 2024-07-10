type WorkpieceStateType = {
    any: any
}

type Action1Type = {
    type: 'CASE-NAME-1',
    id: string
}
type Action2Type = {
    type: 'CASE-NAME-2',
    title: string
}
type ActionsType = Action1Type | Action2Type;

export const workpieceReducer = (state: WorkpieceStateType, action: ActionsType): WorkpieceStateType => {
    switch (action.type) {
        case 'CASE-NAME-1': {
            return {...state};
        }
        case 'CASE-NAME-2': {
            return {...state};
        }


        default:
            throw new Error('I dont understand this action type')
    }
}

export const action1AC = (props: string): Action1Type => {
    return {type: 'CASE-NAME-1', id: props}
}
export const action2AC = (title: string): Action2Type => {
    return {type: 'CASE-NAME-2', title}
}
