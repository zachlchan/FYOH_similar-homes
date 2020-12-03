# Similar Homes Carousel

This service displays similar homes related to a real estate listing and indicates if the displayed listings have been saved to the user's favorites list.


## Table of Contents

[API Documentation](#api-documentation)
* [List similar homes](#list-similar-homes)
* [Create listing](#create-listing)
* [Update listing](#update-listing)
* [Delete listing](#delete-listing)

## API Documentation

**Base url:** /api/homes

API reference for managing home listing data that supports the similar listings carousel

* ### List similar homes
  * __GET__ /listings/:listing_id/similar

    *Lists home profiles that are similar to a selected home listing*
  * __Path Parameters:__

      ```listing_id``` integer

      *The unique ID of the selected home listing*
  * Success Status Code: ```200```
  * __Response:__
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

* ### Create Listing
  * __POST__ /listings

    *Creates a new home listing*

  * __Request Body:__
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

  * Success Status Code: ```201```

  * __Response:__

    errors

    *Any errors that occurred during the request.*


* ### Update Listing
  * __PUT__ /listings/:listing_id

    *Updates the details of an existing listing*

  * __Path Parameters__

    ```listing_id``` integer

    **REQUIRED**

    *The unique ID of the home listing to update*

  * __Request Body:__

    *JSON object containing the attributes to be updated. All attributes must be included.*
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
  * Success Status Code: ```204```

  * __Response:__

    errors

    *Any errors that occurred during the request.*

* ### Delete Listing
  * __DELETE__ /listings/:listing_id

    *Removes a home listing from the database.*

  * __Path Parameters:__

    ```listing_id``` integer

    **REQUIRED**

    *The unique id of the home listing to be removed.*

  * Success Status Code: ```204```

  * __Response:__

    errors

    *Any errors that occurred during the request.*
