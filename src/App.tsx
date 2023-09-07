import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./sass/style.scss";

interface Todo {
  id: string;
  text: string;
}

function App() {
	const [inputValue, setInputValue] = useState<string>("");
	const [todos, setTodos] = useState<Todo[]>([]);
  const [editTodoId, setEditTodoId] = useState<string>('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleSaveClick = () => {
    if (inputValue.trim() === '') {
      alert('Please fill out the input');
      return;
    };
    if (editTodoId !== '') {
      const editedTodos = todos.map((todo) => todo.id === editTodoId? {...todo, text: inputValue} : todo);
      setTodos(editedTodos);
      setEditTodoId('');

    } else{

      const newTodo: Todo = {
        id: uuidv4(),
        text: inputValue,
      };
      setTodos([...todos, newTodo]);
    }

    setInputValue('');
	};

  const handleEditClick = (id: string) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setInputValue(todoToEdit.text);
      setEditTodoId(id);
    }
  }

  const handleDeleteClick = (id: string) => {
    const deletedTodos = todos.filter((todo)=> todo.id != id);
    setTodos(deletedTodos);
  }

	return (
		<>
			<section>
				<div className="main-box">
					<div className="inputs-box">
						<input
							type="text"
							value={inputValue}
							onChange={handleInputChange}
							placeholder="Enter Text..."
						/>
						<button type="button" onClick={handleSaveClick}>
							Save
						</button>
					</div>
					<div className="list">
						<ul>
							{todos.map((todo, index) => (
								<li key={index}>
									<div className="text">
										<p>{todo.text}</p>
									</div>
									<div className="edit">
										<button type="button" onClick={() => handleEditClick(todo.id)}>Edit</button>
									</div>
									<div className="delete">
										<button type="button" onClick={() => handleDeleteClick(todo.id)}>Delete</button>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>
		</>
	);
}

export default App;
