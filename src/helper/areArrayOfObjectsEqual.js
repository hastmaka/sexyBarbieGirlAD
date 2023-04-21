export default function areArrayOfObjectsEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        const obj1 = arr1[i];
        const obj2 = arr2[i];
        const objKeys = Object.keys(obj1);
        if (objKeys.length !== Object.keys(obj2).length) {
            return false;
        }
        for (let j = 0; j < objKeys.length; j++) {
            const key = objKeys[j];
            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }
    }
    return true;
}