import Parser, { Output } from 'rss-parser';

import Posts from '@/repositories/Posts';
import { CronTask } from '@/interfaces/CronTask';
import { Post } from '@/database/PostsTable';

class RssParser implements CronTask {
  public readonly interval = '0 */3 * * *'; // Each day every 3 hours Kyiv time
  private readonly rssParser: Parser<{}, Post> = new Parser<{}, Post>();

  public constructor(private posts: Posts) {}

  public action = async () => {
    try {
      const feed = await this.rssParser.parseURL("https://lifehacker.com/rss")

      const existing = await this.posts.getExistingIds()

      const newPosts = feed.items.filter(item => !existing.includes(item.guid!))
      await this.posts.createPosts(newPosts);

    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(`parseRSS ERROR: ${e.message}`);
      }
    }
  };
}

export default RssParser;
