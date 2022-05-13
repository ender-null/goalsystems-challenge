import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Item } from "../../model/types";
import ActivePage from "../../pages/active/active";
import AllPage from "../../pages/all/all";
import CompletedPage from "../../pages/completed/completed";
import NewTodo from "../new-todo/new-todo";
import "./app.css";

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
    <BrowserRouter>
      <div className="todoapp">
        <header>
          <h1>TODOS</h1>
        </header>
        <NewTodo list={list} setList={setList} />
        <Routes>
          <Route path="/" element={<AllPage list={list} setList={setList} />} />
          <Route
            path="/active"
            element={<ActivePage list={list} setList={setList} />}
          />
          <Route
            path="/completed"
            element={<CompletedPage list={list} setList={setList} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
