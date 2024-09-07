import { Modal } from "@/ui/conponents/modal/Modal";
import type { todo } from "@/ui/contents/todo";
import { TodoDetail } from "@/ui/contents/todo/TodoDetail";
import { PrismaClient } from "@prisma/client";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData, useNavigate } from "@remix-run/react";

const prisma = new PrismaClient();

interface LoadData {
  todo: {
    id: string;
    name: string;
    dueDate: string;
  };
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const todo = await prisma.todo
    .findUnique({
      where: {
        id: params.todoId,
      },
    })
    .then((row): todo => {
      if (!row) {
        throw new Response("Not Found", { status: 404 });
      }
      return {
        id: row.id,
        name: row.name,
        dueDate: row.due_date,
      };
    });
  return json({ todo });
};
export default function Index() {
  const data = useLoaderData<LoadData>();
  const todo: todo = {
    id: data.todo.id,
    name: data.todo.name,
    dueDate: new Date(data.todo.dueDate),
  };
  return <TodoDetail {...todo} />;
}
