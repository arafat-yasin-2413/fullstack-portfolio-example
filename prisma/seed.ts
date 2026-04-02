import prisma from "@/lib/db";

async function main() {
    const blogPosts = [
        {
    
            slug: "introduction-to-react",
            title: "Introduction to React",
            content: `# Introduction to React 
            React lets you build interactive user interfaces using components. 
            
            ## Key Concepts
            - JSX for writing UI
            - Components help split UI into small parts
            - State and props manage data flow
            
            ** Note: ** React work perfectly together with Next.js`,
        },
    ];


    for (const post of blogPosts) {
        await prisma.blogPost.create({
            data: post,
        });
    }


    console.log('Seed data has been inserted successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
