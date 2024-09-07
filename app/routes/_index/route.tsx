import type { todo } from "@/ui/contents/todo";
import { AddTodo } from "@/ui/contents/todo/AddTodo";
import { TodoList } from "@/ui/contents/todo/TodoList";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";
import { add, sub } from "date-fns";
import { generateUUIDv7 } from "./uuidv7";
export { meta } from "./meta";

export default function Index() {
  const data = useLoaderData<LoadDate>();
  const todos: todo[] = data.todos.map((todo) => ({
    id: todo.id,
    name: todo.name,
    dueDate: new Date(todo.dueDate),
  }));

  return (
    <div className="grid gap-4 p-2 font-sans">
      <h1 className="text-3xl">Todo</h1>
      <div className="rounded bg-white/70 p-2">
        <TodoList todos={todos} />
      </div>
      <div className="rounded bg-white/70 p-2">
        <AddTodo />
      </div>
    </div>
  );
}

interface LoadDate {
  todos: {
    id: string;
    name: string;
    dueDate: string;
  }[];
}

export const loader = async () => {
  return json({ todos: inMemoryStore.todos });
};

const inMemoryStore = {
  todos: [
    {
      id: generateUUIDv7(),
      name: "洗濯",
      dueDate: sub(new Date(), { days: 2 }),
    },
    {
      id: generateUUIDv7(),
      name: "食器洗い",
      dueDate: add(new Date(), { days: 0 }),
    },
    {
      id: generateUUIDv7(),
      name: "床掃除",
      dueDate: add(new Date(), { days: 2 }),
    },
    {
      id: generateUUIDv7(),
      name: "さんぽ",
      dueDate: add(new Date(), { days: 5 }),
    },
  ],
};

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();

  const name = body.get("name");
  if (!name || typeof name !== "string") {
    return redirect(`/`);
  }
  const dueDateStr = body.get("dueDate");
  if (!dueDateStr || typeof dueDateStr !== "string") {
    return redirect(`/`);
  }

  const todo: todo = {
    id: generateUUIDv7(),
    name: name,
    dueDate: new Date(dueDateStr),
  };
  inMemoryStore.todos = [...inMemoryStore.todos, todo];
  return redirect(`/`);
}
