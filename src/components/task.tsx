import { useState } from "react";
import { TaskProps } from "../model/props";

const Task = ({ list, setList, item }: TaskProps) => {
  const [itemInput, setItemInput] = useState<string>("");

  const toggle = () => {
    const _list = [...list];
    _list[list.indexOf(item)].completed = !item.completed;
    setList(_list);
  };

  const destroy = (event: React.UIEvent) => {
    const _list = [...list];
    _list.splice(list.indexOf(item), 1);
    setList(_list);
    event.stopPropagation();
  };

  const className = () => {
    if (item.editing) {
      return "editing";
    } else if (item.completed) {
      return "completed";
    }
    return "";
  };

  const itemClick = () => {
    const _list = list.map((_item) => {
      return { ..._item, editing: _item.title === item.title };
    });
    setList(_list);
    setItemInput(item.title);
  };

  const itemSave = () => {
    console.log("itemSave", itemInput);
    const _list = [...list];
    _list.splice(_list.indexOf(item), 1, {
      ...item,
      title: itemInput,
      editing: false,
    });
    setList(_list);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (itemInput.length) {
        itemSave();
      } else {
        destroy(event);
      }
    } else if (event.key === "Escape") {
      const _list = [...list];
      _list.splice(_list.indexOf(item), 1, { ...item, editing: false });
      setList(_list);
      setItemInput(item.title);
    }
  };

  return (
    <li className={className()}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={item.completed}
          onChange={() => toggle()}
        />
        <label onDoubleClick={() => itemClick()}>
          {item.title}
          <div className="destroy" onClick={(e) => destroy(e)} />
        </label>
      </div>
      <input
        value={itemInput}
        onChange={(e) => setItemInput(e.target.value)}
        className="edit"
        onBlur={() => itemSave()}
        onKeyDown={(e) => handleKeyDown(e)}
        type="text"
        autoFocus
      />
    </li>
  );
};

export default Task;
