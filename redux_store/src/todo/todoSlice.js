import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

// const initialState = {
//   todos: [{ id: 1, text: "hello world" }],
// };
export const todoSlice = createSlice({
  name: "todo",
  initialState: { todos: [{ id: nanoid(), text: "hello world" }] },
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((data) => data.id !== action.payload);
    },
  },
});

//to use the define functionality globally we need to export them 
export const { addTodo, removeTodo } = todoSlice.actions;
// becoz store needs to know about reducer to update the value as store is restrictive
// so it will take list of all reducer
export default todoSlice.reducer;
