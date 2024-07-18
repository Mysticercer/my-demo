import cloneDeep from "lodash/cloneDeep";
import isArray from 'lodash/isArray'
import isNumber from 'lodash/isNumber'
import startsWith  from "lodash/startsWith";
import isEmpty  from "lodash/isEmpty";
import isEqual  from "lodash/isEqual";
import difference  from "lodash/difference";
import remove  from "lodash/remove";
import isNull from "lodash/isNull";

export const deepClone = cloneDeep;
export const _isArray = isArray;
export const _isNumber = isNumber;
export const _startsWith = startsWith;
export const _isEmpty = isEmpty;
export const _isEqual = isEqual; 
export const _difference = difference;
export const _remove = remove;
export const _isNull= isNull;