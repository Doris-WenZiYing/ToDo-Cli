import * as fs from 'fs';
import * as path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const dataFile = path.join(__dirname, '..', 'data', 'todos.json');

function loadTodos(): Todo[] {
  if (!fs.existsSync(dataFile)) return [];
  const content = fs.readFileSync(dataFile, 'utf-8');
  return JSON.parse(content) as Todo[];
}

function saveTodos(todos: Todo[]) {
  fs.mkdirSync(path.dirname(dataFile), { recursive: true });
  fs.writeFileSync(dataFile, JSON.stringify(todos, null, 2));
}

yargs(hideBin(process.argv))
  .command('add <text>', 'Add a new todo', (yargs) => {
    yargs.positional('text', { type: 'string', describe: 'Todo text' });
  }, (args) => {
    const todos = loadTodos();
    const newTodo: Todo = {
      id: todos.length + 1,
      text: args.text as string,
      done: false
    };
    todos.push(newTodo);
    saveTodos(todos);
    console.log(`Added: "${newTodo.text}"`);
  })
  .command('list', 'List all todos', () => {}, () => {
    const todos = loadTodos();
    todos.forEach(t => {
      console.log(`[${t.done ? 'x' : ' '}] (${t.id}) ${t.text}`);
    });
  })
  .command('mark <id>', 'Mark todo as done', (yargs) => {
    yargs.positional('id', { type: 'number', describe: 'Todo ID' });
  }, (args) => {
    const todos = loadTodos();
    const id = args.id as number;
    const todo = todos.find(t => t.id === id);
    if (todo) {
      todo.done = true;
      saveTodos(todos);
      console.log(`Marked #${id} as done.`);
    } else {
      console.log(`Todo #${id} not found.`);
    }
  })
  .demandCommand()
  .help()
  .parse();
