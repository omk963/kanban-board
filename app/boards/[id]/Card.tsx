"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import remarkGfm from "remark-gfm";
import CardForm from "./CardForm";
import { Button } from "@/components/ui/button";

const MarkdownPreview = dynamic(
    () => import("@uiw/react-markdown-preview"),
    { ssr: false }
);

export default function Card({ card }: { card: any }) {
    const [openEdit, setOpenEdit] = useState(false);

    return (
        <div className="p-3 border rounded bg-gray-50 shadow-sm mb-2">
            <h3 className="font-semibold">{card.title}</h3>
            {card.description && (
                <>
                    <hr />
                    <MarkdownPreview
                        source={card.description}
                        remarkPlugins={[remarkGfm]}
                        className="mt-2 prose prose-sm"
                    />
                    <Button variant="ghost" size="sm" onClick={() => setOpenEdit(true)}>✏️ Edit</Button>
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
