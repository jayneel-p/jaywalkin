// Define color variables once
export const colorVars = [
  '--accent-yellow',
  '--accent-red',
  '--accent-green',
  '--highlight-purple',
  '--highlight-pink',
  '--highlight-salmon',
  '--highlight-dandelion',
  '--highlight-blue',
  '--highlight-olive',
];

// Default color for when no match is found
export const defaultColorVar = '--highlight-olive';

/**
 * Get color variable for a tag based on its position in allTags
 * @param {string} tag - The tag to get a color for
 * @param {string[]} allTags - Array of all tags for consistent coloring
 * @returns {string} CSS variable name for the color
 */
export function getTagColorVar(tag, allTags) {
  const tagIndex = allTags.indexOf(tag);
  return tagIndex >= 0 
    ? colorVars[tagIndex % colorVars.length] 
    : defaultColorVar;
}

/**
 * Get the CSS color value for a tag
 * @param {string} tag - The tag to get a color for
 * @param {string[]} allTags - Array of all tags for consistent coloring
 * @returns {string} CSS color in var() format
 */
export function getTagColor(tag, allTags) {
  return `var(${getTagColorVar(tag, allTags)})`;
}

/**
 * Get the first tag's color for an article
 * @param {string[]} articleTags - Array of tags for the article
 * @param {string[]} allTags - Array of all tags for consistent coloring
 * @returns {string} CSS color in var() format
 */
export function getFirstTagColor(articleTags, allTags) {
  return articleTags?.length 
    ? getTagColor(articleTags[0], allTags)
    : `var(${defaultColorVar})`;
}
