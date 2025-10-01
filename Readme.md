# Team Pulse
Team Pulse is a collaborative project management tool designed to help teams track progress, manage tasks, and improve productivity.

## State Management with Redux and Redux Toolkit

Team Pulse uses **Redux** for predictable state management, ensuring a single source of truth for application data. To simplify Redux setup and reduce boilerplate, we leverage **Redux Toolkit**, which provides efficient utilities for creating slices, reducers, and async logic.

Key benefits:
- Centralized state management for consistent UI updates
- Simplified configuration using `configureStore` and `createSlice`
- Built-in support for async actions with `createAsyncThunk`
- Improved maintainability and scalability

For more details, refer to the [Redux Toolkit documentation](https://redux-toolkit.js.org/).

## Features

- Task creation and assignment
- Progress tracking
- Team collaboration tools
- Real-time notifications

## Live Demo

Check out the live application: [Team Pulse Live](https://team-pulse-ecru.vercel.app/)

## Folder Structure

```
Team_Pulse/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   └── App.tsx
├── package.json
└── README.md
```

## Getting Started

1. **Clone the repository:**
    ```bash
    git clone https://github.com/ShivamR01/Team_Pulse.git
    cd Team_Pulse
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Start the application:**
    ```bash
    npm run dev
    ```

## Technologies Used

- React
- Redux
- @redux/toolkit
- TailwindCSS

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements.

## License

This project is licensed under the MIT License.
