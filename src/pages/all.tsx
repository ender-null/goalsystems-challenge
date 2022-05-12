import Footer from "../components/footer";
import List from "../components/list";
import { AllPageProps } from "../model/props";

const AllPage = ({ list, setList }: AllPageProps) => {
  return (
    <>
      {list.length > 0 && <List list={list} setList={setList} filter={null} />}
      {list.length > 0 && (
        <Footer list={list} setList={setList} filter={null} />
      )}
    </>
  );
};

export default AllPage;
