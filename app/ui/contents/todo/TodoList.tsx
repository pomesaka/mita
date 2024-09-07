import { clsx } from "clsx";
import { differenceInDays, startOfDay } from "date-fns";
import React from "react";
import { CgDanger } from "react-icons/cg";
import { FaRegCheckCircle } from "react-icons/fa";
import { PiWarningBold } from "react-icons/pi";
import type { todo } from ".";

interface TodoListProps {
  todos: todo[];
  handleSelect: (item: todo) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, handleSelect }) => {
  return (
    <div className="row-auto grid grid-cols-[max-content,max-content,max-content,auto]">
      {todos
        .sort((a, b) => differenceInDays(a.dueDate, b.dueDate))
        .map((todo) => (
          <Todo key={todo.id} {...todo} handleSelect={handleSelect} />
        ))}
    </div>
  );
};

const Todo: React.FC<todo & { handleSelect: (item: todo) => void }> = ({
  handleSelect,
  ...todo
}) => {
  const { name, dueDate } = todo;
  const today = startOfDay(new Date());
  const remaining = differenceInDays(dueDate, today);

  return (
    <button
      type="button"
      className="col-span-full grid grid-cols-subgrid items-end gap-2 rounded border-slate-400 border-b px-1 pt-2 active:bg-blue-400 active:bg-opacity-30"
      onClick={() => handleSelect(todo)}
    >
      <Icon remaining={remaining} />
      <div className={clsx("rounded text-start lining-nums")}>{name}</div>
      {[
        { key: "due", body: `~${dueDate.toLocaleDateString()}` },
        { key: "remaining", body: `(あと${remaining}日)` },
      ].map(({ key, body }) => (
        <div key={key} className={clsx("rounded px-1")}>
          {body}
        </div>
      ))}
    </button>
  );
};

const Icon: React.FC<{ remaining: number }> = ({ remaining }) => {
  if (remaining < 0) {
    return <CgDanger className="size-6 rounded-full bg-red-800 text-white" />;
  }
  if (remaining <= 1) {
    return <CgDanger className="size-6 text-red-600" />;
  }
  if (remaining <= 3) {
    return <PiWarningBold className="size-6 text-yellow-600" />;
  }

  return <FaRegCheckCircle className="size-6 text-green-600" />;
};
