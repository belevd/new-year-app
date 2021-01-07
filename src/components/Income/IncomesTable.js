import React from "react";
import { IncomeItem } from "./IncomeItem";
import cn from "classnames";

export function IncomesTable(props) {
  const { list, listIds } = props;
  const incomes = listIds.map((item) => list[item]);

  return (
    <>
      {incomes.length ? (
        <table className={cn("table", 'mt-20')}>
          <thead>
            <tr className="table__row">
              <th className="table__cell">{`Дата`}</th>
              <th className="table__cell">{`Источник дохода`}</th>
              <th className="table__cell">{`Сумма`}</th>
              <th className="table__cell"></th>
            </tr>
          </thead>
          <tbody>
            {incomes.map((item) => (
              <IncomeItem item={item} key={item.id} />
            ))}
          </tbody>
        </table>
      ) : (
        <h3>У вас нет доходов</h3>
      )}
    </>
  );
}
