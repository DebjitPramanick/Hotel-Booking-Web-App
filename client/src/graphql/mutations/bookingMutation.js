import { gql } from "@apollo/client";

export const ADD_BOOKING = gql`
mutation($from: Date!, $to: Date!, $roomNumber: Int!, $paid: Boolean!, $amount: Int!,
    $bookedBy: ID!, $people: people!, $room: ID!, $hotel: ID!){
    addBooking(from: $from, to: $to, roomNumber: $roomNumber, paid: $paid, amount: $amount, 
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