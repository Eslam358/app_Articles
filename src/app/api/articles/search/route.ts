import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/prisma/db";

export async function GET(request: NextRequest) {
  const searchTitle = request.nextUrl.searchParams.get("searchTitle") || null;
  console.log("searchTitle", searchTitle);
  try {
    if (searchTitle === null) {
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
        },

        take: 10,
      });
      return NextResponse.json({ All_Articles: Articles }, { status: 200 });
    } else {
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
        },
        skip: 10 * (parseInt("1") - 1),
        take: 10,
        where: {
          title: {
            startsWith: searchTitle,
          },
        },
      });
      return NextResponse.json({ All_Articles: Articles }, { status: 200 });
    }
  } catch (error: unknown) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
