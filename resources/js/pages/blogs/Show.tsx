import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Huidige blog',
        href: '/blogs/create',
    },
];

export default function Index() {
    const { blog } = usePage().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Huidige blog" />
            <section className="p-4">
                <h2>{blog.title}</h2>
                <p>{blog.body}</p>
            </section>
        </AppLayout>
    );
}
