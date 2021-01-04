import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import { INCOMES_TYPES_NAMES } from "../../constants";

registerLocale("ru", ru);

export function NewIncome(props) {
  const { register, handleSubmit, control } = props;
  return (
    <div className="newIncome__container">
      <h3 className="newIncome__title">{`Добавить новый доход`}</h3>
      <form onSubmit={handleSubmit} autoComplete="off">
        <select name="type" ref={register}>
          {Object.keys(INCOMES_TYPES_NAMES).map((key) => (
            <option value={key} key={key}>
              {INCOMES_TYPES_NAMES[key]}
            </option>
          ))}
        </select>
        <input name="amount" ref={register} type="number" />
        <Controller
          name="date"
          control={control}
          render={({ onChange, value = new Date() }) => (
            <DatePicker
              dateFormat="dd.MM.yy"
              selected={(value = new Date())}
              onChange={onChange}
              locale="ru"
            />
          )}
        />
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
}
