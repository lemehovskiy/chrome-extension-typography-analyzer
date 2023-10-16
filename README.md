# Chrome Extension Starter

This is a Chrome extension starter project built using the Create React App with TypeScript template. It provides a foundation for building Chrome extensions using modern web technologies and React.

## Features

- **Basic React Hooks:**
  - `useDomEvaluator`: A custom hook for injecting content scripts into web pages, allowing you to interact with and modify web page content.
  - `useStorageState`: A custom hook for managing and persisting extension data in the Chrome storage.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/lemehovskiy/chrome-extension-starter.git
   ```

2. Navigate to the project directory:

    ```bash
    cd chrome-extension-starter
    ```

2. Install dependencies:

    ```bash
    npm install
    ```
    
### Usage

1. Build extension:

    * For a one-time build:
    ```bash
    npm run build
    ```
    * For development with auto-reloading on changes:
    ```bash
    npm run watch
    ```

2. Open Google Chrome and go to `chrome://extensions/`.

3. Enable "Developer mode" in the top-right corner of the extensions page.

4. Click on the "Load unpacked" button.

5. Select the `build` directory inside your project directory. This will load your extension into Chrome.

6. You should now see your extension in the list of installed extensions. You can interact with your extension from there.

## Reloading the Extension

1. If you make changes to your extension and want to see those changes reflected in Chrome, follow these steps to reload the extension:

2. Go to chrome://extensions/.

3. Find your extension in the list of installed extensions.

4. Click the "Reload" button located under your extension. This will reload the extension with your latest changes.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/lemehovskiy/chrome-extension-starter/blob/main/LICENSE) file for details.

## Support

If you have any questions or issues, please feel free to open an issue on the GitHub repository.