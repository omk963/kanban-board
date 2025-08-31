"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_CARD, GET_COLUMN } from "@/graphql";
import dynamic from "next/dynamic";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// dynamically load markdown editor (client-only)
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function CardForm({ columnId }: any) {
    const { data, loading, error } = useQuery(GET_COLUMN, { variables: { id: columnId } });
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState<string | undefined>("");
    const [createCard] = useMutation(CREATE_CARD, {
        refetchQueries: [GET_COLUMN]
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    console.log(data, data?.columns_by_pk?.cards?.length)

    async function handleSubmit() {
        if (!title.trim()) return;
        const position = (data?.columns_by_pk?.cards?.length || 0) + 1;
        await createCard({
            variables: {
                column_id: columnId,
                title,
                description,
                position
            },
        });

        setTitle("");
        setDescription("");
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full mt-2">
                    ➕ Add Card
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Create a New Card</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Card title"
                        className="w-full p-2 border rounded"
                    />

                    <div data-color-mode="light">
                        <MDEditor
                            value={description}
                            onChange={setDescription}
                            height={150}
                            preview="edit"
                        />
                    </div>

                    <Button onClick={handleSubmit} className="w-full">
                        Create
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
