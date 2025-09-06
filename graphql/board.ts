import { gql } from '@apollo/client';

// Fetch a single board with its columns and cards, ordered by position.
export const GET_BOARD = gql`
    query GetBoard($id: uuid!) {
        boards_by_pk(id: $id) {
        id
        name
        columns(order_by: { position: asc }) {
            id
            name
            position
            cards(order_by: { position: asc }) {
                id
                title
                description
                position
            }
        }
        }
    }
`;

// Add a new column to a board
export const CREATE_COLUMN = gql`
    mutation CreateColumn($board_id: uuid!, $name: String!, $position: float8!) {
        insert_columns_one(object: { board_id: $board_id, name: $name, position: $position }) {
        id
        name
        position
        }
    }
`;

// Add a new card to a column
export const CREATE_CARD = gql`
    mutation CreateCard($column_id: uuid!, $title: String!, $position: float8!) {
        insert_cards_one(object: { column_id: $column_id, title: $title, position: $position }) {
        id
        title
        position
        }
    }
`;