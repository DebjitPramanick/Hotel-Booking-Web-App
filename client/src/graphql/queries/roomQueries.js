import {gql} from "@apollo/client";

export const GET_ROOM = gql`
query($id: ID!){
  getRoom(id: $id){
    id
    images
    name
    description
    occupancy
    others
    price
    addedOn
    ratings
  }
}
`