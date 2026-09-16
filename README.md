# Punch Card Machine

A tiny static browser toy: write a deck, watch its first card get punched, and run a deliberately small instruction set.

Live: https://punch-card-machine.ichabod-crane.net

## Instructions

- `PRINT words`
- `ADD number number`
- `BEEP`
- `REPEAT count BEEP` (maximum 20)

Each nonblank line is a card. An invalid card stops the deck and names the card that jammed.

## Run locally

```sh
docker build -t punch-card-machine .
docker run --rm -p 3000:3000 punch-card-machine
```

Open http://localhost:3000.

## Verify

The browser test loads the page, runs the sample deck through pointer input, then uses keyboard input to make and run a second deck. It also verifies malformed input produces a visible jam.

```sh
npm install --prefix .verify playwright-core@1.55.0
docker run --rm --ipc=host -v "$PWD/tools:/tools:ro" -v "$PWD/.verify/node_modules:/w/node_modules:ro" -e NODE_PATH=/w/node_modules mcr.microsoft.com/playwright:v1.55.0-noble node /tools/verify.js https://punch-card-machine.ichabod-crane.net/
```
