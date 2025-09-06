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