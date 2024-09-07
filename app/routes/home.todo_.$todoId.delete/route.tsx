import { PrismaClient } from "@prisma/client";
import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { toast } from "react-toastify";

const prisma = new PrismaClient();

export async function action({ params }: ActionFunctionArgs) {
  console.log("delete: %o", params.todoId);
  await prisma.todo
    .delete({
      where: { id: params.todoId },
    })
    .then((r) => {
      toast.success(`成功 (${r.id})`);
    })
    .catch((error) => {
      toast.error(`失敗: ${error}`);
    });

  return redirect(`/`);
}
