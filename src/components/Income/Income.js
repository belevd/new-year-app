import React, { useState } from "react";
import { IncomesTable } from "./IncomesTable";
import { NewIncome } from "./NewIncome";
import { useForm } from "react-hook-form";
import cn from "classnames";

export const IncomeContext = React.createContext();

export function Income() {
  const { register, handleSubmit, control } = useForm();
  const [incomes, setIncomes] = useState({
    list: {},
    column: {
      id: "income-column",
      title: "Incomes",
      listIds: [],
    },
  });
  const [newIncomeModal, setNewIncomeModal] = useState(false);

  const showNewIncomeModal = () => {
    setNewIncomeModal(true);
  };

  const closeNewIncomeModal = () => {
    setNewIncomeModal(false);
  };

  const addIncome = (props) => {
    const { type, amount, date } = props;
    const id = `income-${new Date().getTime()}`;
    const newIncome = {
      id,
      type,
      amount: Number(amount),
      date: date ? date : new Date(),
    };
    const newIncomes = {
      ...incomes,
      list: {
        ...incomes.list,
        [id]: newIncome,
      },
      column: {
        ...incomes.column,
        listIds: [...incomes.column.listIds, `${id}`],
      },
    };
    setIncomes(newIncomes);
    closeNewIncomeModal();
  };

  const deleteIncome = (id) => {
    let newList = { ...incomes.list };
    delete newList[id];
    const newListIds = incomes.column.listIds.filter((item) => item !== id);
    const newIncomes = {
      list: newList,
      column: {
        ...incomes.column,
        listIds: newListIds,
      },
    };
    setIncomes(newIncomes);
  };

  const changeIncome = (id, type, amount, date) => {
    let changingIncome = { ...incomes.list[id] };
    changingIncome = {
      ...changingIncome,
      [type]: type,
      [amount]: amount,
      [date]: date,
    };
    const newList = { ...incomes.list, id: changingIncome };
    const newIncomes = { ...incomes, list: newList };
    setIncomes(newIncomes);
  };

  return (
    <IncomeContext.Provider
      value={{ remove: deleteIncome, change: changeIncome }}
    >
      <h2 className="subTitle">{`Учет доходов`}</h2>
      <button
        onClick={showNewIncomeModal}
        className={cn("button", "button-primary")}
      >{`Добавить новый доход`}</button>
      {newIncomeModal && (
        <NewIncome
          register={register}
          handleSubmit={handleSubmit(addIncome)}
          control={control}
          close={closeNewIncomeModal}
        />
      )}
      <IncomesTable list={incomes.list} listIds={incomes.column.listIds} />
    </IncomeContext.Provider>
  );
}
