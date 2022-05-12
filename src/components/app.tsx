import { useEffect, useState } from "react";
import { Item } from "../model/types";
import Footer from "./footer";
import List from "./list";
import NewTodo from "./new-todo";

const App = () => {
  const [list, setList] = useState<Item[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("list") || "[]");
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <div className="todoapp">
      <header>
        <h1>TODOS</h1>
      </header>
      <NewTodo list={list} setList={setList} />
      {list.length > 0 && <List list={list} setList={setList} />}
      {list.length > 0 && <Footer list={list} setList={setList} />}
    </div>
  );
};

export default App;
