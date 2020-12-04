# Similar Homes Carousel

This service displays an carousel consisting of images and details of similar homes related to a real estate listing.

## Table of Contents

[API Documentation](#api-documentation)
* [List similar homes](#list-similar-homes)
* [Add similar home](#add-similar-home)
* [Update similar home](#update-similar-home)
* [Remove similar listing](#remove-similar-home)
* [List favorites](#list-favorites)
* [Add favorite listing](#add-favorite-listing)
* [Remove favorite listing](#remove-favorite-listing)

## API Documentation

**Base url:** /api/listings/:listing_id

API reference for managing home listing data that supports the similar listings carousel

* ### List similar homes
  * __GET__ ```/similar-homes```

    *Lists home profiles that are similar to a selected listing*

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

* ### Add similar home
  * __POST__ ```/similar-homes```

    *Add a listing to collection of similar homes*

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

    ```errors```

    *Any errors that occurred during the request.*

  * Error Status Code: ```400```


* ### Update similar home
  * __PUT__ ```/similar-homes/:similar-home_id```

    *Updates the similarity weighting of a similar home*

  * __Path Parameters__

    ```similar-home_id``` integer

    ****REQUIRED***

    *The unique ID of the similar home listing to update*

  * __Request Body:__

    *JSON object containing the attributes to be updated. All attributes must be included.*
    ```json
    {
      "similarity_weight": "Number",
    }
    ```
  * Success Status Code: ```204```

  * __Response:__

    ```errors```

    *Any errors that occurred during the request.*

  * Error Status Code: ```400```

* ### Remove similar home
  * __DELETE__ ```/similar-homes/:similar-home_id```

    *Removes a home listing from the similar homes collection.*

  * __Path Parameters:__

    ```similar-home_id``` integer

    ****REQUIRED***

    *The unique id of the similar home listing to be removed.*

  * Success Status Code: ```204```

  * __Response:__

    ```errors```

    *Any errors that occurred during the request.*

  * Error Status Code: ```400```

* ### List favorites
  * __GET__ ```/user/:user_id/favorites```

    *Lists a users favorited listings by listing ID*

  * __Path Parameters:__

      ```user_id``` integer

      *The unique ID of the user*

  * Success Status Code: ```200```
  * __Response:__
    ```json
    [
      {
        "favorite_id": "Number",
      }
    ]
    ```

* ### Add favorite listing
  * __POST__ ```user/user:id/favorites/```

    *Add a listing to collection of similar homes*

  * __Path Parameters:__

    ```user_id``` integer

    ****REQUIRED***

    *The unique id of the favorited listing to be added.*

  * __Request Body:__
    ```json
    {
      "favorite_id": "Number",
    }
    ```

  * Success Status Code: ```201```

  * __Response:__

    ```errors```

    *Any errors that occurred during the request.*

  * Error Status Code: ```400```

* ### Remove favorite listing
  * __DELETE__ ```user/user:id/favorites/```

    *Removes a favorited listing from the user's favorites.*

  * __Path Parameters:__

    ```user_id``` integer

    ****REQUIRED***

    *The unique id of the favorited listing to be removed.*

  * __Request Body:__
    ```json
    {
      "favorite_id": "Number",
    }
    ```

  * Success Status Code: ```204```

  * __Response:__

    ```errors```

    *Any errors that occurred during the request.*

  * Error Status Code: ```400```

