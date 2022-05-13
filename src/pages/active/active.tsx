import Footer from "../../components/footer/footer";
import List from "../../components/list/list";
import { ActivePageProps } from "../../model/props";

const ActivePage = ({ list, setList }: ActivePageProps) => {
  return (
    <>
      {list.length > 0 && (
        <List list={list} setList={setList} filter="active" />
      )}
      {list.length > 0 && (
        <Footer list={list} setList={setList} filter="active" />
      )}
    </>
  );
};

export default ActivePage;
