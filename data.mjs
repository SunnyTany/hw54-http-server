import fs from 'node:fs/promises'

const createHtmlTemplate = (htmlInjection) => `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HTTP server</title>
      </head>
      
      <body style="font-family: Arial, Helvetica, sans-serif;">
      <div class="container">
        <header>
          <menu>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contacts">Contacts</a></li>
            <li><a href="/form">Form</a></li>
            <li><a href="/todos">Todos</a></li>
          </menu>
        </header>
        <div style="width: min(100% - 40px, 992px); margin-inline: auto;">
          ${htmlInjection}
        </div>
      </body>
      
      </html>
    `

const generateTodosTemplate = () => {
  const headerHtml = `<h1>Todos List</h1>`
  const todosHtml = todos.map(todo => `
        <div style="border-bottom: 1px solid #ccc; padding: 10px;">
          <h2>${todo.title}</h2>
          <p>Id: ${todo.id}</p>
          <p>User ID: ${todo.userId}</p>
          <p>Completed: ${todo.completed ? 'Yes' : 'No'}</p>
        </div>
      `).join('')

  const buttonHtml = `<button onclick="location.href='/form'">Add new todo</button>`

  return createHtmlTemplate(`${headerHtml}${todosHtml}${buttonHtml}`)
}

let formTemplate, aboutTemplate, contactsTemplate, notFoundHtmlTemplate, rootHtmlTemplate


const loadFormTemplate = async () => {
  try {
    formTemplate = await fs.readFile('./templates/form.html')
  } catch (error) {
    console.error('Error reading form.html file:', error)
  }
}

const loadHomeTemplate = async () => {
  try {
    rootHtmlTemplate = await fs.readFile('./templates/home.html')
  } catch (error) {
    console.error('Error reading home.html file:', error)
  }
}

const loadAboutTemplate = async () => {
  try {
    aboutTemplate = await fs.readFile('./templates/about.html')
  } catch (error) {
    console.error('Error reading about.html file:', error)
  }
}

const loadContactsTemplate = async () => {
  try {
    contactsTemplate = await fs.readFile('./templates/contacts.html')
  } catch (error) {
    console.error('Error reading contacts.html file:', error)
  }
}

const loadNotFoundTemplate = async () => {
  try {
    notFoundHtmlTemplate = await fs.readFile('./templates/notFound.html')
  } catch (error) {
    console.error('Error reading notFound.html file:', error)
  }
}

loadHomeTemplate()
loadFormTemplate()
loadAboutTemplate()
loadContactsTemplate()
loadNotFoundTemplate()

const todos = [
  {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false
  },
  {
    userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false
  },
  {
    userId: 1,
    id: 3,
    title: 'fugiat veniam minus',
    completed: false
  },
  {
    userId: 1,
    id: 4,
    title: 'et porro tempora',
    completed: true
  },
  {
    userId: 1,
    id: 5,
    title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
    completed: false
  }
]

export { rootHtmlTemplate, notFoundHtmlTemplate, todos, formTemplate, generateTodosTemplate, aboutTemplate, contactsTemplate }