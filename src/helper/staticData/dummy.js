const dummyProduct = {
    "active": true,
    "category": [
        "bikini"
    ],
    "color": [
        {
            color: "INDIANRED",
            image: []
        },
        {
            color: "LIGHTCORAL",
            image: []
        }

    ],
    "description": [
        {
            "name": "Style",
            "value": "bikini"
        }
    ],
    "image": [
        {
            "url": "https://firebasestorage.googleapis.com/v0/b/sexybarbiegirl-f6068.appspot.com/o/products%2Fnob%2Fnob.jpg?alt=media&token=c5e464cf-9b7d-4cee-b5c5-e376d34799fc",
            "id": "RhJS2ZlXKzFkG1KqT7Ow",
            "name": "nob.jpg"
        },
        {
            "url": "https://firebasestorage.googleapis.com/v0/b/sexybarbiegirl-f6068.appspot.com/o/products%2Fnob%2Fnob_1.jpg?alt=media&token=3d17c3da-9ff4-4b77-b9e6-a9a8ac374fcb",
            "id": "xPSRmz08dFYlpEsWkByJ",
            "name": "nob_1.jpg"
        },
        {
            "url": "https://firebasestorage.googleapis.com/v0/b/sexybarbiegirl-f6068.appspot.com/o/products%2Fnob%2Fnob_2.jpg?alt=media&token=e4fafeda-954d-4e3d-aeb2-4d2e3f57db32",
            "id": "d9RBLRlwCjIaRNSZDgdv",
            "name": "nob_2.jpg"
        },
        {
            "url": "https://firebasestorage.googleapis.com/v0/b/sexybarbiegirl-f6068.appspot.com/o/products%2Fnob%2Fnob_3.jpg?alt=media&token=2c59da6e-0240-49e2-b86b-2c6de8001357",
            "id": "modL4uHVeUDKgwVIgDzJ",
            "name": "nob_3.jpg"
        }
    ],
    "name": "Second Test",
    "price": 25.99,
    "size": [
        "XXS",
        "XS"
    ],
    "statistic": {
        "average_rating": 0,
        "date_on_sale_from": "",
        "date_on_sale_to": "",
        "sales": {},
        "total_review": 0
    },
    "stock": true,
    "variation": [
        {
            "id": "TRywYTbg5TydJvshD8AZ",
            "price": 25.99,
            "color": "INDIANRED",
            "size": "XXS",
            "stock": 10,
            "discount": 0,
            "checked": true,
            "varImage": []
        },
        {
            "id": "tR0JfTz4smGblyRskKNs",
            "price": 25.99,
            "color": "INDIANRED",
            "size": "XS",
            "stock": 10,
            "discount": 0,
            "checked": true,
            "varImage": []
        },
        {
            "id": "T2P5tYb2l5YSzHzh5jcS",
            "price": 25.99,
            "color": "LIGHTCORAL",
            "size": "XXS",
            "stock": 10,
            "discount": 0,
            "checked": true,
            "varImage": []
        },
        {
            "id": "UdjtTwWCOYjDKQPZkzGR",
            "price": 25.99,
            "color": "LIGHTCORAL",
            "size": "XS",
            "stock": 10,
            "discount": 0,
            "checked": true,
            "varImage": []
        }
    ]
}

const tempProduct = {
    "active": true,
    "category": [
        "bikini"
    ],
    "color": [
        {
            "color": "INDIANRED",
            "hex": "#CD5C5C",
            "image": [
                {
                    "File": {},
                    "id": "ACGe4Ha9L7Y21wkNHjbY",
                    "uploaded": true,
                    "url": "https://firebasestorage.googleapis.com/v0/b/sexybarbiegirl-f6068.appspot.com/o/products%2Fbikini%2FINDIANRED%2Fnob.jpg?alt=media&token=02db5dca-6a46-40a4-8910-07f85bfbb6fc"
                }
            ]
        }
    ],
    "description": [
        {
            "name": "Style",
            "value": "bikini"
        }
    ],
    "name": "Second Test",
    "price": 25.99,
    "size": [
        "XXS"
    ],
    "statistic": {
        "average_rating": 0,
        "date_on_sale_from": "",
        "date_on_sale_to": "",
        "sales": {},
        "total_review": 0
    },
    "stock": true,
    "variation": [
        {
            "id": "r1E0YPCmnMCQnZmEwGyl",
            "price": 25.99,
            "color": "INDIANRED",
            "size": "XXS",
            "stock": 10,
            "discount": 0,
            "checked": true
        }
    ]
}


// const san = (t) => {
//     const {color, ...rest} = t;
//     let temp = [];
//     for (let i = 0; i < color.length; i++) {
//         const {color: name, ...rest} = color[i];
//         let img = []
//         for (let j = 0; j < color[i].image.length; j++) {
//             const {id, url, ...rest} = color[i].image[j]
//             img.push({id, url})
//             temp.push({image: [...img], color: name})
//         }
//     }
//     return {color: temp, ...rest}
// }
//
// console.log(san(tempProduct))




























