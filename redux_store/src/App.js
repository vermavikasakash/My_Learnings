import AddTodo from "./components/AddTodo";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo } from "./todo/todoSlice";

function App() {

  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1>React Store</h1>

      <AddTodo />

      {/* //?? Data from store */}
      
      <h3>Data from store</h3>
      {todos.map((data) => (
        <li key={data.id}>
          {data.text}
          <button onClick={() => dispatch(removeTodo(data.id))}>X</button>
        </li>
      ))}
    </div>
  );
}

export default App;
