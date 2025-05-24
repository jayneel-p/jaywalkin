// src/utils/goodreads.js
export async function fetchGoodreadsBooks(userId, shelf = 'read', maxBooks = 50) {
  const rssUrl = `https://www.goodreads.com/review/list_rss/${userId}?shelf=${shelf}&per_page=${maxBooks}`;
  
  try {
    const response = await fetch(rssUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const rssText = await response.text();
    return parseGoodreadsRSS(rssText);
  } catch (error) {
    console.error('Error fetching Goodreads data:', error);
    return [];
  }

}

function parseGoodreadsRSS(rssText) {
  const books = [];
  const itemRegex = /<item>(.*?)<\/item>/gs;
  const matches = [...rssText.matchAll(itemRegex)];

  for (const match of matches) {
    const item = match[1];

    const title = extractValue(item, 'title');
    const author = extractValue(item, 'author_name');
    const link = extractValue(item, 'link');
    const pubDate = extractValue(item, 'pubDate');
    const description = extractValue(item, 'description');
    const coverImage = extractImageFromDescription(description);
    const ratingRaw = extractValue(item, 'user_rating');
    const dateRead = extractValue(item, 'user_read_at');

    const rating = ratingRaw ? parseFloat(ratingRaw) : null;

    if (title && author) {
      books.push({ title, author, link, pubDate, coverImage, rating, dateRead });
    }
  }

  return books;
}

function extractValue(content, tag) {
  const regex = new RegExp(`<${tag}>(.*?)<\/${tag}>`, 'is');
  const match = content.match(regex);
  if (!match) return '';
  return decodeHTML(match[1]
    .replace(/^<!\[CDATA\[/, '')
    .replace(/\]\]>$/, '')
    .trim());
}
function extractImageFromDescription(description) {
  const match = description.match(/<img[^>]+src="([^"]+)"/i);
  if (!match) return '/images/placeholder-book.jpg';

  let url = match[1];

  // Replace known low-res size patterns like _SX50_, _SY75_ etc.
  url = url.replace(/_[A-Z]{2}\d+_/, '_SY475_');


  return url;
}



function decodeHTML(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}
