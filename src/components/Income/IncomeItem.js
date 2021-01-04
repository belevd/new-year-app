import React, { useContext } from "react";
import { Del, pluralizeDate } from "../../utils";
import { INCOMES_TYPES_NAMES } from "../../constants";
import { IncomeContext } from "./Income";

export function IncomeItem(props) {
  const { item } = props;
  const { remove, change } = useContext(IncomeContext);
  return (
    <tr>
      <td>{pluralizeDate(item.date, "/")}</td>
      <td>{INCOMES_TYPES_NAMES[item.type]}</td>
      <td>{item.amount}</td>
      <td>
        <div className="incomeItem__actions">
          <div className="incomeItem__action-change"></div>
          <div className="incomeItem__action-delete"></div>
        </div>
      </td>
      <td>
        <Del cb={() => remove(item.id)} />
      </td>
    </tr>
  );
}
