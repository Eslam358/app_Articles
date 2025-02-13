
import { NextResponse, NextRequest } from "next/server";
import { Comment } from "@prisma/client";
import prisma from "@/utils/prisma/db";
import { testUserToken } from "@/utils/handelToken";

type Params_id = Promise<{ id: string }>;
export async function GET(
  request: NextRequest,
  { params }: { params: Params_id }
) {
  const param_id = (await params).id



  const id = parseInt(param_id);
  try {
    if (isNaN(id)) {
      return NextResponse.json({ error: "id must be a number" }, { status: 400 });
    }
    const comment = await prisma.comment.findUnique({ where: { id: id } });
    if (!comment) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ comment, massage: "fetched successfully" }, { status: 200 });

  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }

}

export async function DELETE(request: NextRequest, { params }: { params: Params_id }) {

  const param_id = (await params).id
  const user = await testUserToken(request);

  if (!user) {
    return NextResponse.json({ error: "You must be logged in to delete a comment" }, { status: 401 });
  }



  const id = parseInt(param_id);
  try {
    if (isNaN(id)) {
      return NextResponse.json({ error: "id must be a number" }, { status: 400 });
    }
    const CommentTest: Comment | null = await prisma.comment.findUnique({ where: { id: id } });
    if (CommentTest?.userId !== user.id && user.
      isAdmin !== true) {
      return NextResponse.json({ error: "You can't delete this comment" }, { status: 401 });
    }

    const comment = await prisma.comment.delete({ where: { id: id } });
    if (!comment) {
      return NextResponse.json({ error: "comment not found" }, { status: 404 });

    }

    return NextResponse.json({ massage: " deleted successfully", comment }, { status: 200 });

  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Params_id }) {

  const param_id = (await params).id



  const id = parseInt(param_id);
  try {
    if (isNaN(id)) {
      return NextResponse.json({ error: "id must be a number" }, { status: 400 });
    }
    const body = (await request.json()) as Comment;
    const comment = await prisma.comment.update({ where: { id: id }, data: body });
    if (!comment) {
      return NextResponse.json({ error: "comment not found" }, { status: 404 });

    }

    return NextResponse.json({ massage: " updated successfully", comment }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });

  }


}

