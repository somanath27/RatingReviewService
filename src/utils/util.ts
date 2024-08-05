import * as path from 'path';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (
  value: string | number | boolean | Array<unknown> | object
): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'boolean' && value === true) {
    return false;
  } else if (typeof value === 'boolean' && value === false) {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    !Object.keys(value).length
  ) {
    return true;
  } else if (
    value !== null &&
    typeof value === 'object' &&
    Array.isArray(value) &&
    !value.length
  ) {
    return true;
  } else {
    return false;
  }
};

export const generateRandomID = (): number => {
  const dateNum = +Date.now().toString().slice(-7);
  const randomNum = Math.floor(dateNum * (Math.random() * 100)).toString();

  if (randomNum.length > 8) randomNum.slice(0, 8);

  return +randomNum;
};

export const customReplaceAll = (
  input: string,
  find: string,
  replace: string
): string => {
  return input.replace(new RegExp(find, 'g'), replace);
};

export const removeBlankValue = (value: any) => {
  if (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    !Object.keys(value).length
  ) {
    for (const i in value)
      if (value[i] === '' || value[i] === undefined) delete value[i];

    return value;
  } else if (
    value !== null &&
    typeof value === 'object' &&
    Array.isArray(value) &&
    !value.length
  ) {
    return value.filter(el => el !== '' || el !== undefined || el !== null);
  }
  return value;
};

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getFileExt = (filePath: string): string => {
  return path.extname(filePath);
};
