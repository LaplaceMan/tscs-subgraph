# Murmes Subgraph

[Murmes](https://github.com/LaplaceMan/tscs-contracts) is a blockchain-based tokenized subtitling crowdsourcing system. It is dedicated to solving the problem of "language silos" in the current video media platform. Through a complete set of trading mechanisms and economic models, video creators, subtitle makers, viewers, and investors are connected in an open, transparent, and multi-profit ecosystem.

This subgraph is used for:

- aggregates data and serves dashboard.
- act as the back-end in the early stages of the project and provide necessary data for the front-end.
- data on users.
- data on tasks (applications).
- data on rewards.
- data on subtitles.
- data on platforms and videos.

# Running locally

## Install Dependencies

`git clone https://github.com/LaplaceMan/tscs-subgraph.git`

`npm install`

## Generate necessary data according to Yaml and ABI

`yarn codegen`

## Create subgraph

`yarn create-local`

## Deploy subgraph

`yarn deploy-local`

## Deploy subgraph on Hosted Service

`yarn deploy`

> Modify the blockchain network and contract address in the Yaml file as needed. Please refer to the [official document](https://thegraph.com/docs/en/deploying/hosted-service/) for the Hosted Service provided by The Graph.

## Deployed

- Goerli: https://thegraph.com/explorer/subgraph/laplaceman/murmes-goerli
