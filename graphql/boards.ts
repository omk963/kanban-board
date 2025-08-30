import { gql } from "@apollo/client";

// Query all boards for the logged-in user
export const GET_BOARDS = gql`
    query GetBoards {
        boards(order_by: { position: asc }) {
        id
        name
        position
        }
    }
`;

// Create a new board
export const CREATE_BOARD = gql`
    mutation CreateBoard($name: String!, $position: float8!) {
        insert_boards_one(object: { name: $name, position: $position }) {
            id
            name
            position
        }
    }
`;
