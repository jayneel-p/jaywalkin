/**
 * Colour variables for tags
 * @type {string[]}
 */
export const colorVars = [
  "--colour-tag1", //
  "--colour-tag2", //
  "--colour-tag3", //
  "--colour-tag4", //
  "--colour-tag5", //
  "--colour-tag6", //
];

/**
 * Default colour variable
 * @type {string}
 */
export const defaultColorVar = '--colour-tag1';

/**
 * Get colour for a tag
 * @param {string} tag - The tag to get colour for
 * @param {string[]} allTags - Array of all tags
 * @returns {string} CSS colour value
 */
export function getTagColor(tag, allTags) {
  const tagIndex = allTags.indexOf(tag);
  return `var(${tagIndex >= 0 
    ? colorVars[tagIndex % colorVars.length] 
    : defaultColorVar})`;
}

/**
 * Get first tag's colour for an article
 * @param {string[] | undefined} tags - Array of article tags or undefined
 * @param {string[]} allTags - Array of all tags
 * @returns {string} CSS colour value
 */
export function getFirstTagColor(tags, allTags) {
  if (!tags || tags.length === 0) {
    return `var(${defaultColorVar})`;
  }
  return getTagColor(tags[0], allTags);
}