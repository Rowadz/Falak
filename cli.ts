import * as inquirer from 'inquirer';
import type { CheckboxQuestion } from 'inquirer';
import { spawn } from 'child_process';
import { textSync } from 'figlet';
import knex, { Knex } from 'knex';
import * as fuzzy from 'fuzzy';

inquirer.registerPrompt('checkbox-plus', require('inquirer-checkbox-plus-prompt'));

console.log(textSync('Falak', { horizontalLayout: 'full' }));

// const spinner = ora(`Getting tables info from ${DB_NAME}`);

// spinner.start();

const ask = async () => {
  const { database } = await inquirer.prompt({
    type: 'input',
    name: 'database',
    message: 'What is the MySQL DB name?',
  });

  const { user } = await inquirer.prompt({
    type: 'input',
    name: 'user',
    message: 'Enter usename',
  });

  const { password } = await inquirer.prompt({
    type: 'password',
    name: 'password',
    message: 'Enter password',
  });

  const { host } = await inquirer.prompt({
    type: 'input',
    name: 'host',
    default: '127.0.0.1',
    message: 'Enter host',
  });

  const { port } = await inquirer.prompt({
    type: 'number',
    name: 'port',
    default: 3306,
    message: 'Enter port',
  });

  const mysqlQueryBuilder: Knex = knex({
    client: 'mysql',
    connection: { host, port, user, password, database },
  });

  console.log(`Getting tables info from ${database} ...`);

  const [result] = await mysqlQueryBuilder.raw(
    `SELECT table_name as name FROM information_schema.tables WHERE table_schema = '${database}';`
  );
  const names = result?.map(({ name }) => name);
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
    name: 'tableNames',
    source: async (_: string[], input = '') =>
      fuzzy.filter(input, names).map(({ original }) => original),
  };

  const { tableNames }: inquirer.Answers = await inquirer.prompt([q01]);

  const child = spawn(`yarn`, ['falak-server'], {
    shell: true,
    env: { DB_TABLES: tableNames, DB_NAME: database },
  });

  child.stdout.on('data', (data) => {
    console.log(data.toString());
  });
  child.stdout.on('error', (data) => {
    console.log(data.toString());
  });
};

ask();
