interface Comment {
  message: string
  reactionCount: number
  author: string
  date: number
}

export interface SentimentScoringsComments {
  [date: string]: {
    scoreJustification: string
    topComments: Comment[]
  }
}

export interface Score {
  date: string
  bullVsBear: number
  emotionalCharge: number
  interactionQuality: number
}

export interface SentimentScorings {
  id: string
  scores: Score[]
  textFile: string
  updatedAt: string
  createdAt: string
}

interface ApiScores {
  [date: string]: {
    bullVsBear: number
    emotionalCharge: number
    interactionQuality: number
  }
}

export interface ApiSentimentScorings {
  _id: string
  scores: ApiScores
  textFile: string
  updatedAt: string
  createdAt: string
}
