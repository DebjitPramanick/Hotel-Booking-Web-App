import { gql } from "@apollo/client";

export const ADD_BOOKING = gql`
mutation($from: Date!, $to: Date!, $roomNumbers: [Int]!, $paid: Boolean!, $amount: Int!,
    $bookedBy: ID!, $people: people!, $room: ID!, $hotel: ID!){
    addBooking(from: $from, to: $to, roomNumbers: $roomNumbers, paid: $paid, amount: $amount, 
        bookedBy: $bookedBy, people: $people, room: $room, hotel: $hotel){
      id
      from
      to
      bookedBy{
          name
      }
    }
  }
`

export const CANCEL_BOOKING = gql`
mutation($id: ID!){
    cancelBooking(id: $id){
      id
      from
      to
      bookedBy{
          name
      }
    }
  }
`