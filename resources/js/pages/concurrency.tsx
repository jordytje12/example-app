import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, Form } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, type ChangeEvent, useEffect } from 'react';
import { usePage } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Concurrency',
        href: '/concurrency',
    },
];

type Props = {
    userCount: number,
    data: Array<string>
    files: Array<string>
    auth: {
        user: {
            id: number
        }
    }
}

export default function Concurrency({userCount, data, files}: Props) {
    const [file, setFile] = useState<File | null>(null);

    const handeFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] ?? null;
        setFile(f);
    };

    const { auth } = usePage().props;

    useEffect(() => {
        window.Echo.private(`file-uploaded.${auth.user.id}`)
            .listen('FileUploaded', (e) => {
                alert(`File "${e.file.file_name}" geüpload!`);
            });
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Concurrency"/>
            <section className="p-4">
                <p>{userCount}</p>
                <Form
                    className="flex flex-col"
                    method="post"
                    action={route('concurrency.store')}
                    encType="multipart/form-data"
                >
                    <Input
                        type="file"
                        name="file"
                        required
                        onChange={handeFileChange}
                    />
                    <Button type="submit">Submit</Button>
                </Form>
                {file && (
                    <div>
                        <p>{file.name}</p>
                        <p>{file.size} MB</p>
                    </div>
                )}
                {data.map((data) => (
                    <li key={data}>{data}</li>
                ))}
                <ul className="grid grid-cols-5 gap-4 mt-4">
                    {files.map((file) => (
                        <div key={file.id}>
                            <img src={`/storage/${file.file_path}`}
                                className="w-32 h-32 object-cover"
                            />
                            <p>{file.file_name}</p>
                        </div>
                    ))}
                </ul>
            </section>
        </AppLayout>
    );
}
