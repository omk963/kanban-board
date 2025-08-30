"use client";

import { gql, useQuery } from "@apollo/client";

// GraphQL Query
const GET_BOARDS = gql`
    query Boards {
        boards {
            id
            name
        }
    }
`;

export default function BoardsPage() {
    const { data, loading, error } = useQuery(GET_BOARDS); // runs automatically when component mounts

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Boards</h1>
            <ul className="space-y-2">
                {data.boards.map((board: any) => (
                    <li key={board.id} className="p-3 bg-gray-100 rounded-lg shadow">
                        {board.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
