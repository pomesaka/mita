import { Form } from "@remix-run/react";
import type { todo } from ".";

export type addTodoSchema = todo;

export const AddTodo: React.FC = () => {
  return (
    <Form method="post" className="grid grid-flow-row gap-4 md:grid-flow-col">
      <label className="grid border-slate-500 border-b">
        Task
        <input type="text" name="name" />
      </label>
      <label className="grid border-slate-500 border-b">
        Due Date
        <input type="date" name="dueDate" className="bg-white" />
      </label>
      <button
        type="submit"
        className="rounded-full bg-green-700 text-white transition active:scale-105 active:shadow"
      >
        追加
      </button>
    </Form>
  );
};
