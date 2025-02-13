import { NextResponse, NextRequest } from "next/server";
import { Article } from "@prisma/client";
import prisma from "@/utils/prisma/db";
import { testUserToken } from "@/utils/handelToken";
import { error } from "console";
//  get Article -----------------------------------------
//  get Article -----------------------------------------
type Params_id = Promise<{ id: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params_id }
) {
  try {
    const param_id = (await params).id

    

    const id = parseInt(param_id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "id must be a number" },
        { status: 400 }
      );
    }


    const Article = await prisma.article.findUnique({
      where: { id: id },
      include: { comments: { include: { user: { select: { username: true } } } }, user: { select: { username: true, email: true } } },
    });

    if (!Article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(
      { Article, massage: "fetched successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params_id }
) {
  try {
    const param = await params;

    const id = parseInt(param.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "id must be a number" },
        { status: 400 }
      );
    }
    const Admine = await testUserToken(request);
    if (!Admine) {
      return NextResponse.json(
        { error: "you can't delete this article" },
        { status: 404 }
      );
    }
    const testArticle = await prisma.article.findUnique({ where: { id: id } });

    if (!testArticle) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    if (testArticle.userId !== Admine.id) {
      return NextResponse.json(
        { error: "you can't update this article by this user" },
        { status: 404 }
      );
    }

    const article = await prisma.article.delete({ where: { id: id } });
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const deleteComments = await prisma.comment.deleteMany({
      where: {
        articleId: id,
      },
    });

    return NextResponse.json(
      { massage: " deleted successfully", article },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Params_id }
) {
  try {
    const param_id = await params;

    const id = parseInt(param_id.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "id must be a number" },
        { status: 400 }
      );
    }

    const Admine = testUserToken(request);
    console.log("Admine",Admine);
    if (!Admine) {
      return NextResponse.json(
        { error: "you can't update this article" },
        { status: 404 }
      );
    }

    const body = (await request.json()) as Article;
    console.log("body", body);

    const testArticle = await prisma.article.findUnique({ where: { id: id } });
    if (!testArticle) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    if (testArticle.userId !== Admine.id) {
      return NextResponse.json(
        { error: "you can't update this article by this user" },
        { status: 404 }
      );
    }

    const article = await prisma.article.update({
      where: { id: id },
      data: body,
    });
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(
      { massage: " updated successfully", article },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message, eslam:"trye" }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
