# Murmes Subgraph

[Murmes](https://github.com/LaplaceMan/tscs-contracts) is a modular, customizable and multi-ecology compatible crowdsourcing protocol on the blockchain that will provide WEB3 users with a flexible, fun and multi-beneficial crowdsourcing marketplace.

This subgraph is used for:

- aggregates data and serves dashboard.
- act as the back-end in the early stages of the project and provide necessary data for the front-end.
- data on users.
- data on tasks.
- data on items.
- data on revenue.
- data on audit.
- data on whitelisted tokens.
- data on whitelisted modules.
- data on platforms and boxes.

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

- Mumbai: https://thegraph.com/hosted-service/subgraph/laplaceman/murmes-mumbai
