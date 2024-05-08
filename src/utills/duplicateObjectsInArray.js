function duplicateObjectsInArray(object, count) {
  return Array.from({ length: count }, () => ({ ...object }));
}
export default duplicateObjectsInArray;