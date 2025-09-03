export const elizaLogger = {
    log: () => {},
    warn: () => {},
    error: () => {},
    info: () => {},
    debug: () => {},
};

export const getEmbeddingZeroVector = () => [];
export const stringToUuid = (str: string) => str;
export const parseBooleanFromText = (text: string) => text === 'true';

export const ActionTimelineType = {
    Following: 'following',
    ForYou: 'foryou',
};

export type IAgentRuntime = any;
export type Client = any;
export type Plugin = any;
export type Content = any;
export type Memory = any;
export type State = any;
export type UUID = any;
