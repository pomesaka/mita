import { clsx } from "clsx";
import { differenceInDays, startOfDay } from "date-fns";
import React from "react";
import { CgDanger } from "react-icons/cg";
import { CiWarning } from "react-icons/ci";
import { FaRegCheckCircle } from "react-icons/fa";
import type { todo } from ".";

interface TodoListProps {
  todos: todo[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <div className="row-auto grid grid-cols-[max-content,max-content,auto,max-content] gap-y-2">
      {todos
        .sort((a, b) => differenceInDays(a.dueDate, b.dueDate))
        .map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
    </div>
  );
};

const Todo: React.FC<todo> = ({ name, dueDate }) => {
  const today = startOfDay(new Date());
  const remaining = differenceInDays(dueDate, today);

  return (
    <div className="col-span-full grid grid-cols-subgrid gap-2 border-slate-400 border-b">
      <Icon remaining={remaining} />
      <div className={clsx("text-nowrap rounded px-1")}>{name}</div>
      {[
        { key: "due", body: `~ ${dueDate.toLocaleDateString()}` },
        { key: "remaining", body: `(remaining ${remaining} day)` },
      ].map(({ key, body }) => (
        <div key={key} className={clsx("text-nowrap rounded px-1")}>
          {body}
        </div>
      ))}
    </div>
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
    return <CiWarning className="size-6 text-yellow-600" />;
  }

  return <FaRegCheckCircle className="size-6 text-green-600" />;
};
