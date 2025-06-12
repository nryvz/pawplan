import paw from '/paw3.png';
import { useState, useEffect } from "react";


type Todo = {
  id: number;
  text: string;
  completed: boolean;
  date: string;
};

 function App() {
  const today = new Date().toISOString().split("T")[0];

  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false,
      date: today
    };

    setTodos([...todos, newTodo]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const todaysTodos = todos.filter((todo) => todo.date === today);

  return (
    <>
      <header>
        <div className="header_image">
          <img className="paw" src="paw1.png" alt="" />
          <img className="catsit" src="catsit.png" alt="" />
          <img className="paw" src="paw2.png" alt="" />
        </div>
        <div className="title">
          <h1>PawPlan</h1>
        </div>
      </header>
      <main>
        <div className="main">
          <div className="task_add">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Bir görev ekle"
              className="task"
            />
            <button className="add" onClick={addTodo}>
              Ekle
            </button>
          </div>
            <ul className="todo-list">
              {todaysTodos.map((todo) => (
                <li key={todo.id} className={todo.completed ? "done" : ""}>
                  <span onClick={() => toggleTodo(todo.id)}><div className="list_div"><img className="list_paw" src={paw}/> {todo.text}</div></span>
                  <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
                </li>
              ))}
            </ul>
        </div>
        <div className="cat_sleep"><img className="paw" src="paw1.png" alt="" /><img src="catsleep.png" alt=""  className="sleep"/><img className="paw" src="paw2.png" alt="" /></div>
      </main>
    </>
  );
}

export default App;
