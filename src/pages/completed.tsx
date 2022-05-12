import Footer from "../components/footer";
import List from "../components/list";
import { CompletedPageProps } from "../model/props";

const CompletedPage = ({ list, setList }: CompletedPageProps) => {
  return (
    <>
      {list.length > 0 && (
        <List list={list} setList={setList} filter="completed" />
      )}
      {list.length > 0 && (
        <Footer list={list} setList={setList} filter="completed" />
      )}
    </>
  );
};

export default CompletedPage;
