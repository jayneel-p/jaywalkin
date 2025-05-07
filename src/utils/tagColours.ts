// src/utils/tagColors.ts
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
  
  export function getTagColor(tag: string, allTags: string[]): string {
    const index = allTags.indexOf(tag);
    const color = colorVars[index % colorVars.length] || '--highlight-olive';
    return `var(${color})`;
  }