import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Concurrency',
        href: '/concurrency',
    },
];

type Props = {
    userCount: number,
    data: Array<string>
}

export default function Concurrency({userCount, data}: Props) {
    const [file, setFile] = useState(null);

    const handeFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Concurrency"/>
            <section className="p-4">
                <p>{userCount}</p>
                <form className="" action="" method="POST">
                    <Input
                        type="file"
                        onChange={handeFileChange}
                    />
                </form>
                {file && (
                    <div>
                        <p>{file.name}</p>
                        <p>{file.size}</p>
                    </div>
                )}
                {data.map((data) => (
                    <li key={data}>{data}</li>
                ))}
            </section>
        </AppLayout>
    );
}
