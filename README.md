# Cloudflare Pages + Cloudflare Workers
This project demonstrating how to host a [Cloudflare Pages](https://pages.cloudflare.com/) application interacting with [Cloulflare Workers](https://workers.cloudflare.com/).  
This application serves a chat interface to the user for the [LangChain JS Worker](https://github.com/lalanikarim/langchain-js-page) backend. 

# Setup Instructions

Follow these steps to set up and run the project locally:

1. **Download or Clone the Repository**  
   Download the code from the repository or clone it using the following command:
     ```bash
     git clone <repository-url>
     ```

2. **Navigate to the Source Folder**  
   Open a terminal and change directory into the source folder:
     ```bash
     cd path/to/source-folder
     ```

3. **Install Package Dependencies**  
   Install the required package dependencies by running:
     ```bash
     npm install
     ```

4. **Connecting with LangChain JS Worker application running locally**  
   To test locally, you'll need to get the LangChain JS Worker project running locally.
   Create a `.dev.vars` file in the root of the project and add the following lines:
     ```bash
     WORKER_URL=http://localhost:8787/
     ```

5. **Test Locally**  
   Run the following command in the terminal to start the Cloudflare Pages application locally:
     ```bash
     npm run dev
     ```
   This will host the Cloudflare Pages application locally at the address [http://localhost:5173/](http://localhost:5173/).
   You can visit the link and test the application in the browser and use the chat interface to interact with the LangChain JS Worker backend.

6. **(Re)Deploying Cloudflare Pages application**
   Before you can deploy to Cloudflare Pages, modify the `wrangler.toml` file and add the `WORKER_URL` environment variable to the url of the hosted LangChain JS Worker from the dashboard. [See instructions here](https://developers.cloudflare.com/workers/configuration/environment-variables/#add-environment-variables-via-wrangler).
   You can deploy Cloudflare Pages application by running the following command:
   ```bash
   npm run deploy
   ```

   You should now be able to visit the hosted application using the provided Cloudflare Pages url.
