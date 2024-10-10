import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/api-actions/getPostBySlug";

interface IParams {
  params: { slug: string };
}

export default async function Page({ params }: IParams) {
  const { slug } = params;

  // await waits for the data to be fetched before rendering
  const post = await getPostBySlug(slug);

  // if the post is not found, return a 404 page (Next.js will automatically render the not-found.tsx file)
  if (!post) {
    notFound();
  }

  return (
    <div className="md:mx-auto md:max-w-3xl">
      <div className="mb-4">
        <Button size="icon" variant="outline" asChild>
          <Link href="/admin/posts">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
      </div>
      <div className="mb-6">
        <h1 className="mb-2 text-2xl font-bold md:text-3xl">{post.title}</h1>
        <p className="text-muted-foreground text-sm">
          Created: {formatDate(post.date)}
        </p>
      </div>
      {post.content === "" ? (
        <p className="text-sm md:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quod ipsum
          illo impedit odit necessitatibus excepturi similique laudantium
          expedita possimus!
        </p>
      ) : (
        <div
          className="prose-sm prose-ol:list-decimal prose-ul:list-disc md:text-base"
          dangerouslySetInnerHTML={{
            __html: post.content || "",
          }}
        />
      )}
    </div>
  );
}
