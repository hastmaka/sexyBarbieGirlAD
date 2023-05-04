import {colorArray} from "./staticData/StaticData";

export const updateColorAfterAddAVariation = (color, newColor) => {
    const existedColor = color.findIndex(item => item.color === newColor.toLowerCase());
    if(!!existedColor) {
        const colorAndHex = colorArray.find(item => item.color === newColor.toLowerCase());
        const tempColor = {...colorAndHex, image: []};
        return [...color, tempColor]
    }
}