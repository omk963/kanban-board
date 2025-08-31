"use client";

import dynamic from "next/dynamic";
import remarkGfm from "remark-gfm";

const MarkdownPreview = dynamic(
    () => import("@uiw/react-markdown-preview"),
    { ssr: false }
);

export default function Card({ card }: { card: any }) {
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
                </>
            )}
        </div>
    );
}
