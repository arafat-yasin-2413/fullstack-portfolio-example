import MarkdownRenderer from "@/components/markdown-renderer";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({
        where: {
            slug,
        },
    });

    if(!post) {
        notFound();
    }

    return <main className="min-h-screen py-16 px-4">
        
            <article className="max-w-3xl mx-auto">
                <Button variant="link" className="mt-4 px-0">
                    <Link href="/" className="flex ">
                        <ArrowLeft className="w-4 h-4 ml-1" />Back to Blog
                    </Link>
                </Button>


                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            
                <p className="text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString()}
                </p>

                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <MarkdownRenderer content={post.content}/>

                </div>
            </article>
        
        </main>;
}
