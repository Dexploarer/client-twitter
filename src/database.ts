import { type Tweet } from "agent-twitter-client";

export interface IDatabase {
    logTweet(tweet: Tweet): Promise<void>;
}

export class ConsoleLoggerDatabase implements IDatabase {
    async logTweet(tweet: Tweet): Promise<void> {
        console.log("Logging tweet to database:", JSON.stringify(tweet, null, 2));
    }
}
