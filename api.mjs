import { formTemplate, generateTodosTemplate, notFoundHtmlTemplate, rootHtmlTemplate, todos, aboutTemplate, contactsTemplate } from './data.mjs'
import * as querystring from 'node:querystring'

const generateHtml = (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end(rootHtmlTemplate)
}

const generateText = (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Plain text from HTTP server')
}

const generateTodos = (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end(generateTodosTemplate())
}

const generateJson = (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(todos))
}

const generateForm = (req, res) => {
  if (!formTemplate) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/plain')
    res.end('Error: Form template not loaded')
  } else {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end(formTemplate)
  }
}

const postData = (req, res) => {
  res.setHeader('Content-Type', 'text/plain')

  if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
    let body = ''

    req.on('data', (chunk) => body += chunk)

    req.on('end', () => {
      try {
        let todo = querystring.parse(body)

        todo = {
          id: +todo['id'],
          title: todo['title'],
          userId: +todo['userId'],
          completed: todo['completed'] === 'on'
        }

        todos.push(todo)

        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.end(generateTodosTemplate())
      } catch (error) {
        res.statusCode = 400
        res.end('Invalid form data')
      }
    })
  } else if (req.headers['content-type'] === 'application/json') {
    let dataJson = ''

    req.on('data', (chunk) => dataJson += chunk)

    req.on('end', () => {
      try {
        todos.push(JSON.parse(dataJson))
        res.statusCode = 200
        res.end('Todo data was received')
      } catch (error) {
        res.statusCode = 400
        res.end('Invalid JSON data')
      }
    })
  } else {
    res.statusCode = 400
    res.end('Todo data must be in JSON format')
  }
}

const generateNotFound = (req, res) => {
  res.statusCode = 404
  res.setHeader('Content-Type', 'text/html')
  res.end(notFoundHtmlTemplate)
}

const generateAbout = (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end(aboutTemplate)
}

const generateContacts = (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end(contactsTemplate)
}

export { generateHtml, generateText, generateJson, generateNotFound, generateForm, generateTodos, postData, generateAbout, generateContacts }