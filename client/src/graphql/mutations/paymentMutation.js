import { gql } from "@apollo/client";

export const MAKE_PAYMENT = gql`
mutation($tokenId: ID!, $bookingId: ID!, $bookedBy: ID!){
    payAmount(tokenId: $tokenId, bookingId: $bookingId, bookedBy: $bookedBy){
      id
      from
      to
      bookedBy{
          name
      }
    }
  }
`