import { useState } from "react";
import { NewTodoProps } from "../../model/props";
import { Item } from "../../model/types";
import "./new-todo.css";

const NewTodo = ({ list, setList }: NewTodoProps) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (input.length) {
      if (event.key === "Enter") {
        if (!findItem(input)) {
          setList([
            ...list,
            { title: input, editing: false, completed: false },
          ]);
          setInput("");
        }
      } else if (event.key === "Escape") {
        setInput("");
      }
    }
  };

  const findItem = (title: string) => {
    return list.find(
      (item: Item) => item.title.toLowerCase() === title.toLowerCase()
    );
  };

  return (
    <div>
      <input
        onKeyDown={(e) => handleKeyDown(e)}
        onChange={(e) => setInput(e.target.value)}
        className="new-todo"
        value={input}
        placeholder="What needs to be done?"
        autoFocus
      />
    </div>
  );
};

export default NewTodo;
