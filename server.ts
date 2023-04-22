import express from "express";
import axios from "axios";
import cors from "cors";
import { DistanceItem, ProductItem } from "./types";
import { getSortedItems } from "./src/helpers";

import { PORT, KEY } from "./src/config/env";

const app: express.Application = express();

app.use(cors());

app.use(express.json());

const port: number = parseInt(PORT as string);

const config: {
    headers: {
        [key: string]: string;
    };
} = {
    headers: {
        "x-api-key": KEY as string,
    },
};

app.post("/getProductPositions", async (req, res) => {
    try {
        const { product: product, workerPosition: workerPosition } = req.body;

        const { data: data } = await axios.get(
            `https://dev.aux.boxpi.com/case-study/products/${product}/positions`,
            config
        );

        if (data && data.length > 0) {
            const toCheckItems: ProductItem[] = [...data];
            const checkedItems: ProductItem[] = [];
            let count: number = 0;
            let overallDistance: number = 0;
            do {
                // Get sorted distances of products
                const sortedData: DistanceItem[] = getSortedItems(
                    workerPosition,
                    toCheckItems
                );

                const closestItemId = toCheckItems
                    .map((el: ProductItem) => el.positionId)
                    .indexOf(sortedData[0].id);
                checkedItems.push(toCheckItems.splice(closestItemId, 1)[0]);
                overallDistance += sortedData[0].distance;
                count++;
            } while (count < data.length);

            res.json({
                products: checkedItems,
                distance: overallDistance,
            });
        } else {
            res.json(`There is no product: ${product}`);
        }
    } catch (e: unknown) {
        const { message } = e as Error;
        res.status(500).json(`Server error: ${message}`);
    }
});

app.listen(port, () => {
    console.log(`The server is running on the port ${port}`);
});
