import {userReducer} from "./user-reducer";

test('user reducer should increment only age', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Alex'};

    const endState = userReducer(startState, {type: "INC_AGE"})

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);

});

test('user reducer should increment only childrenCount', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Alex'};

    const endState = userReducer(startState, {type: "INC_CHILDREN_COUNT"})

    expect(endState.childrenCount).toBe(3);
    expect(endState.age).toBe(20);
});

test('user reducer should change name of user', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Alex'};
    const newName = 'Maxim';
    const endState = userReducer(startState, {type: "CHANGE_NAME", newName: newName})

    expect(endState.name).toBe(newName);
});