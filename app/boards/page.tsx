"use client";

import { useQuery, useMutation } from '@apollo/client';
import { GET_BOARDS, CREATE_BOARD } from '@/graphql/boards';
import { useState } from 'react';
import Link from 'next/link';

export default function BoardsPage() {
    const { data, loading, error } = useQuery(GET_BOARDS); // runs automatically when component mounts
    const [createBoard] = useMutation(CREATE_BOARD, {
        refetchQueries: [GET_BOARDS], // auto-refresh list after create
    });
    const [boardName, setBoardName] = useState('');

    async function handleCreate() {
        if (!boardName.trim()) return;
        const position: number = (data?.boards?.length || 0) + 1;
        await createBoard({ variables: { name: boardName, position } });
        setBoardName('');
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className='p-8'>
            <h1>My Boards</h1>

            <ul >
                {data?.boards?.map((b: any) => (
                    <li key={b.id} className='p-2 bg-gray-400 border-2 rounded-md mb-2'>
                        <Link href={`/boards/${b.id}`}>
                            {b.name}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className='mt-5'>
                <input
                    placeholder="New board name"
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                    className='bg-gray-100 border-2 border-gray-400 p-2 rounded-md mr-2'
                />
                <button
                    onClick={handleCreate}
                    className='p-2 bg-green-300 rounded-md'
                >
                    Add Board
                </button>
            </div>
        </div>
    );
}