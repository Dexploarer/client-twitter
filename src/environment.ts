import {
    parseBooleanFromText,
    type IAgentRuntime,
    ActionTimelineType,
} from "@elizaos/core";

export const DEFAULT_MAX_TWEET_LENGTH = 280;

export interface TwitterConfig {
    TWITTER_DRY_RUN: boolean;
    TWITTER_USERNAME: string;
    TWITTER_PASSWORD?: string;
    TWITTER_EMAIL?: string;
    MAX_TWEET_LENGTH: number;
    TWITTER_SEARCH_ENABLE: boolean;
    TWITTER_2FA_SECRET?: string;
    TWITTER_RETRY_LIMIT: number;
    TWITTER_POLL_INTERVAL: number;
    TWITTER_TARGET_USERS: string[];
    ENABLE_TWITTER_POST_GENERATION: boolean;
    POST_INTERVAL_MIN: number;
    POST_INTERVAL_MAX: number;
    ENABLE_ACTION_PROCESSING: boolean;
    ACTION_INTERVAL: number;
    POST_IMMEDIATELY: boolean;
    TWITTER_SPACES_ENABLE: boolean;
    MAX_ACTIONS_PROCESSING: number;
    ACTION_TIMELINE_TYPE: ActionTimelineType;
}

function safeParseInt(
    value: string | undefined | null,
    defaultValue: number
): number {
    if (!value) return defaultValue;
    const parsed = Number.parseInt(value, 10);
    return isNaN(parsed) ? defaultValue : Math.max(1, parsed);
}

export async function validateTwitterConfig(
    runtime: IAgentRuntime
): Promise<TwitterConfig> {
    const twitterConfig: TwitterConfig = {
        TWITTER_DRY_RUN:
            parseBooleanFromText(
                runtime.getSetting("TWITTER_DRY_RUN") ||
                    process.env.TWITTER_DRY_RUN
            ) ?? false,

        TWITTER_USERNAME:
            runtime.getSetting("TWITTER_USERNAME") ||
            process.env.TWITTER_USERNAME,

        TWITTER_PASSWORD:
            runtime.getSetting("TWITTER_PASSWORD") ||
            process.env.TWITTER_PASSWORD,

        TWITTER_EMAIL:
            runtime.getSetting("TWITTER_EMAIL") ||
            process.env.TWITTER_EMAIL,

        MAX_TWEET_LENGTH: safeParseInt(
            runtime.getSetting("MAX_TWEET_LENGTH") ||
                process.env.MAX_TWEET_LENGTH,
            DEFAULT_MAX_TWEET_LENGTH
        ),

        TWITTER_SEARCH_ENABLE:
            parseBooleanFromText(
                runtime.getSetting("TWITTER_SEARCH_ENABLE") ||
                    process.env.TWITTER_SEARCH_ENABLE
            ) ?? false,

        TWITTER_2FA_SECRET:
            runtime.getSetting("TWITTER_2FA_SECRET") ||
            process.env.TWITTER_2FA_SECRET ||
            "",

        TWITTER_RETRY_LIMIT: safeParseInt(
            runtime.getSetting("TWITTER_RETRY_LIMIT") ||
                process.env.TWITTER_RETRY_LIMIT,
            5
        ),

        TWITTER_POLL_INTERVAL: safeParseInt(
            runtime.getSetting("TWITTER_POLL_INTERVAL") ||
                process.env.TWITTER_POLL_INTERVAL,
            120
        ),

        TWITTER_TARGET_USERS: (
            runtime.getSetting("TWITTER_TARGET_USERS") ||
            process.env.TWITTER_TARGET_USERS ||
            ""
        )
            .split(",")
            .map((u: string) => u.trim())
            .filter(Boolean),

        ENABLE_TWITTER_POST_GENERATION:
            parseBooleanFromText(
                runtime.getSetting("ENABLE_TWITTER_POST_GENERATION") ||
                    process.env.ENABLE_TWITTER_POST_GENERATION
            ) ?? true,

        POST_INTERVAL_MIN: safeParseInt(
            runtime.getSetting("POST_INTERVAL_MIN") ||
                process.env.POST_INTERVAL_MIN,
            90
        ),

        POST_INTERVAL_MAX: safeParseInt(
            runtime.getSetting("POST_INTERVAL_MAX") ||
                process.env.POST_INTERVAL_MAX,
            180
        ),

        ENABLE_ACTION_PROCESSING:
            parseBooleanFromText(
                runtime.getSetting("ENABLE_ACTION_PROCESSING") ||
                    process.env.ENABLE_ACTION_PROCESSING
            ) ?? false,

        ACTION_INTERVAL: safeParseInt(
            runtime.getSetting("ACTION_INTERVAL") ||
                process.env.ACTION_INTERVAL,
            5
        ),

        POST_IMMEDIATELY:
            parseBooleanFromText(
                runtime.getSetting("POST_IMMEDIATELY") ||
                    process.env.POST_IMMEDIATELY
            ) ?? false,

        TWITTER_SPACES_ENABLE:
            parseBooleanFromText(
                runtime.getSetting("TWITTER_SPACES_ENABLE") ||
                    process.env.TWITTER_SPACES_ENABLE
            ) ?? false,

        MAX_ACTIONS_PROCESSING: safeParseInt(
            runtime.getSetting("MAX_ACTIONS_PROCESSING") ||
                process.env.MAX_ACTIONS_PROCESSING,
            1
        ),

        ACTION_TIMELINE_TYPE:
            (runtime.getSetting("ACTION_TIMELINE_TYPE") as ActionTimelineType) ||
            ActionTimelineType.ForYou,
    };

    return twitterConfig;
}
