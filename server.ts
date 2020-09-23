const { Client } = require('pg')
const client = new Client()

const tasksQuery = `
  SELECT t.title, t.info, s.value statusValue, s.label statusLabel, p.value priorityValue, p.label priorityLabel FROM tasks6 t LEFT JOIN statuses s ON s.id = t.statusId INNER JOIN priorities p ON p.id = t.priorityId;
`

const express = require('express')
const app = express()

app.get('/', async (req: any, res: any) => {
  res.send(await runQuery())
})

app.listen(3000)

async function runQuery() {
  await client.connect()
  const res = await client.query(tasksQuery)
  console.log(res.rows)
  await client.end()
  return res.rows;
}
