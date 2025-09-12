'use client';

import { useQuery, useMutation } from '@apollo/client';
import { GET_BOARD, CREATE_COLUMN } from "@/graphql"
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Column from './Column';

export default function BoardPage() {
    const params = useParams(); // grabs the board ID from the URL
    const boardId = params.id;

    const { data, loading, error } = useQuery(GET_BOARD, { variables: { id: boardId } });
    const [createColumn] = useMutation(CREATE_COLUMN, { refetchQueries: [GET_BOARD] });

    const [columnName, setColumnName] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);

    if (loading) return <p>Loading board…</p>;
    if (error) return <p style={{ color: 'crimson' }}>{error.message}</p>;

    async function handleAddColumn() {
        if (!columnName.trim()) return;
        const position = (data?.boards_by_pk?.columns?.length || 0) + 1;
        await createColumn({ variables: { board_id: boardId, name: columnName, position } });
        setColumnName('');
        setDialogOpen(false);
    }

    return (
        <div style={{ padding: 24 }}>
            <h1>{data.boards_by_pk.name}</h1>

            <div className="grid gap-4 mt-4" style={{ gridTemplateColumns: `repeat(${data.boards_by_pk.columns.length}, 1fr) 50px` }}>
                {(data.boards_by_pk.columns || []).map((col: any) => (
                    <Column key={col.id} col={col} />
                ))}

                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <div className="flex items-start">
                            <Button variant="outline" size="icon" className="w-full h-full">
                                <Plus className="h-5 w-5" />
                            </Button>
                        </div>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create a new column</DialogTitle>
                        </DialogHeader>
                        <Input
                            placeholder="Column name"
                            value={columnName}
                            onChange={(e) => setColumnName(e.target.value)}
                        />
                        <Button className="w-full mt-4" onClick={handleAddColumn}>
                            Add Column
                        </Button>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};