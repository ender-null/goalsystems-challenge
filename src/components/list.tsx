import { ListProps } from "../model/props";
import { Item } from "../model/types";
import Task from "./task";

const List = ({ list, setList, filter }: ListProps) => {
  const allItemsCompleted = () => {
    return list.every((item: Item) => item.completed);
  };

  const toggleAll = () => {
    const _list = [...list];
    setList(
      _list.map((item: Item) => {
        return { ...item, completed: !allItemsCompleted() };
      })
    );
  };

  const filteredList = () => {
    return list.filter((item) => {
      if (filter) {
        return filter === "active" ? !item.completed : item.completed;
      }
      return true;
    });
  };

  return (
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
        {filteredList().map((item, i) => (
          <Task key={i} item={item} list={list} setList={setList} />
        ))}
      </ul>
    </main>
  );
};

export default List;
