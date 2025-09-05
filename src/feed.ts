
import { XMLParser } from 'fast-xml-parser';

export type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

export type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export async function fetchFeed(feedURL: string): Promise<RSSFeed> {
  const response = await fetch(feedURL, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'User-Agent': 'gator',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch feed: ${response.statusText}`);
  }

  const xml = await response.text();
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
  });
  const jsonObj = parser.parse(xml);
  const root = (jsonObj as any).rss?.channel ?? (jsonObj as any).channel;
  if (!root) throw new Error("Missing or invalid channel field");

  const { title, link, description, item } = root;
  if (!title || typeof title !== 'string') {
    throw new Error('Missing or invalid channel title');
  }
  if (!link || typeof link !== 'string') {
    throw new Error('Missing or invalid channel link');
  }
  if (!description || typeof description !== 'string') {
    throw new Error('Missing or invalid channel description');
  }

const rawItems = Array.isArray(root.item) ? root.item : [];
  const items = rawItems
    .filter((entry: any) =>
        entry &&
        typeof entry.title === 'string' &&
        entry.title.trim().length > 0 &&
        typeof entry.link === 'string' &&
        entry.link.trim().length > 0 &&
        typeof entry.description === 'string' &&
        entry.description.trim().length > 0 &&
        typeof entry.pubDate === 'string' &&
        entry.pubDate.trim().length > 0
      )
      .map((entry: any) => ({
        title: entry.title,
        link: entry.link,
        description: entry.description,
        pubDate: entry.pubDate
      }));

  return {
    channel: {
      title,
      link,
      description,
      item: items
    }
  }
};