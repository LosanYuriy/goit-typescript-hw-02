import s from "./Loader.module.css";
import { GridLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className={s.backdrop}>
      <GridLoader
        color="#e15b64"
        loading={true}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
