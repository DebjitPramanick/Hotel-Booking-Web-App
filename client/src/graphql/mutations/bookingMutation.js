import { gql } from "@apollo/client";

/*

room
hotel
*/

export const ADD_BOOKING = gql`
mutation($from: Date!, $to: Date!, $roomNumber: Int!, $paid: Boolean!, $amount: Int!,
    $bookedBy: bookedBy, $people: {children: Int!, adults: Int!}, $room: ID!, $hotel: ID!){

    addHotel(from: $from, to: $to, roomNumber: $roomNumber, paid: $paid, amount: $amount,
        bookedBy: $bookedBy, people: $people, room: $room, hotel: $hotel){
      id
      from
      to
      bookedBy
    }
  }
`