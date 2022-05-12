import { Link } from "react-router-dom";
import { FooterProps } from "../model/props";
import { Item } from "../model/types";

const Footer = ({ list, setList, filter }: FooterProps) => {
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
          <Link to="/" className={!filter ? "selected" : ""}>
            All
          </Link>
        </li>
        <li>
          <Link to="/active" className={filter === "active" ? "selected" : ""}>
            Active
          </Link>
        </li>
        <li>
          <Link
            to="/completed"
            className={filter === "completed" ? "selected" : ""}
          >
            Completed
          </Link>
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
