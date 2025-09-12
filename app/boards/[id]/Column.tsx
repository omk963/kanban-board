'use client';

import { useQuery, useMutation } from '@apollo/client';
import { GET_BOARD, UPDATE_COLUMN, DELETE_COLUMN } from "@/graphql"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Check, X, Plus } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Card from "./Card";
import CardForm from "./CardForm";

export default function Column({ col }: { col: any }) {
    const [deleteColumn] = useMutation(DELETE_COLUMN,
        {
            refetchQueries: [GET_BOARD]
        });
    const [updateColumn] = useMutation(UPDATE_COLUMN,
        {
            refetchQueries: [GET_BOARD]
        });
    const [isEditing, setIsEditing] = useState(false);
    const [columnName, setColumnName] = useState(col.name);

    async function handleUpdateColumn() {
        if (!columnName.trim()) return;
        await updateColumn({ variables: { id: col.id, name: columnName } });
        setIsEditing(false);
    }

    return (
        <div key={col.id} style={{ border: '1px solid gray', padding: 12, minWidth: 200 }}>
            {isEditing ? (
                <div className="flex items-center gap-0 w-full">
                    <input
                        value={columnName}
                        onChange={(e) => setColumnName(e.target.value)}
                        className="border p-1 rounded w-full"
                        autoFocus
                    />
                    <Button size="icon" variant="ghost" onClick={handleUpdateColumn}>
                        <Check className="h-4 w-4 text-green-600" />
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                            setColumnName(col.name);
                            setIsEditing(false);
                        }}
                    >
                        <X className="h-4 w-4 text-red-600" />
                    </Button>
                </div>
            ) : (
                <div className="flex items-center gap-2 w-full justify-between">
                    <h2>{col.name}</h2>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setIsEditing(true)}>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => deleteColumn({ variables: { id: col.id } })}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
            <ul>
                {(col.cards || []).map((card: any) => (
                    <Card key={card.id} card={card} />
                ))}
            </ul>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" size="icon" className="w-full mt-2">
                        <Plus className="h-5 w-5" />
                    </Button>
                </DialogTrigger>

                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add a New Card</DialogTitle>
                    </DialogHeader>

                    {/* CardForm receives columnId and handles creation */}
                    <CardForm columnId={col.id} />
                </DialogContent>
            </Dialog>
        </div>
    )
};