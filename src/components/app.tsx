import { useState } from "react";
import { Item } from "../model/types";

const App = () => {
  const [list, setList] = useState<Item[]>([]);
  const [input, setInput] = useState("");
  const [itemInput, setItemInput] = useState("");

  const isItemSelected = (item: Item) => {
    return item.completed;
  };

  const toggleAll = () => {
    const _list = [...list];
    setList(
      _list.map((item: Item) => {
        return { ...item, completed: !allItemsCompleted() };
      })
    );
  };

  const toggle = (item: Item) => {
    const _list = [...list];
    _list[list.indexOf(item)].completed = !isItemSelected(item);
    setList(_list);
  };

  const destroy = (event: React.KeyboardEvent<HTMLInputElement>|React.MouseEvent<HTMLDivElement, MouseEvent>, item: Item) => {
    const _list = [...list];
    _list.splice(list.indexOf(item), 1);
    setList(_list);
    event.stopPropagation();
  };

  const count = () => {
    return list.filter((item: Item) => !item.completed).length;
  };

  const clearCompleted = () => {
    const _list = list.filter((item: Item) => !item.completed);
    setList(_list);
  };

  const allItemsCompleted = () => {
    return list.every((item: Item) => item.completed);
  };

  const itemClassName = (item: Item) => {
    if (item.editing) {
      return "editing";
    } else if (isItemSelected(item)) {
      return "completed";
    }
    return "";
  };

  const itemClick = (item: Item) => {
    const _list = list.map((_item) => {
      return { ..._item, editing: _item.title === item.title };
    });
    setList(_list);
    setItemInput(item.title);
  };

  const itemSave = (item: Item) => {
    const _list = [...list];
    _list.splice(_list.indexOf(item), 1, {
      ...item,
      title: itemInput,
      editing: false,
    });
    setList(_list);
  };

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

  const handleKeyDownItem = (event: React.KeyboardEvent<HTMLInputElement>, item: Item) => {
    if (event.key === "Enter") {
      if (itemInput.length) {
        itemSave(item);
      } else {
        destroy(event, item);
      }
    } else if (event.key === "Escape") {
      const _list = [...list];
      _list.splice(_list.indexOf(item), 1, { ...item, editing: false });
      setList(_list);
    }
  };

  const findItem = (title: string) => {
    return list.find(
      (item: Item) => item.title.toLowerCase() === title.toLowerCase()
    );
  };

  return (
    <div className="todoapp">
      <header>
        <h1>TODOS</h1>
      </header>
      <div className="new-todo">
        <input
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => setInput(e.target.value)}
          className="new-todo"
          value={input}
          autoFocus
        />
      </div>

      {list.length > 0 && (
        <main id="main" className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={() => toggleAll()}
            checked={allItemsCompleted()}
          />
          <label htmlFor="toggle-all" />
          <ul className="todo-list">
            {list.map((item, i) => (
              <li key={`task-${i}`} className={itemClassName(item)}>
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    id={`task-${i}`}
                    checked={isItemSelected(item)}
                    onChange={() => toggle(item)}
                  />
                  <label onDoubleClick={() => itemClick(item)}>
                    {item.title}
                    <div
                      className="destroy"
                      onClick={(e) => destroy(e, item)}
                    />
                  </label>
                </div>
                <input
                  value={itemInput}
                  onChange={(e) => setItemInput(e.target.value)}
                  className="edit"
                  onBlur={() => itemSave(item)}
                  onKeyDown={(e) => handleKeyDownItem(e, item)}
                  type="text"
                  autoFocus
                />
              </li>
            ))}
          </ul>
        </main>
      )}

      {list.length > 0 && (
        <footer id="footer" className="footer">
          <span className="todo-count">
            <strong>{count()}</strong> {count() !== 1 ? "items" : "item"} left
          </span>
          <ul className="filters">
            <li>
              <a href="/" className="selected">
                All
              </a>
            </li>
            <li>
              <a href="/active">Active</a>
            </li>
            <li>
              <a href="/completed">Completed</a>
            </li>
          </ul>
          <button onClick={() => clearCompleted()} className="clear-completed">
            Clear completed
          </button>
        </footer>
      )}
    </div>
  );
};

export default App;
