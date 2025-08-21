import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, Form } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, type ChangeEvent } from "react";

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
}

export default function Concurrency({userCount, data, files}: Props) {
    const [file, setFile] = useState<File | null>(null);

    const handeFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] ?? null;
        setFile(f);
    };

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
                {files.map((file) => (
                    <img src={file.file_path} key={file} />
                ))}
            </section>
        </AppLayout>
    );
}
