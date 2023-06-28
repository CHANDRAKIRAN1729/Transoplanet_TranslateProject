# Transoplanet Translate Project
## This is a simple web page where users can input a line of text in English, which is then translated into selected language, and then convert the translated text into a downloadable audio file using a text-to-speech API.

### Table of Contents
- Installation
- Usage

## Installation
1. To set up the project locally, follow these steps:
Clone the repository:
  git clone https://github.com/CHANDRAKIRAN1729/Transoplanet_TranslateProject.git

2. Navigate to the project directory:
  cd Transoplanet_TranslateProject/translation-app-backend

3. Install the required dependencies:
  npm install

4. Navigate to the project directory:
  cd Transoplanet_TranslateProject/translation-app-frontend

5. Install the required dependencies:
  npm install

## Configuration
Before using the Transoplanet Translate Project, you need to configure your Google API credentials. Follow these steps:
1. Go to the Google-API's website ([https://www.transoplanet.com](https://console.cloud.google.com/)) and sign up for an account.
2. Once you have an account, create a new project and Enable the required API's in your project
3. Navigate to the API settings and obtain your API credentials
4. The required API's are:
   - google translate API
   - google text-to-speech API
5. Download the API-configuration-JSON file which contains Project_Id and Service_Account_Key. Add this JSON file to your backend source directory.
6. In server.js file modify these fields:
  - const projectId ='YOUR_PROJECT_ID';
  - const keyFilename ='PATH_FOR_YOUR API_CONFIGURATION_JSON_FILE';

## Usage
1. cd Transoplanet_TranslateProject/translation-app-backend
   - npm start
2. cd Transoplanet_TranslateProject/translation-app-frontend
   - npm start
