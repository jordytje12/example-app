import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Genereren',
        href: '/blogs/create',
    },
];

export default function Index() {
    const { errors } = usePage().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Blogs genereren" />
            <section className="p-4">
                <Card>
                    <CardHeader>Upload je bestand</CardHeader>
                    <Form method="POST" action={route('blogs.store')} encType="multipart/form-data" className="space-y-6">
                        <Input type="file" name="file" required />
                        <Button>Upload</Button>
                    </Form>
                    <CardFooter>{errors.file && <p className="text-red-600">{errors.file}</p>}</CardFooter>
                </Card>
            </section>
        </AppLayout>
    );
}
