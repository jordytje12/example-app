import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, Link, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Alle blogs',
        href: '/blogs',
    },
];

export default function Index() {
    const { blogs } = usePage().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Alle blogs"/>
            <section className="p-4">
                <div className="grid grid-cols-4 gap-4">
                    {blogs.map((blog) => (
                        <Link href={route('blogs.show', blog.id)} key={blog.id}>
                           <Card key={blog.id}>
                                <CardHeader>
                                    <CardTitle>{blog.title}</CardTitle>
                                    <CardContent>
                                        {blog.body}
                                    </CardContent>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>
        </AppLayout>
    );
}
