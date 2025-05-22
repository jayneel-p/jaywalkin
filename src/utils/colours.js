/**
 * Color variables for tags
 * @type {string[]}
 */
export const colorVars = [
"  --color-tag-red",
"  --color-tag-orange",
" --color-tag-yellow",
"  --color-tag-green",  
" --color-tag-teal",
"  --color-tag-blue",   
"  --color-tag-purple", 
"  --color-tag-pink",    
" --color-tag-olive",
"  --color-tag-salmon:", 
"  --color-tag-lavender" ,
];

/**
 * Default color variable
 * @type {string}
 */
export const defaultColorVar = '--highlight-olive';

/**
 * Get color for a tag
 * @param {string} tag - The tag to get color for
 * @param {string[]} allTags - Array of all tags
 * @returns {string} CSS color value
 */
export function getTagColor(tag, allTags) {
  const tagIndex = allTags.indexOf(tag);
  return `var(${tagIndex >= 0 
    ? colorVars[tagIndex % colorVars.length] 
    : defaultColorVar})`;
}

/**
 * Get first tag's color for an article
 * @param {string[] | undefined} tags - Array of article tags or undefined
 * @param {string[]} allTags - Array of all tags
 * @returns {string} CSS color value
 */
export function getFirstTagColor(tags, allTags) {
  if (!tags || tags.length === 0) {
    return `var(${defaultColorVar})`;
  }
  return getTagColor(tags[0], allTags);
}