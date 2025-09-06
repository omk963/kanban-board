"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import remarkGfm from "remark-gfm";
import CardForm from "./CardForm";
import { useMutation } from "@apollo/client";
import { DELETE_CARD, GET_COLUMN } from "@/graphql";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const MarkdownPreview = dynamic(
    () => import("@uiw/react-markdown-preview"),
    { ssr: false }
);

export default function Card({ card }: { card: any }) {
    const [openEdit, setOpenEdit] = useState(false);
    const [deleteCard] = useMutation(DELETE_CARD, {
        refetchQueries: [GET_COLUMN]
    });

    return (
        <div className="p-3 border rounded bg-gray-50 shadow-sm mb-2">
            <div className="flex justify-between items-start">
                <h3 className="font-semibold">{card.title}</h3>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setOpenEdit(true)}>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => deleteCard({ variables: { id: card.id } })}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {card.description && (
                <>
                    <hr />
                    <MarkdownPreview
                        source={card.description}
                        remarkPlugins={[remarkGfm]}
                        className="mt-2 prose prose-sm"
                    />
                </>
            )}
            <CardForm
                columnId={card.column_id}
                card={card}
                open={openEdit}
                onClose={() => setOpenEdit(false)}
            />
        </div>
    );
}
