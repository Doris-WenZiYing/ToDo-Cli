# ts-todo-cli

A simple TypeScript-based command-line application to manage todo items.

## Prerequisites

- Node.js ≥ 14
- npm or yarn

## Setup

```bash
git clone <this-repo>
cd ts-todo-cli
npm install
npm run build
```

## Usage

```bash
# Add a todo
node dist/index.js add "Buy groceries"

# List all todos
node dist/index.js list

# Mark todo #1 as done
node dist/index.js mark 1
```

You can also run directly via npx:

```bash
npx ts-node src/index.ts add "Learn TypeScript"
```
