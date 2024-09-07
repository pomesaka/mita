import type { todo } from "@/ui/contents/todo";
import { AddTodo } from "@/ui/contents/todo/AddTodo";
import { TodoList } from "@/ui/contents/todo/TodoList";
import { PrismaClient } from "@prisma/client";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";
import { add, sub } from "date-fns";
import { toast } from "react-toastify";
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
  const todos = await prisma.todo.findMany().then((rows) =>
    rows.map(
      (row): todo => ({
        id: row.id,
        name: row.name,
        dueDate: row.due_date,
      }),
    ),
  );
  return json({ todos });
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

const prisma = new PrismaClient();

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  console.log("action: %o", body);

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

  await prisma.todo
    .create({
      data: {
        id: todo.id,
        name: todo.name,
        due_date: todo.dueDate,
      },
    })
    .then((r) => {
      toast.success(`成功 (${r.id})`);
    })
    .catch((error) => {
      toast.error(`失敗: ${error}`);
    });

  inMemoryStore.todos = [...inMemoryStore.todos, todo];
  return redirect(`/`);
}
