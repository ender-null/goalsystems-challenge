import { Item } from "./types";

export interface SharedProps {
  list: Item[];
  setList: (list: Item[]) => void;
}

export interface FooterProps extends SharedProps {
  filter: null | "completed" | "active";
}

export interface ListProps extends SharedProps {
  filter: null | "completed" | "active";
}

export interface NewTodoProps extends SharedProps {}

export interface TaskProps extends SharedProps {
  item: Item;
}

export interface AllPageProps extends SharedProps {}

export interface ActivePageProps extends SharedProps {}

export interface CompletedPageProps extends SharedProps {}
