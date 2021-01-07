import React, { useContext } from "react";
import { Del, pluralizeDate } from "../../utils";
import { INCOMES_TYPES_NAMES } from "../../constants";
import { IncomeContext } from "./Income";
import cn from "classnames";

export function IncomeItem(props) {
  const { item } = props;
  const { remove, change } = useContext(IncomeContext);
  return (
    <tr className="table__row">
      <td className="table__cell">{pluralizeDate(item.date, "/")}</td>
      <td className="table__cell">{INCOMES_TYPES_NAMES[item.type]}</td>
      <td className="table__cell">{item.amount.toLocaleString()}</td>
      <td className={cn("table__cell", "flexContainer")}>
        <div className="incomeItem__action-change"></div>
        <Del cb={() => remove(item.id)} />
      </td>
    </tr>
  );
}
