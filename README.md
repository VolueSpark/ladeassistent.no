# Ladeassistent

Ladeassistent is a example project mainly focused on showcasing various ways to render data from the Spark API.
It can be run locally by following the instructions below, or you can visit it [here](https://www.ladeassistent.no).

## Getting Started

### Create a .env.local file

Before running the project you have to create and populate a .env.local with variables found in the [.env.template](./.env.template) file. The `PLATFORM_CLIENT_ID` and `PLATFORM_CLIENT_SECRET` needs to contain your API credentials.

### Run the project using yarn

```bash
#   Install dependencies
yarn
#   Start server
yarn dev
```

#### Alternatively

Run the project using npm by first deleting the yarn.lock file, then run the following commands

```bash
#   Install dependencies
npm install
#   Start the server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to reach the local dev server.
