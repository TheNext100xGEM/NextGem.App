import logo1inch from "@assets/img/home/projects/1inch.svg"
import logoAitProtocol from "@assets/img/home/projects/ait-protocol.svg"
import logoGraphlinq from "@assets/img/home/projects/graphlinq.svg"
import logoInfrax from "@assets/img/home/projects/infrax.svg"
import logoLido from "@assets/img/home/projects/lido.svg"
import logoMaker from "@assets/img/home/projects/makerdao.png"
import logoMantra from "@assets/img/home/projects/mantra.png"
import logoBeam from "@assets/img/home/projects/merit-circle.svg"
import logoMetazero from "@assets/img/home/projects/metazero.svg"
import logoNodesAi from "@assets/img/home/projects/nodesai.svg"
import logoOndo from "@assets/img/home/projects/ondo.svg"
import logoOpSec from "@assets/img/home/projects/opsec.webp"
import logoPandora from "@assets/img/home/projects/pandora.svg"
import logoPepe from "@assets/img/home/projects/pepe.png"
import logoSolana from "@assets/img/home/projects/solana.svg"
import logoSpectre from "@assets/img/home/projects/spectre.svg"
import logoStacks from "@assets/img/home/projects/stacks.svg"
import logoSwarm from "@assets/img/home/projects/swarm.svg"

export interface LogoProps {
  name: string
  logo: string
  url: string
}

export const LogoListTop: LogoProps[] = [
  {
    name: "MetaZero",
    logo: logoMetazero,
    //url: "https://metazero.gg/"
    url: "/gems/metazero-65d251d532ca917b1e6e1216"
  },
  {
    name: "OpSec",
    logo: logoOpSec,
    //url: "https://opsec.computer/"
    url: "/gems/opsec-65e8dfc0dba69fa19e8859a1"
  },
  {
    name: "AIT Protocol",
    logo: logoAitProtocol,
    //url: "https://aitprotocol.ai/"
    url: "/gems/ait-protocol-6575deea3c2ee986228ff5e4"
  },
  {
    name: "Swarm",
    logo: logoSwarm,
    //url: "https://swarm.com/"
    url: "/gems/swarm-markets-65f592a8a9fdaae8787b6057"
  },
  {
    name: "Maker DAO",
    logo: logoMaker,
    //url: "https://makerdao.com/"
    url: "/gems/maker-65e9503edba69fa19e8859b9"
  },
  {
    name: "Solana",
    logo: logoSolana,
    //url: "https://solana.com/"
    url: "/gems/solana-657b618b9aa7eb90f457716f"
  },
  {
    name: "GraphLinq",
    logo: logoGraphlinq,
    //url: "https://graphlinq.io/"
    url: "https://graphlinq.io/"
  },
  {
    name: "Spectre Bot AI",
    logo: logoSpectre,
    //url: "https://spectrebot.ai/"
    url: "/gems/spectre-ai-65d6c4e432ca917b1e6e12dd"
  },
  {
    name: "Beam Merit Circle",
    logo: logoBeam,
    //url: "https://meritcircle.io/"
    url: "/gems/beam-65cf92b532ca917b1e6e118b"
  },
  {
    name: "Ondo",
    logo: logoOndo,
    //url: "https://ondo.finance/"
    url: "/gems/ondo--657b589338b1b044392ed71f"
  }
]

export const LogoListBottom: LogoProps[] = [
  {
    name: "Lido Finance",
    logo: logoLido,
    //url: "https://lido.fi/"
    url: "/gems/lido-dao-token-657b618b9aa7eb90f457712c"
  },
  {
    name: "Mantra",
    logo: logoMantra,
    //url: "https://www.mantrachain.io/"
    url: "/gems/mantra-dao-65e5c3f632ca917b1e6e155c"
  },
  {
    name: "PEPE",
    logo: logoPepe,
    //url: "https://www.pepe.vip/"
    url: "https://www.pepe.vip/"
  },
  {
    name: "Nodes AI",
    logo: logoNodesAi,
    //url: "https://nodes.ai/"
    url: "/gems/nodeai-65cfd90432ca917b1e6e11a3"
  },
  {
    name: "Stacks",
    logo: logoStacks,
    //url: "https://www.stacks.co/"
    url: "/gems/stacks-657b618b9aa7eb90f4577187"
  },
  {
    name: "Pandora",
    logo: logoPandora,
    //url: "https://www.pandora.build/"
    url: "https://www.pandora.build/"
  },
  {
    name: "1Inch",
    logo: logo1inch,
    //url: "https://1inch.io/"
    url: "/gems/1inch-657b6612f2491a0aa79689a4"
  },
  {
    name: "InfraX",
    logo: logoInfrax,
    //url: "https://infrax.network/"
    url: "/gems/infrax-65f319d8a9fdaae8787b5ff1"
  },
]
