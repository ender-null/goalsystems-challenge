import { FooterProps } from "../model/props";
import { Item } from "../model/types";

const Footer = ({ list, setList }: FooterProps) => {
  const count = () => {
    return list.filter((item: Item) => !item.completed).length;
  };

  const clearCompleted = () => {
    const _list = list.filter((item: Item) => !item.completed);
    setList(_list);
  };

  return (
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
      {count() !== list.length && (
        <button onClick={() => clearCompleted()} className="clear-completed">
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default Footer;
