# Overview

As a software developer, I am focused on mastering structural design patterns and state management within type-safe environments. This project allowed me to explore how to maintain complex data relationships—such as hierarchical mentorship trees and faction leadership succession—while ensuring strict memory safety and data integrity.

I developed **LoreForge**, a command-line world-building engine built in TypeScript. The software allows users to dynamically create, manage, and persist an ecosystem of factions and characters. It features a recursive mentorship system where characters can be assigned mentors, creating a "mentorship tree" that persists across sessions.

The purpose of writing this software was to bridge the gap between high-level architectural planning and low-level data persistence. I specifically wanted to practice "Data Rehydration"—the process of rebuilding complex object references from flat JSON files—to ensure that my application remains modular and scalable.

[Software Demo Video](http://youtube.link.goes.here)

# Development Environment

I utilized a modern development stack focused on developer experience and rigorous testing:

- **Visual Studio Code**: Used as the primary IDE for its excellent TypeScript support.
- **Node.js**: The runtime environment for executing the console application.
- **Git**: For version control and tracking architectural iterations.

**Programming Language & Libraries:**

- **TypeScript**: Used for its robust type-checking, interfaces, and class-based structure.
- **Node:readline**: Leveraged for handling asynchronous user input in the terminal.
- **Jest**: Integrated as the testing framework to verify business logic via unit tests.
- **Node:fs (Promises)**: Used for asynchronous file system operations to persist data in JSON format.

# Useful Websites

- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Invaluable for understanding interfaces and module resolution.
- [Node.js Readline API](https://nodejs.org/api/readline.html) - Critical for building the interactive CLI.
- [Jest Documentation](https://jestjs.io/docs/getting-started) - Helpful for setting up the test suite and matchers.
- [MDN Web Docs: Recursion](https://developer.mozilla.org/en-US/docs/Glossary/Recursion) - Provided insights for the mentorship tree traversal.

# Future Work

- **Duplicate Prevention**: Add validation logic to prevent creating multiple factions or characters with the exact same name.
- **Advanced Search**: Implement a search feature to find characters by role or faction without scrolling through the full list.
- **External Configuration**: Move the file paths and default settings to a `.env` or `config.json` file for better environment management.
