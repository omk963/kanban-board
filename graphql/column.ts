import { gql } from '@apollo/client';

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

// Fetch a single column with its cards, ordered by position
export const GET_COLUMN = gql`
    query GetColumn($id: uuid!) {
        columns_by_pk(id: $id) {
            id
            name
            cards(order_by: {position: asc}) {
                id
                title
                description
                position
            }
        }
    }
`;

// Update a single column
export const UPDATE_COLUMN = gql`
    mutation Updatecolumn($id: uuid!, $name: String, $description: String) {
        update_columns_by_pk(
            pk_columns: {id: $id}
            _set: {name: $name}
        ) {
            id
            name       
        }
    }
`;

// Delete a single column
export const DELETE_COLUMN = gql`
    mutation Deletecolumn($id: uuid!) {
        delete_columns_by_pk(id: $id) {
            id
        }
    }
`;