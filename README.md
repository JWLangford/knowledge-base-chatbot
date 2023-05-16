# Knowledge Base Chatbot

A simple knowledge base chatbot written in Node.js

## Installation

Clone the repo or download the ZIP

```
git clone https://github.com/JWLangford/knowledge-base-chatbot.git
```

Knowledge Base Chatbot requires [Node.js](https://nodejs.org/) v18+ to run.

First run `npm install yarn -g` to install yarn globally.

Then run:

```
yarn install
```
After installation, you should now see a `node_modules` folder.

Set up your `.env` file

- Copy `.env.example` into `.env`
  Your `.env` file should look like this:

```
OPENAI_API_KEY=""
PINECONE_API_KEY=""
PINECONE_ENVIRONMENT=""
PINECONE_INDEX_NAME=""
PINECONE_INDEX_NAMESPACE=""
```

- Visit [openai](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key) to retrieve API keys and insert into your `.env` file.
- Visit [pinecone](https://pinecone.io/) to create and retrieve your API keys, and also retrieve your environment and index name from the dashboard.

Finally, run the project with

```
yarn start
```

## Endpoints

`POST /chat`

#### Request Body Parameters
| Name  |  Type | Required | Description |
| ------------- | ------------- | ------------- | ------------- |
| question  | string  | True | the question you want an answer for |

#### Response
| Name  |  Type | Description |
| ------------- | ------------- | ------------- | 
| text  | string  | the answer for your question |
| sourceDocuments  | array  | a list of the source documents considered when the API was fomrulating an anser |
   
   [node.js]: <http://nodejs.org>
