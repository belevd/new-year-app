import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import { INCOMES_TYPES_NAMES } from "../../constants";
import cn from "classnames";
import { Del } from "../../utils";

registerLocale("ru", ru);

export function ChangeIncome(props) {
  const { register, handleSubmit, control, close, item } = props;
  return (
    <div className="newIncome__container">
      <div className={cn("flexContainer", "flex-right")}>
        <Del cb={() => close()} />
      </div>
      <h3 className="newIncome__title">{`Изменение дохода`}</h3>
      <form
        onSubmit={handleSubmit}
        name="changeIncome"
        autoComplete="off"
        className={cn("newIncome__form")}
      >
        <select
          name="type"
          ref={register}
          className={cn("newIncome__input")}
          defaultValue={item.type}
        >
          {Object.keys(INCOMES_TYPES_NAMES).map((key) => (
            <option value={key} key={key}>
              {INCOMES_TYPES_NAMES[key]}
            </option>
          ))}
        </select>
        <input
          name="amount"
          ref={register}
          type="number"
          defaultValue={item.amount}
          className={cn("newIncome__input")}
        />
        <Controller
          name="date"
          control={control}
          defaultValue={item.date}
          render={({ onChange, value }) => (
            <DatePicker
              dateFormat="dd.MM.yy"
              selected={value}
              onChange={onChange}
              locale="ru"
              className={cn("newIncome__input")}
            />
          )}
        />
        <button type="submit" className={cn("button", "button-primary")}>
          Изменить
        </button>
      </form>
    </div>
  );
}
