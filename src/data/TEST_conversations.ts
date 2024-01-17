import { PropsConversation } from '@models/Ai'

export const conversations: PropsConversation[] = [

  {
    title: "What is Solana about?",
    last: "2024-01-12T13:20:00Z",
    messages: [
      { author: 'user', message: "What is Solana? resume me what you think about it and also please also give me its score.", date: "2024-01-12T13:00:00Z" },
      { author: 'ai', message: "Solana is a highly scalable, decentralized, and programmable blockchain platform known for its fast and secure transactions. It utilizes a unique consensus mechanism called Proof of History (PoH) that allows it to process up to 50,000 transactions per second. This high throughput makes it one of the fastest blockchains in existence. Solana's ecosystem is rich with decentralized applications (dApps), which include decentralized exchanges, lending platforms, and NFT marketplaces, contributing to a vibrant environment for decentralized finance (DeFi).\n\r The scoring for Solana varies slightly between two evaluations. In the Gemini Raw document, Solana is given a score of 8/10, highlighting its pros such as high scalability, low fees, decentralization, and a vibrant ecosystem, while also noting cons like being new technology with potential risks, limited smart contract support, and high energy consumption. \n\rIn the GPT Raw evaluation, Solana receives a slightly higher score of 8.5/10. This assessment emphasizes Solana's innovative features, such as its Proof of History mechanism, governance model with SOL as a governance token, and the use of the Rust programming language, which provides a technical advantage. It also acknowledges the platform's utility in DeFi and NFT markets. However, it points out the controversy over the PoH architecture and the limited developer ecosystem due to the use of Rust as potential drawbacks.\n\rOverall, Solana is recognized as a promising blockchain with significant potential to impact the crypto space positively, despite some concerns and risks associated with its new technology.", date: "2024-01-12T13:05:00Z" },
     ]
  },
]