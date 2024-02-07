import { ApiGem, Gem, mapGem } from "./GemCard";

export interface Socials {
    telegram: string;
    twitter: string;
}

export interface ApiEmbed {
    type: string;
    id: string;
    data: ApiGem;
}

export interface Embed {
    type: string;
    id: string;
    data: Gem;
}

export const mapEmbed = (data: ApiEmbed): Embed => {
    return {
        type: data.type,
        id: data.id,
        data: mapGem(data.data)
    }
}