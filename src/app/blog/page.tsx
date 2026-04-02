import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function BlogPage() {
    const posts = await prisma.blogPost.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <main className="min-h-screen py-16 px-4">
            <div className="max-w-3xl mx-auto">
                <Button variant="link" className="mt-4 px-0">
                    <Link href="/" className="flex ">
                        <ArrowLeft className="w-4 h-4 ml-1" />Back to home
                    </Link>
                </Button>

                <h1 className="text-3xl font-bold mb-8">
                    Blog
                </h1>

                {posts.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {posts.map((post) => (
                            <Card
                                key={post.id}
                                className="hover:bg-accent transition-colors">
                                <Link href={`/blog/${post.slug}`}>
                                    <CardContent className="p-4">
                                        <h3 className="font-semibold">
                                            {post.title}
                                        </h3>

                                        <p className="text-sm text-muted-foreground">
                                            {new Date(
                                                post.createdAt,
                                            ).toLocaleDateString()}
                                        </p>
                                    </CardContent>
                                </Link>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground">No posts yet.</p>
                )}
            </div>
        </main>
    );
}
