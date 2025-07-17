# Versão 3

## Requisitos funcionais e não funcionais

Requisitos funcionais:

1. Suporte a IPv4 e IPv6.
1. Suporte a TCP e UDP para transferência de arquivos.
1. Suporte a UDP, SCTP e SCTP sobre UDP para mídias em tempo real.
1. Suporte a HTTP nas versão 1.0, 1.1, 2.0 e 3.0.
1. Suporte a WebSocket sobre HTTP/1.1.
1. Balanceamento de carga em serviços Web e WebSocket.
1. Autenticação e autorização com OAuth 2.0 no Google e posterior sessão via *cookie* para permitir autorização entre URLs distintas.
1. Suporte obrigatório às seguintes APIs Web: Device orientation, Fullscreen, Gamepad, Geolocation, Service worker, Storage, Touch, WebGL, WebRTC, WebSocket.
1. Suporte desejável às APIs Web: Battery, Web Bluetooth, Console, Fetch,  Notification, Performance, Push, Vibration, WebTransport, WebXR.
1. Persistência dos dados de usuários em bancos de dados centralizado.
1. Uso de *Selective Forwarding Unit* (SFU) para mídias em tempo real entre os jogadores.

Requisitos não funcionais:

1. Suporte a pelo menos 1000 conexões WebSocket simultâneas.
1. Testes regulares de carga em servidores e de monitoramento dos serviços Web.
1. Possibilidade de migração futura de WebSocket sobre HTTP/1.1 para WebTransport sobre HTTP/3.
1. Possibilidade de migração futura de SRTP sobre HTTP/1.1 e HTTP/2.0 para Media over QUIC (MoQ) sobre HTTP/3.

## Escolhas tecnológicas

- [#1](https://github.com/feira-de-jogos/feira-de-jogos/issues/1) e [#3](https://github.com/feira-de-jogos/feira-de-jogos/issues/3): [Phaser 4 (rc4)](https://phaser.io/news/2025/05/phaser-mega-update)  com [TypeScript](https://www.typescriptlang.org/).
- [#2](https://github.com/feira-de-jogos/feira-de-jogos/issues/2): [Parcel](https://parceljs.org/).
- [#5](https://github.com/feira-de-jogos/feira-de-jogos/issues/5): [Docker Compose](https://docs.docker.com/compose/) com [réplicas](https://docs.docker.com/reference/compose-file/deploy/#replicas) e [monitoramento de contêiner](https://docs.docker.com/reference/compose-file/services/#healthcheck).
- [#8](https://github.com/feira-de-jogos/feira-de-jogos/issues/8): [Node.js](https://nodejs.org/).
- [#10](https://github.com/feira-de-jogos/feira-de-jogos/issues/10): cluster [Node.js](https://nodejs.org/) e [Redis Streams](https://redis.io/) via [Redis Streams](https://socket.io/docs/v4/redis-streams-adapter/).
- [#11](https://github.com/feira-de-jogos/feira-de-jogos/issues/11): Sinalização de mídia com [Livekit](https://livekit.io/) e lógica de jogo com [Socket.IO](https://socket.io/).
- [#12](https://github.com/feira-de-jogos/feira-de-jogos/issues/12): (*Selective Forwarding Unit*) SFU com [Livekit](https://livekit.io/).
- [#13](https://github.com/feira-de-jogos/feira-de-jogos/issues/13): *Single Sign-On* (SSO) via OAuth 2.0  no Google e posterior sessão com o uso de *cookies*.

## Integração entre serviços

De acordo com [#5](https://github.com/feira-de-jogos/feira-de-jogos/issues/5), [#6](https://github.com/feira-de-jogos/feira-de-jogos/issues/6) e [#7](https://github.com/feira-de-jogos/feira-de-jogos/issues/7), os serviços estão assim interligados:

```mermaid
flowchart LR
  A[Aplicação Web]

  subgraph Nuvem
    B[Proxy HTTP]

    subgraph Cluster Node.js + Socket.IO
      C1[1]
      C2[2]
      C3[...]
      C4[N]
    end

    E[Grafana]

    subgraph Bancos de Dados
    D[Redis Streams]
      F[InfluxDB]
    end
  end

  A --> B
  B --> C1
  B --> C2
  B --> C3
  C1 --> D
  C2 --> D
  C3 --> D
  C4 --> D

  B--> E
  C1 --> F
  C2 --> F
  C3 --> F
  C4 --> F
  E --> F
```

