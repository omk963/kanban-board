"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_CARD, UPDATE_CARD, GET_COLUMN } from "@/graphql";
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

export default function CardForm({ columnId, card, open, onClose }: any) {
    const { data } = useQuery(GET_COLUMN, { variables: { id: columnId } });
    const [title, setTitle] = useState(card?.title || "");
    const [description, setDescription] = useState<string | undefined>(card?.description || "");
    const [createCard] = useMutation(CREATE_CARD, {
        refetchQueries: [GET_COLUMN]
    });
    const [updateCard] = useMutation(UPDATE_CARD, {
        refetchQueries: [GET_COLUMN]
    });

    // preload card values when editing
    useEffect(() => {
        if (card) {
            setTitle(card.title);
            setDescription(card.description || "");
        }
        else {
            setTitle("");
            setDescription("");
        }
    }, [card, open])

    console.log(data, data?.columns_by_pk?.cards?.length)

    async function handleSubmit() {
        if (!title.trim()) return;

        if (card) {
            // update existing card
            await updateCard({
                variables: {
                    id: card.id,
                    title,
                    description
                }
            })
        } else {
            // create new card
            const position = (data?.columns_by_pk?.cards?.length || 0) + 1;
            await createCard({
                variables: {
                    column_id: columnId,
                    title,
                    description,
                    position
                },
            });
        }

        onClose();
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>{card ? "Edit Card" : "Create a New Card"}</DialogTitle>
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
                        {card ? "Save Changes" : "Create"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
