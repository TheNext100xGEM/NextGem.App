import { ApiGem, Gem, mapGem } from "./GemCard";

export interface Socials {
    telegram: string;
    twitter: string;
}

export interface ApiEmbedTypeData {
    _id: string
}


export interface EmbedTypeData {
    id: string
}

export const mapEmbedTypeData = (data: ApiEmbedTypeData): EmbedTypeData => {
    return {
        id: data._id,
    }
}

export interface ApiEmbed {
    type: string;
    id: string;
    data: ApiGem | ApiEmbedTypeData;
}


export interface Embed {
    type: string;
    id: string;
    data: Gem | EmbedTypeData;
}

export const mapEmbed = (data: ApiEmbed): Embed => {
    return {
        type: data.type,
        id: data.id,
        data: '_id' in data.data ? mapEmbedTypeData(data.data) : mapGem(data.data)
    }
}