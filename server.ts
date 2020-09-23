const { Client } = require('pg')
const client = new Client()

const tasksQuery = `
  SELECT t.title, t.info, s.value status_value, s.label status_label, p.value priority_value, p.label priority_label FROM tasks6 t LEFT JOIN statuses s ON s.id = t.statusId INNER JOIN priorities p ON p.id = t.priorityId;
`
// Sample response
// [
//   {
//     title: 'Wypełnić bazę',
//     info: 'Jakies pierdoly 2',
//     status_value: 'TODO      ',
//     status_label: 'To do',
//     priority_value: 'YELLOW    ',
//     priority_label: 'Ważne'
//   },
//   {
//     title: 'Nauczyć sie postsql',
//     info: 'brak',
//     status_value: 'TODO      ',
//     status_label: 'To do',
//     priority_value: 'YELLOW    ',
//     priority_label: 'Ważne'
//   }
// ]

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
