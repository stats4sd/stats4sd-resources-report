export const filterGAPageData = (allResults, searchString) => {
  return allResults.filter(
    innerArray => innerArray[0].toString().includes(searchString) //check if string contains /resources to omit other urls
  );
};
