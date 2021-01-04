import cn from "classnames";

export const pluralizeDate = (date, separator) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const dateStr = `${String(day).length !== 1 ? day : "0" + day}${separator}${
    String(month).length !== 1 ? month : "0" + month
  }${separator}${String(year).slice(2)}`;
  return dateStr;
};

export const Del = (props) => {
  const { cb } = props;
  return (
    <button className={cn("button", "button-remove")} onClick={cb}></button>
  );
};
