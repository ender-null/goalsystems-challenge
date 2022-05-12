import { Item } from "./types";

export interface SharedProps {
  list: Item[];
  setList: (list: Item[]) => void;
}

export interface FooterProps extends SharedProps {}

export interface ListProps extends SharedProps {}

export interface NewTodoProps extends SharedProps {}

export interface TaskProps extends SharedProps {
  item: Item;
}
