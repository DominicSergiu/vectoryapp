# Contributing

This project currently has core vectorization functionality locked so we can focus on UI.

## Locked paths (require special review)

- `src/ImageVectorizer.js`
- Any future files under `src/**/vectorizer*` or `src/**/vectorization*`
- `package.json` dependencies that affect vectorization (`imagetracerjs`)

Only CODEOWNERS may approve changes to these paths during the UI lock period.

## Development setup

- Node 20
- Install with `npm ci`
- Dev server: `npm start`

## UI vs Functionality modes

- Default: full functionality
- Optional UI-only mode (future): toggle with `REACT_APP_UI_MODE=1` to mock vectorization for faster UI iteration

## Tests & CI

- Unit tests: `npm test`
- Smoke test: `npm run test:smoke`
- CI runs on every PR to `main`

## PR rules

- Do not touch locked paths for UI-only work. If a change is required, create a PR labeled `core-change` with justification.
- Add `data-testid` to interactive UI controls to keep future e2e tests stable.

## Release process

- Tag current stable core as `v1-core-locked`
- UI-only PRs do not bump version
- Core changes must update CHANGELOG and bump minor version
