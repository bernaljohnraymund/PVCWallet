# PVCWallet
Open the terminal in the project directory and run the following commands:

# ensure first that nodejs and npm is installed on your machine
https://nodejs.org/en/download/

# ensure that quasar CLI is installed
npm install -g @quasar/cli

# go to the frontend directory
cd ./{project_directory}/frontend/

# install all frontend dependencies (skip this step if dependencies already installed)
npm install

# run frontend server
quasar dev

# open another terminal and go to the backend
cd ./{project_directory}/backend/

# install all backend dependencies (skip this step if dependencies already installed)
npm install

# run backend server
npm run dev
