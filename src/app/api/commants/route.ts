import { NextResponse, NextRequest } from "next/server";
import { testUserToken } from "@/utils/handelToken";
import { Comment } from "@prisma/client";
import {schemaAddComment} from "@/utils/validated/articles/schemaArticle"
import prisma from "@/utils/prisma/db";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  const articleId = request.nextUrl.searchParams.get("articleId");
  console.log(articleId, userId);

  try {
    if (userId) {
      if (articleId) {
        return commentsArticleIdAndUserId(articleId, userId);
      }
      return commentsUserId(userId);
    } else if (articleId) {
      return commentsArticleId(articleId);
    }

    const comment = await prisma.comment.findMany();
    return NextResponse.json(comment, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
//------------------------------------------------------

export async function POST(request: NextRequest) {
  const body:{text:string,articleId:number} = (await request.json());
  const validated = schemaAddComment.safeParse(body);

  if (!validated.success) {
    return NextResponse.json(
      { error: validated.error.issues[0].message },
      { status: 400 }
    );
  }
  const user_Id = parseInt(testUserToken(request)?.id);
  console.log(body,user_Id)


  try {
    if (!user_Id) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const newComment = await prisma.comment.create({
      data: {
        text: body.text,
        articleId:body.articleId,
        userId: user_Id,
      },
    });

console.log("newComment", newComment);
if (!newComment) {
  return NextResponse.json(
    { error: "Failed to create article" },
    { status: 404}
  );
  
}

    return NextResponse.json(newComment, { status: 201 });

  } catch (error) {
    return NextResponse.json(error, { status: 501 });
  }



}
//---------------------------------------------------------------
const commentsUserId = async (userId: string) => {
  const id = parseInt(userId);
  try {
    const comments = await prisma.comment.findMany({
      where: {
        userId: id,
      },
    });
    if (!comments) {
      return NextResponse.json(
        { error: "Articles not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(comments, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
};
const commentsArticleId = async (articleId: string) => {
  const id = parseInt(articleId);
  try {
    const comments = await prisma.comment.findMany({
      where: {
        articleId: id,
      },
    });
    if (!comments) {
      return NextResponse.json(
        { error: "Articles not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(comments, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
};
const commentsArticleIdAndUserId = async (
  articleId: string,
  userId: string
) => {
  const article_Id = parseInt(articleId);
  const user_Id = parseInt(userId);
  try {
    const comments = await prisma.comment.findMany({
      where: {
        articleId: article_Id,
        userId: user_Id,
      },
    });
    if (!comments) {
      return NextResponse.json(
        { error: "Articles not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(comments, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
