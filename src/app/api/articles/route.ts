import { use } from 'react';
import { testUserToken } from "@/utils/handelToken";
import { schemaArticle } from "@/utils/validated/articles/schemaArticle";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/prisma/db";
import { Article } from "@prisma/client";

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page") || "1";
  console.log("page", page);
  try {

     const totalArticles = await prisma.article.count();
     const totalPages = Math.ceil(totalArticles / 6);
    const Articles = await prisma.article.findMany({
      include: {
        comments: {
          include: {
            user: {
              select: {
                username: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        user:{
          select:{
            username: true,
            email: true
          }
        }
      },
      skip: 6 * (parseInt(page) - 1),
      take: 6,
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ All_Articles: Articles, totalPages, totalArticles }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Article;

    const validated = schemaArticle.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { message: validated.error.issues[0].message },
        { status: 400 }
      );
    }

    const testUser = testUserToken(request);
    if (!testUser) {
      return NextResponse.json(
        { error: "token not found you can't create article" },
        { status: 404 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: testUser.id,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found please login or register" },
        { status: 404 }
      );
    }

    if (!user.isAdmin) {
      return NextResponse.json(
        { error: "you are not admin you can't create article" },
        { status: 404 }
      );
    }

    const newArticle = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
        userId: user.id,
      },
    });
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
