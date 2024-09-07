import { useFetcher } from "@remix-run/react";
import { useEffect, useRef } from "react";
import type { todo } from ".";

export type addTodoSchema = todo;

export const AddTodo: React.FC = () => {
  const today = new Date().toISOString().split("T")[0];
  const fetcher = useFetcher();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (fetcher.state === "loading" && formRef.current) {
      formRef.current.reset();
    }
  }, [fetcher.state]);

  return (
    <fetcher.Form
      method="post"
      className="grid grid-flow-row gap-4 md:grid-flow-col"
      ref={formRef}
    >
      <label className="grid border-slate-500 border-b">
        <span className="text-xl">Task</span>
        <input type="text" name="name" className="rounded" />
      </label>
      <label className="grid border-slate-500 border-b">
        <span className="text-xl">Due Date</span>
        <input type="date" name="dueDate" className="rouded" min={today} />
      </label>
      <button
        type="submit"
        className="rounded-full bg-green-700 text-white transition active:scale-105 active:shadow"
      >
        追加
      </button>
    </fetcher.Form>
  );
};
