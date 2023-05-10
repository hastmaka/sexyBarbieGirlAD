import {createId} from './createId';
import {handleDecimalsOnValue} from "./handleDecimalsOnValue";
import {sortArray} from "./sortArray";
import {getNameFromUrl} from "./getNameFromUrl";
import {uploadToFirebaseStorage} from "./uploadToFirebaseStorage";
import {handleDeleteImage} from "./handleDeleteImage";
import {deleteFileFromFirestore} from "./deleteFileFromFirestore";
import {openModal} from "./openModal";
import {updateFilter} from "./updateFilter";
import {checkImageNameBeforeUpload} from "./checkImageNameBeforeUpload";
import {handleAddImageToVariation} from "./handleAddImageToVariation";
import {sanitizeProduct} from "./sanitizeProduct";
import {areArrayOfObjectsEqual} from "./areArrayOfObjectsEqual";
import {capitalizeFirstLetter} from "./capitalizeFirstLetter";
import {createAccountProcess, loginProcess, logOut} from './helper';
import {getColumnDataToRenderNewRow} from "./getColumnDataToRenderNewRow";
import {deepCopy} from "./deepCopy";
import {findFirst} from "./findFirst";
import {checkValidFields} from "./checkValidFields";

export {
    createId,
    handleDecimalsOnValue,
    sortArray,
    getNameFromUrl,
    uploadToFirebaseStorage,
    handleDeleteImage,
    deleteFileFromFirestore,
    openModal,
    updateFilter,
    checkImageNameBeforeUpload,
    handleAddImageToVariation,
    sanitizeProduct,
    areArrayOfObjectsEqual,
    capitalizeFirstLetter,
    createAccountProcess,
    loginProcess,
    logOut,
    getColumnDataToRenderNewRow,
    deepCopy,
    findFirst,
    checkValidFields
}