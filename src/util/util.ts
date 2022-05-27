/* eslint-disable default-param-last */
export default class Util {
  static getObjectKeys(obj: { [x: string]: any; }, previousPath = '', objectKeys:any) {
    // Step 1- Go through all the keys of the object
    Object.keys(obj).forEach((key) => {
      // Get the current path and concat the previous path if necessary
      const currentPath = previousPath ? `${previousPath}.${key}` : key;
      // Step 2- If the value is a string, then add it to the keys array
      if (typeof obj[key] !== 'object') {
        objectKeys.push(currentPath);
      } else {
        objectKeys.push(currentPath);
        // Step 3- If the value is an object, then recursively call the function
        Util.getObjectKeys(obj[key], currentPath, objectKeys);
      }
    });
    return objectKeys;
  }

  static getObjectValuesInArray(data: object) {
    const properties = Object.values(data);
    return properties.map((e:any) => {
      if (typeof e === 'object') {
        return [...Object.values(e)];
      }
      return e;
    }).flat();
  }
}
