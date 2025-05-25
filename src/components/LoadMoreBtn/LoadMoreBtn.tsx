import React from "react";
import s from "./LoadMoreBtn.module.css";

type LoadMoreBtnProps = {
  onClick: () => void;
  onClear: () => void;
  disabled: boolean;
};

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({
  onClick,
  onClear,
  disabled,
}) => {
  return (
    <div className={s.container}>
      <button className={s.button} onClick={onClick} disabled={disabled}>
        Load more
      </button>
      <button className={s.button} onClick={onClear} disabled={disabled}>
        Clear
      </button>
    </div>
  );
};
export default LoadMoreBtn;
