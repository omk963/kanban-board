'use client';

import { useQuery, useMutation } from '@apollo/client';
import { GET_BOARD, CREATE_COLUMN } from "@/graphql"
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Card from "./Card";
import CardForm from "./CardForm";

export default function BoardPage() {
    const params = useParams(); // grabs the board ID from the URL
    const boardId = params.id;

    const { data, loading, error } = useQuery(GET_BOARD, { variables: { id: boardId } });
    const [createColumn] = useMutation(CREATE_COLUMN, { refetchQueries: [GET_BOARD] });

    const [columnName, setColumnName] = useState('');

    if (loading) return <p>Loading board…</p>;
    if (error) return <p style={{ color: 'crimson' }}>{error.message}</p>;

    async function handleAddColumn() {
        if (!columnName.trim()) return;
        const position = (data?.boards_by_pk?.columns?.length || 0) + 1;
        await createColumn({ variables: { board_id: boardId, name: columnName, position } });
        setColumnName('');
    }

    return (
        <div style={{ padding: 24 }}>
            <h1>{data.boards_by_pk.name}</h1>

            <div style={{ display: 'flex', gap: 24, marginTop: 20 }}>
                {(data.boards_by_pk.columns || []).map((col: any) => (
                    <div key={col.id} style={{ border: '1px solid gray', padding: 12, minWidth: 200 }}>
                        <h2>{col.name}</h2>

                        <ul>
                            {(col.cards || []).map((card: any) => (
                                <Card key={card.id} card={card} />
                            ))}
                        </ul>

                        <CardForm columnId={col.id} />
                    </div>
                ))}

                <div>
                    <input
                        placeholder="New column name"
                        value={columnName}
                        onChange={(e) => setColumnName(e.target.value)}
                        className='bg-gray-100 border-2 border-gray-400 p-2 rounded-md mr-2'
                    />
                    <button onClick={handleAddColumn} className='p-2 bg-green-300 rounded-md'>Add Column</button>
                </div>
            </div>
        </div>
    );
}
