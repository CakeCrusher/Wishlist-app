export const SIGN_IN_CUSTOMER = `
query MyQuery($password: String = "", $username: String = "") {
  customer(where: {password: {_eq: $password}, username: {_eq: $username}}) {
    id
    password
    username
  }
}
`
// {
//   "password": "secret",
//   "username": "Homer"
// }

export const GET_CUSTOMER_WISHLIST = `
query MyQuery($customerId: uuid = "") {
  wishlistItem(where: {customerId: {_eq: $customerId}}) {
    lat
    lng
    request
    timeCreated
    id
    offers {
      id
      accepted
    }
  }
}
`
// {
//   "customerId": "2fa81068-baa8-4d41-a091-77a31f1ee0aa"
// }

export const GET_WISHLISTITEM_OFFERS = `
query MyQuery($wishlistitemId: uuid = "") {
  offers(where: {wishlistitemId: {_eq: $wishlistitemId}}) {
    deliveryDate
    price
    business {
      businessName
      category {
        name
      }
    }
    accepted
    id
    wishlistItem {
      request
      id
    }
  }
}
`
// {
//   "wishlistitemId": "72931bf1-f35f-44ab-9009-e43b571017e8"
// }

export const ACCEPT_OFFER = `
mutation MyMutation($offerId: uuid = "") {
  update_offers(where: {id: {_eq: $offerId}}, _set: {accepted: true}) {
    returning {
      id
      accepted
    }
  }
}
`
// {
//   "offerId": "476cd848-78d1-4dbc-b4a4-6c9de5497925"
// }

export const DECLINE_OFFER = `
mutation MyMutation($offerId: uuid = "") {
  update_offers(where: {id: {_eq: $offerId}}, _set: {accepted: false}) {
    returning {
      id
      accepted
    }
  }
}
`
// {
//   "offerId": "476cd848-78d1-4dbc-b4a4-6c9de5497925"
// }

export const CREATE_WISHLISTITEM_PROCESS = `
mutation MyMutation($customerId: String = "", $lat: Float = 10, $lng: Float = 10, $request: String = "") {
  wishlistItemCreationProcess(customerId: $customerId, lat: $lat, lng: $lng, request: $request) {
    id
  }
}
`
// {
//   "customerId": "2fa81068-baa8-4d41-a091-77a31f1ee0aa",
//   "lat": 10,
//   "lng": 10,
//   "request": "I really want some beer"
// }