import {createId} from "./createId";

export const handleAddImageToVariation = (image, row, array) => {
    const indexToUpdate = array.findIndex(i => i.id === row.id);
    for (let i = 0; i < image.length; i++) {
        if(!!row.varImage.length) {
            if(!!array[indexToUpdate].varImage.find(item => item.File.name === image[i].name)) continue;
        }
        array[indexToUpdate] = {
            ...array[indexToUpdate],
            varImage: [...array[indexToUpdate].varImage, {
                File: image[i],
                id: createId(20),
                uploaded: false
            }]
        }
    }

    return array
}