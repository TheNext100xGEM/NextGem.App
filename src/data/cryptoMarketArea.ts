const CryptoMarketAreas = [
  {
      "id": 1,
      "name": "Layer 1 (L1)",
      "description": "These are the foundational blockchains that form the base level of a network. They are responsible for the primary functions like recording transactions on the public ledger, ensuring network security, and offering native assets (like BTC, ETH, ADA) used for transaction fees and rewarding miners/validators. Layer 1 blockchains face a balance challenge among decentralization, security, and scalability, often referred to as the blockchain trilemma. Examples include Bitcoin, Ethereum, Avalanche, and Cardano."
  },
  {
      "id": 2,
      "name": "Smart Contract Platform",
      "description": "This category comprises blockchain platforms that support the development and execution of smart contracts. Smart contracts are self-executing contracts with the terms of the agreement between buyer and seller being directly written into lines of code. These platforms provide a decentralized environment where these contracts can operate without the need for intermediaries. Ethereum is a notable example of a smart contract platform."
  },
  {
      "id": 3,
      "name": "Alleged SEC Securities",
      "description": "This category refers to crypto assets that are under scrutiny or have been classified by the U.S. Securities and Exchange Commission (SEC) as securities. This classification implies regulatory requirements and oversight, as these tokens might be subject to federal securities laws."
  },
  {
      "id": 4,
      "name": "Stablecoins",
      "description": "Stablecoins are cryptocurrencies designed to minimize the volatility typically associated with cryptocurrencies. They achieve this by pegging their value to a reserve asset, like the U.S. dollar, gold, or other cryptocurrencies. This stability makes them useful for everyday transactions and as a safe haven in the highly volatile crypto market."
  },
  {
      "id": 5,
      "name": "Decentralized Finance (DeFi)",
      "description": "DeFi is an umbrella term for various applications in cryptocurrency or blockchain geared toward disrupting financial intermediaries. DeFi platforms allow people to lend or borrow funds from others, speculate on price movements on a range of assets using derivatives, trade cryptocurrencies, insure against risks, and earn interest in savings-like accounts."
  },
  {
      "id": 6,
      "name": "Exchange-based Tokens",
      "description": "These are tokens issued by cryptocurrency exchanges, which can be used within the exchange ecosystem for various purposes like trading fee discounts, staking rewards, and participation in exclusive token sales. Binance's BNB and Huobi's HT are examples of exchange-based tokens."
  },
  {
      "id": 7,
      "name": "Centralized Exchange (CEX)",
      "description": "Centralized exchanges are platforms where users can trade cryptocurrencies. These platforms are operated by a centralized organization that facilitates the trading. They act as intermediaries and custodians of users' funds, offering services like fiat-to-crypto exchange, crypto-to-crypto trading, and sometimes, wallet services."
  },
  {
      "id": 8,
      "name": "Liquid Staking Tokens",
      "description": "Liquid staking involves participating in the staking process of a Proof of Stake (PoS) blockchain but with a twist. When you stake your tokens, you receive a liquid representative token in return. This representative token can be traded or used in other DeFi applications, providing liquidity and earning potential while still earning staking rewards."
  },
  {
      "id": 9,
      "name": "NFT (Non-Fungible Tokens)",
      "description": "NFTs are unique digital assets verified using blockchain technology. Unlike cryptocurrencies, which are identical and can be exchanged like-for-like, each NFT has a digital signature that makes it one-of-a-kind. NFTs are commonly used to represent items such as photos, videos, audio, and other types of digital files."
  },
  {
      "id": 10,
      "name": "Governance",
      "description": "In the context of blockchain and cryptocurrencies, governance refers to the mechanisms through which decisions are made within the ecosystem. This can include decisions about technical upgrades, protocol changes, and resource allocation. Governance tokens often give holders the right to vote on these decisions, influencing the direction and policies of the project."
  },
  {
      "id": 11,
      "name": "Meme Coins",
      "description": "Meme coins are cryptocurrencies inspired by internet memes, jokes, and satire. They often have no specific use case and rely on community participation, humor, and viral trends on social media for their popularity. Examples include Dogecoin and Shiba Inu. These coins are known for their potential for rapid market gains but are also considered highly speculative and risky investments due to their inherent volatility and lack of intrinsic value (NerdWallet​​, Techopedia​​)."
  },
  {
      "id": 12,
      "name": "Gaming (GameFi)",
      "description": "GameFi combines gaming with blockchain finance, allowing players to earn real-world financial rewards through gaming activities. These can include play-to-earn models, where players earn cryptocurrency or NFTs by playing games, which they can then trade or sell."
  },
  {
      "id": 13,
      "name": "Layer 2 (L2)",
      "description": "Layer 2 refers to secondary protocols built on top of an underlying blockchain (Layer 1) to enhance its scalability and efficiency. These solutions, such as zk-rollups and optimistic rollups, process transactions off the main chain and later communicate them back to the Layer 1 blockchain for finalization. This setup allows for faster transactions and reduced fees."
  },
  {
      "id": 14,
      "name": "Zero Knowledge (ZK) Technologies",
      "description": "Zero-knowledge proofs are a method of cryptography allowing one party to prove to another that they know a value, without revealing any information apart from the fact that they know that value. In blockchain, they are used for enhancing privacy and scalability, particularly in Layer 2 scaling solutions."
  },
  {
      "id": 15,
      "name": "Decentralized Exchange (DEX)",
      "description": "A decentralized exchange is a type of cryptocurrency exchange that operates without a central authority, enabling direct peer-to-peer transactions. DEXs are built on blockchain technology and provide a platform for the trading of cryptocurrencies in a decentralized manner."
  },
  {
      "id": 16,
      "name": "Metaverse",
      "description": "The Metaverse refers to a collective virtual shared space, often created by the convergence of virtually enhanced physical reality, augmented reality (AR), and the internet. In the context of cryptocurrency, it relates to digital economies and virtual worlds where cryptocurrencies and NFTs are used for transactions and interactions."
  },
  {
      "id": 17,
      "name": "Yield Farming",
      "description": "Yield farming involves earning rewards, often in the form of cryptocurrency, by lending or staking digital assets. It is a popular strategy in the DeFi space, where users provide liquidity to a pool and earn interest or transaction fees in return."
  },
  {
      "id": 18,
      "name": "Play To Earn",
      "description": "Play-to-earn is a business model in gaming where players can earn real-world rewards, often in the form of cryptocurrencies or NFTs, for playing and progressing in a game. It is a prominent feature in the GameFi sector."
  },
  {
      "id": 19,
      "name": "Storage Solutions",
      "description": "In the context of cryptocurrency, storage solutions refer to methods and technologies used to store digital assets securely. This includes hardware wallets, software wallets, and cloud-based storage options, each offering different levels of security and accessibility."
  },
  {
      "id": 20,
      "name": "Oracle Systems",
      "description": "Oracles in blockchain act as a bridge between the blockchain and the external world, enabling smart contracts to access and react to real-world data and events. They are crucial in applications like Decentralized Finance (DeFi), where knowledge of real-world events and data is necessary. Oracles can be software-based, gathering digital information, or hardware-based, capturing physical world data. Chainlink is a notable example of a decentralized oracle network providing this service​​​​​​."
  },
  {
      "id": 21,
      "name": "Automated Market Maker (AMM)",
      "description": "AMMs are decentralized exchanges that use algorithms to price assets instead of an order book used by traditional exchanges. They allow digital assets to be traded automatically by using liquidity pools where users provide funds. In return, liquidity providers earn fees based on the amount of liquidity they provide."
  },
  {
      "id": 22,
      "name": "Artificial Intelligence (AI)",
      "description": "In the context of cryptocurrency, AI can be utilized for various purposes, including trading, predicting market trends, managing portfolios, and enhancing blockchain security. AI algorithms can analyze large datasets, identify patterns, and make decisions or predictions, thereby optimizing different aspects of cryptocurrency and blockchain operations."
  },
  {
      "id": 23,
      "name": "Wrapped Tokens",
      "description": "Wrapped tokens are a type of cryptocurrency that represents a token from another blockchain. They allow for the integration of different blockchain networks by wrapping an existing token into a new token on a different blockchain. This process helps in enhancing interoperability between various blockchain ecosystems."
  },
  {
      "id": 24,
      "name": "Data Availability Solutions",
      "description": "These solutions focus on making data readily available in decentralized networks. They address challenges related to the storage, retrieval, and dissemination of data in blockchain networks, ensuring that data is accessible and reliable for users and applications."
  },
  {
      "id": 25,
      "name": "Privacy Coins",
      "description": "Privacy coins are cryptocurrencies that provide enhanced anonymity and privacy for users. They use various cryptographic techniques to conceal transaction details, such as the identity of the parties involved and the transaction amount, thereby offering a higher degree of privacy compared to traditional cryptocurrencies."
  },
  {
      "id": 26,
      "name": "Lending/Borrowing Platforms",
      "description": "These platforms operate within the DeFi space, allowing users to lend or borrow cryptocurrencies. Lenders earn interest, while borrowers can get loans without going through traditional financial intermediaries, often providing crypto assets as collateral."
  },
  {
      "id": 27,
      "name": "Internet of Things (IoT)",
      "description": "In the cryptocurrency context, IoT refers to the integration of blockchain technology with IoT devices. This integration enhances data security, enables decentralized and autonomous interactions between devices, and facilitates micropayments or other transactions between machines."
  },
  {
      "id": 28,
      "name": "Finance/Banking Solutions",
      "description": "This category involves the application of blockchain technology and cryptocurrencies in the financial and banking sectors. Solutions include cross-border payments, tokenization of assets, decentralized financial services, and improving the efficiency and transparency of financial transactions."
  },
  {
      "id": 29,
      "name": "Derivatives",
      "description": "In the cryptocurrency world, derivatives are financial contracts whose value is derived from an underlying asset, which can be cryptocurrencies. These include instruments like futures, options, and swaps, allowing investors to hedge risks or speculate on price movements of crypto assets."
  },
  {
      "id": 30,
      "name": "SocialFi ",
      "description": "SocialFi, short for Social Finance, is a blend of social media networks and decentralized finance (DeFi). It leverages blockchain technology to create decentralized social networks where users have control over their content and can monetize their social interactions. SocialFi platforms often use decentralized autonomous organizations (DAOs) for governance and social tokens for monetization. They allow content creators to earn from their engagement, following, and content creation. SocialFi challenges the centralized nature of traditional social media by emphasizing user data ownership and fair revenue distribution​​​​​​."
  },
  {
      "id": 31,
      "name": "Asset-backed Tokens",
      "description": "Asset-backed tokens are digital tokens on a blockchain that represent a tangible or intangible object of value. They are backed by real-world assets like gold, real estate, or other commodities, providing a bridge between the physical and digital worlds. These tokens enable easier, fractionalized, and more liquid ownership of assets that might otherwise be difficult to divide or trade."
  },
  {
      "id": 32,
      "name": "Sports-related Tokens",
      "description": "Sports-related tokens are cryptocurrencies associated with sports teams, leagues, or related entities. They often offer fans unique benefits like voting on club decisions, access to exclusive merchandise, or experiences. These tokens deepen fan engagement and open new revenue streams for sports organizations."
  },
  {
      "id": 33,
      "name": "Real World Assets (RWA)",
      "description": "RWAs in the crypto context refer to physical assets like property, art, or commodities that are tokenized on a blockchain. This tokenization process converts the value of these real-world assets into digital tokens, making them easily transferable and divisible on blockchain networks."
  },
  {
      "id": 34,
      "name": "Perpetuals",
      "description": "Perpetuals, or perpetual contracts, are types of derivatives in cryptocurrency markets. They are similar to futures contracts but with no expiration or settlement date, allowing traders to hold positions indefinitely. Perpetuals are popular for speculating on the future prices of cryptocurrencies."
  },
  {
      "id": 35,
      "name": "Analytics Tools",
      "description": "In the cryptocurrency world, analytics tools are software solutions used to analyze blockchain data. These tools provide insights into various aspects like transaction history, wallet addresses, token analytics, and overall network health, helping users make informed decisions based on comprehensive data analysis."
  },
  {
      "id": 36,
      "name": "NFT Marketplaces",
      "description": "NFT marketplaces are platforms where non-fungible tokens (NFTs) are bought, sold, and traded. These digital marketplaces enable artists, creators, and collectors to deal in unique digital assets like art, music, in-game items, and more, often leveraging blockchain technology for proof of ownership and authenticity."
  },
  {
      "id": 37,
      "name": "Wallet Technologies",
      "description": "Wallet technologies in cryptocurrency refer to digital tools that allow users to store, manage, and trade their digital assets. These wallets can be software-based (like mobile or desktop apps) or hardware-based (physical devices), providing security features to protect users' private keys and assets."
  },
  {
      "id": 38,
      "name": "Yield Aggregators",
      "description": "Yield aggregators are DeFi applications that automate the process of maximizing returns from various yield farming opportunities. They pool users' funds and allocate them to different DeFi protocols, optimizing earnings from interest rates, liquidity mining, and other yield-generating activities."
  },
  {
      "id": 39,
      "name": "Gambling and Betting Platforms",
      "description": "These platforms use cryptocurrencies for online gambling and betting activities. They leverage blockchain's transparency and fairness, offering decentralized, secure, and often anonymous platforms for various forms of online betting and gambling games."
  },
  {
      "id": 40,
      "name": "Prediction Markets",
      "description": "Prediction markets in the cryptocurrency space are platforms where users can speculate on the outcomes of future events. Market prices in these platforms indicate the perceived probability of various events occurring. Users trade on predictions, and the price of a prediction is based on what people are willing to pay for that bet. These markets can be based on real-world events like political elections or economic growth and often utilize stablecoins for transactions. They operate in a decentralized manner, ensuring transparency and global accessibility. Polymarket and Polkamarkets are examples of popular crypto prediction markets​​​​​​."
  },
  {
      "id": 41,
      "name": "Identity Solutions",
      "description": "This category involves blockchain-based solutions that focus on identity verification and management. These solutions provide secure, immutable, and decentralized ways of managing digital identities, allowing users to have greater control and privacy over their personal information."
  },
  {
      "id": 42,
      "name": "Move To Earn",
      "description": "This concept combines physical activity with cryptocurrency rewards. Users earn crypto rewards for engaging in physical activities like walking, running, or other forms of exercise. The idea is to incentivize fitness and wellness through blockchain rewards."
  },
  {
      "id": 43,
      "name": "Options Trading",
      "description": "In the context of cryptocurrency, options trading refers to financial derivatives that give the buyer the right, but not the obligation, to buy or sell a cryptocurrency at a predetermined price within a specific time frame. This allows traders to speculate on price movements or hedge their portfolios against potential losses."
  },
  {
      "id": 44,
      "name": "Decentralized Science (DeSci)",
      "description": "DeSci involves the application of decentralized technologies like blockchain to the field of scientific research and collaboration. It aims to make scientific data more accessible, transparent, and immutable, fostering open collaboration and innovation in the scientific community."
  },
  {
      "id": 45,
      "name": "Insurance Solutions",
      "description": "Blockchain technology is used to create decentralized insurance platforms. These solutions offer more transparent, efficient, and user-centric insurance services compared to traditional insurance models, often leveraging smart contracts for automation and reduced overhead."
  },
  {
      "id": 46,
      "name": "Metagovernance",
      "description": "Metagovernance refers to the governance of governance systems within the blockchain and DeFi space. It involves mechanisms and strategies for managing and evolving governance models in decentralized systems, often using tokens for voting and decision-making processes."
  },
  {
      "id": 47,
      "name": "Music-related Tokens",
      "description": "These tokens are associated with the music industry and are used to represent ownership or rights in music-related assets. They can be used for various purposes, including copyright management, artist funding, fan engagement, and more, providing a new model for value exchange in the music industry."
  },
  {
      "id": 48,
      "name": "Rebase Tokens",
      "description": "Rebase tokens are a type of cryptocurrency whose supply automatically adjusts (increases or decreases) based on the token's price fluctuations. This mechanism is designed to stabilize the token's price relative to a target price or other assets."
  },
  {
      "id": 49,
      "name": "Fan Tokens",
      "description": "Fan tokens are digital assets that represent a stake in a fan club or sports team. They provide fans with voting rights in club decisions, exclusive access to content, merchandise, events, and other fan-related activities, enhancing fan engagement and experience."
  }
]

export default CryptoMarketAreas
