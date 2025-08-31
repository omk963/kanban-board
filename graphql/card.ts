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