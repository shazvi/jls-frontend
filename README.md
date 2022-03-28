## Getting Started

### Dependencies

- Node.js

### Local setup

- Rename `.env_sample` to `.env` and update its values to correspond to your dev environment.
- Execute the following commands in a terminal:

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Testing

- Rename `cypress.env.sample.json` to `cypress.env.json` and update its values to correspond to your dev environment.
- Start the dev server if it isn't already running, and then open cypress:

```bash
npm start
npx cypress open
```

- In cypress's interactive tool, run the tests

### Notes

- There is a downside in the current list implementation because the entire list gets loaded at the start. This might affect frontend performance and load times as the list continues to grow.
- A better approach would be to implement pagination and search on the backend so that we can implement infinite scrolling on the frontend to load page by page as the user reaches the bottom of the list.
