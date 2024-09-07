import { useFetcher } from "@remix-run/react";
import type { todo } from ".";

export const TodoDetail: React.FC<todo> = ({ name, dueDate }) => {
  const fetcher = useFetcher();
  return (
    <div className="grid p-6">
      <span>Name: {name}</span>
      <span>Due: {dueDate.toISOString()}</span>
      <fetcher.Form
        action="delete"
        method="POST"
        className="flex justify-end"
        onSubmit={(event) => {
          const response = confirm(
            "Please confirm you want to delete this record.",
          );
          if (!response) {
            event.preventDefault();
          }
        }}
      >
        <button type="submit" className="bg-red-400">
          削除
        </button>
      </fetcher.Form>
    </div>
  );
};
