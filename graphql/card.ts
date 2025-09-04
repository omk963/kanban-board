import { gql } from '@apollo/client';

// Add a new card to a column
export const CREATE_CARD = gql`
    mutation CreateCard($column_id: uuid!, $title: String!, $description: String!, $position: float8!) {
        insert_cards_one(object: { column_id: $column_id, title: $title, description: $description, position: $position }) {
        id
        title
        description
        position
        }
    }
`;

// Update a single card
export const UPDATE_CARD = gql`
    mutation UpdateCard($id: uuid!, $title: String, $description: String) {
        update_cards_by_pk(
            pk_columns: {id: $id}
            _set: {title: $title, description: $description}
        ) {
            id
            title
            description
        }
    }
`;

// Delete a single card
export const DELETE_CARD = gql`
    mutation DeleteCard($id: uuid!) {
        delete_cards_by_pk(id: $id) {
            id
        }
    }
`;