type ObjectWithAnyAttribues = { [key: string]: any };
/**
 *
 * @param Object with any atributes f.e {a:1,b:2}
 * @returns searchQ in format ?&{key=val}&{nKey=nVal} f.e: ?&a=1&b=2
 */
export const generateSearchQueryFromObject = (
  object: ObjectWithAnyAttribues
) => {
  let searchQuery = "?";

  for (const [key, value] of Object.entries(object)) {
    searchQuery += `&${key}=${value}`;
  }

  return searchQuery;
};
