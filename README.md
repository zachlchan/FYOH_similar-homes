# System Design Capstone

> Deploy and scale a service to support up to 10K requests per second


## Table of Contents

[API Documentation](#api-documentation)
* [List similar homes](#list-similar-homes)
* [Create listing](#create-listing)
* [Update listing](#update-listing)
* [Delete listing](#delete-listing)

## API Documentation

**Base url:** /api/homes

API reference for managing home listing data that supports the similar listings carousel

#### List similar homes
**GET** /listings/:listing_id/similar

Lists home profiles that are similar to a selected home listing

#### Path Parameters
```listing_id``` integer

The unique id of the selected home listing

#### Success Status Code:
```200```

#### Response

An array of primary listing objects

```json
[
  {
    "id": "Number",
    "price": "String",
    "size_bd": "Number",
    "size_ba": "Number",
    "size_sqft": "String",
    "address": "String",
    "neighborhood": "String",
    "image": "String"
  }
]
```

#### Create Listing
**POST** /listings

Creates a new home listing

#### Request Body
```json
{
  "id": "Number",
  "price": "String",
  "size_bd": "Number",
  "size_ba": "Number",
  "size_sqft": "String",
  "address": "String",
  "neighborhood": "String",
  "image": "String"
}
```

#### Success Status Code
```201```

#### Response
errors

Any errors that occurred during the request.


#### Update Listing
**PUT** /listings/:listing_id

Updates the details of an existing listing

#### Path Parameters
```listing_id``` integer

**REQUIRED**

The unique id of the home listing to update

#### Request Body
JSON object containing the attributes to be updated. All attributes must be included.
```json
{
  "id": "Number",
  "price": "String",
  "size_bd": "Number",
  "size_ba": "Number",
  "size_sqft": "String",
  "address": "String",
  "neighborhood": "String",
  "image": "String"
}
```
#### Success Status Code
```204```

#### Response
errors

Any errors that occurred during the request.

#### Delete Listing
**DELETE** /listings/:listing_id

Removes a home listing from the database.

#### Path Parameters
```listing_id``` integer

**REQUIRED**

The unique id of the home listing to be removed.

#### Success Status Code
```204```

#### Response
errors

Any errors that occurred during the request.
