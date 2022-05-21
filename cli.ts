import * as inquirer from 'inquirer';
import type { CheckboxQuestion } from 'inquirer';
import { spawn } from 'child_process';
import { textSync } from 'figlet';
import knex, { Knex } from 'knex';
import * as fuzzy from 'fuzzy';

inquirer.registerPrompt('checkbox-plus', require('inquirer-checkbox-plus-prompt'));

// TODO use .env file
const DB_NAME = 'my_db';

console.log(textSync('Falak', { horizontalLayout: 'full' }));

// const spinner = ora(`Getting tables info from ${DB_NAME}`);

console.log(`Getting tables info from ${DB_NAME}`);

// spinner.start();

const mysqlQueryBuilder: Knex = knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'secret',
    database: DB_NAME,
  },
});

mysqlQueryBuilder
  .raw(
    `SELECT table_name as name FROM information_schema.tables WHERE table_schema = '${DB_NAME}';`
  )
  .then(([result]) => {
    const names = result?.map(({ name }) => name);
    // spinner.succeed();
    const q01: Omit<CheckboxQuestion, 'type'> & {
      type: 'checkbox-plus';
      highlight: boolean;
      searchable: true;
      source: (answersSoFar: string[], input: string) => Promise<any>;
    } = {
      type: 'checkbox-plus',
      message: 'Select table(s) to monitor',
      pageSize: 10,
      highlight: true,
      searchable: true,
      name: 'generate',
      source: async (_: string[], input = '') =>
        fuzzy.filter(input, names).map(({ original }) => original),
    };

    inquirer.prompt([q01]).then(({ generate }: inquirer.Answers) => {
      const child = spawn(`yarn`, ['falak-server'], {
        shell: true,
        env: { DB_TABLES: generate, DB_NAME },
      });
      child.stdout.on('data', (data) => {
        console.log(data.toString());
      });
      child.stdout.on('error', (data) => {
        console.log(data.toString());
      });
    });
  });
