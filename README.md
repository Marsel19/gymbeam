# gymbeam
This app is for testing and interview purpose.


Repository: (https://github.com/Marsel19/gymbeam.git)

# Development use
1. copy `.env` into server root directory.
2. run `npm install` for dependencies
3. run `npm run start` for start server

# App use
To use the App you need to call endpoint `localhost:3000/getProductPositions`.
It is a POST method and the payload object in JSON format contains properties: `product` and `workerPosition`.

The `product` is the name of searching product.
The `workerPosition` is current position of an employee.

The format of JSON property is:
{
    "product": string,
    "workerPosition": {
        "x": string,
        "y": string,
        "z": string
    }
}

Example:
{
    "product": "product-1",
    "workerPosition": {
        "x": "65",
        "y": "2",
        "z": "80"
    }
}