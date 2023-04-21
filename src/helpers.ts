import { CoordinatesItem, DistanceItem, ProductItem } from "../types";

/**
 * Calculates the distance between two points in 3D model.
 * @param userCoordinates CoordinatesItem
 * @param productCoordinates CoordinatesItem
 * @returns number
 */
export const getDistance = (
    userCoordinates: CoordinatesItem,
    productCoordinates: CoordinatesItem
): number => {
    return parseFloat(
        Math.sqrt(
            Math.pow(
                parseInt(userCoordinates.x) - parseInt(productCoordinates.x),
                2
            ) +
                Math.pow(
                    parseInt(userCoordinates.y) -
                        parseInt(productCoordinates.y),
                    2
                ) +
                Math.pow(
                    parseInt(userCoordinates.z) -
                        parseInt(productCoordinates.z),
                    2
                )
        ).toFixed(2)
    );
};

/**
 * Get an array with product distance and ID sorted accoding to the distance.
 * @param workerPosition CoordinatesItem
 * @param toCheckItems ProductItem[]
 * @returns DistanceItem[]
 */
export const getSortedItems = (
    workerPosition: CoordinatesItem,
    toCheckItems: ProductItem[]
): DistanceItem[] => {
    const parsedData: DistanceItem[] = toCheckItems.map((el: ProductItem) => {
        return {
            id: el.positionId,
            distance: getDistance(workerPosition, {
                x: el.x,
                y: el.y,
                z: el.z,
            }),
        };
    });

    // Sorted array according to distance
    return parsedData.sort((a: DistanceItem, b: DistanceItem) => {
        if (a.distance < b.distance) {
            return -1;
        }

        if (a.distance > b.distance) {
            return 1;
        }
        return 0;
    });
};
