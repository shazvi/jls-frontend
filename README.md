## Getting Started

### Notes

- Implemented a client side search function. Showing the entire list of products by itself simply wasn't intuitive to use since the user would have to scroll through a list of thousands of items to find a specific one.
- There is still a downside in the current list implementation because the entire product list gets loaded at the start. This might affect frontend performance and load times as the list continues to grow.
- A better approach would be to implement pagination and search on the backend so that we can implement infinite scrolling on the frontend to load page by page as the user reaches the bottom of the list. However, this requires more time to implement than the existing feature and is arguably out of scope.

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

-
