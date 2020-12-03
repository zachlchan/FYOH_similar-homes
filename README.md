# Similar Homes Carousel

This service displays similar homes related to a real estate listing and indicates if the displayed listings have been saved to the user's favorites list.


## Table of Contents

[API Documentation](#api-documentation)
* [List similar homes](#list-similar-homes)
* [Add similar home](#add-similar-home)
* [Update similar home](#update-similar-home)
* [Remove similar listing](#remove-similar-home)

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


* ### Update similar home
  * __PUT__ ```/similar-homes/:similar-home_id```

    *Updates the details of an existing listing*

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
