const { Client } = require('pg')
const client = new Client()

async function start() {
  await client.connect()
  const res = await client.query('SELECT * FROM tasks1;')
  console.log(res.rows)
  await client.end()
}

start().then(() => {
  console.log('###########');
});