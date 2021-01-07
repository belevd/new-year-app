import React, { useContext, useState } from "react";
import { Del, Change, pluralizeDate } from "../../utils";
import { INCOMES_TYPES_NAMES } from "../../constants";
import { IncomeContext } from "./Income";
import { ChangeIncome } from "./ChangeIncome";
import { useForm } from "react-hook-form";
import cn from "classnames";

export function IncomeItem(props) {
  const { item } = props;
  const { remove, change } = useContext(IncomeContext);
  const [changeIncomeModal, setChangeIncomeModal] = useState(false);
  const { register, handleSubmit, control } = useForm();
  const showChangeIncomeModal = () => {
    setChangeIncomeModal(true);
  };
  const closeChangeIncomeModal = () => {
    setChangeIncomeModal(false);
  };
  const changeIncome = (props) => {
    const { amount, type, date } = props;
    const { id } = item;
    closeChangeIncomeModal();
    change({ amount, type, date, id });
  };
  return (
    <tr className="table__row">
      <td className="table__cell">{pluralizeDate(item.date, "/")}</td>
      <td className="table__cell">{INCOMES_TYPES_NAMES[item.type]}</td>
      <td className="table__cell">{item.amount.toLocaleString()}</td>
      <td className={cn("table__cell", "flexContainer")}>
        <Change cb={() => showChangeIncomeModal()} />
        <Del cb={() => remove(item.id)} />
        {changeIncomeModal && (
          <ChangeIncome
            register={register}
            handleSubmit={handleSubmit(changeIncome)}
            control={control}
            item={item}
            close={closeChangeIncomeModal}
          />
        )}
      </td>
    </tr>
  );
}
