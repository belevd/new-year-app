import React from "react";
import { IncomeItem } from "./IncomeItem";

export function IncomesTable(props) {
  const { list, listIds } = props;
  const incomes = listIds.map((item) => list[item]);

  return (
    <>
      {incomes.length ? (
        <table>
          <thead>
            <tr>
              <th>{`Дата`}</th>
              <th>{`Источник дохода`}</th>
              <th>{`Сумма`}</th>
              <th></th>
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
