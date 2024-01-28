# README

## Introduction
This is a chatbot application designed to work with large language models (LLMs) servers that behaves like OpenAI's API. The customizable base URL in the settings allows the user to point the application to the desired local server where the LLM is hosted. This setup is beneficial for those who have their own LLM setup or server, enabling direct interaction with the model through a user-friendly interface provided by the chatbot application

## Live Link
 "https://vaartaalaap.thousandfeeds.com/".

## Features
- **Dynamic Base URL**: Configure the base URL for the chatbot's backend, supporting different environments like development or production.
- **Customizable Prompts**: Modify the default system prompt to tailor the chatbot's behavior.

## Usage
1. **Installation**: Clone the repository and install dependencies using `npm install`
2. **Running the App**: Start the application with `npm start`.Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
3. **Customization**: Use the settings dialog to customize the base URL and default system prompt.

## To use the chatbot application on mobile via `ngrok` or `Tailscale`, follow these steps:

1. **Set Up the Local Server**: First, ensure your chatbot and LLM server is running locally on your computer.

2. **Using Tailscale**:
   - **Install Tailscale**: Download and install Tailscale on both your computer and mobile device.
   - **Set up Tailscale**: Follow Tailscale's setup instructions to create a secure network.You need to enable HTTPS if you are using this application from a hosted server.
   - **Get the URL for the device**: Find the URL of your computer on the Tailscale network.

3. **Configure the Chatbot Application**:
   - **Update Base URL**: In the chatbot application's settings, change the base URL to the ngrok URL or the local IP provided by Tailscale.

4. **Access on Mobile**:
   - Open the application "https://vaartaalaap.thousandfeeds.com/". To use this application with a local LLM server via `ngrok` or `Tailscale`, you need to update the base URL in the application's settings.

   - Navigate to the settings section of the Vaartaalaap application.

   - Replace the current base URL with the URL provided by ngrok (e.g., `https://12345.ngrok.io`) or the DNS address from Tailscale. 

   -  After updating the base URL, save your changes to ensure the application connects to your local server.

Now, the application should be configured to communicate with your local LLM server, and you can use it from your mobile device.

Remember, ngrok exposes your local server to the internet, so be cautious about security.

## Contribution
Contributions to enhance the application are welcome. Follow standard coding practices and submit pull requests for review.

Remember to check the `src` directory for detailed code structure and additional components.
