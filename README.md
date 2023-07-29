
# File Sharing App

This project is a file sharing application that allows uploading and downloading files. The backend application is built with Node.js and Express, while the frontend is created with React.

Project created for the Cloud App Security Engineer vacancy challenge at Liferay
## Features

- File Upload: The application allows users to upload files to the server. Basic authentication is required for this operation.

- File Download: Users can also download files from the server, using the file name and basic authentication.

- Basic Authentication: Access to both file upload and download operations is protected by basic authentication.




## Technologies used

- Backend: Node.js, Express, Multer for handling file uploads.

- Frontend: React, Axios for making HTTP requests.

- Authentication: The basic-auth library of Node.js is used for implementing basic authentication.

- Containerization: Docker.
## Setup

We have 2 ways to run this project. Using locally, initializing from terminal or via docker.

### First one:

    
## Running Locally

Clone the project

```bash
  git clone https://github.com/rafaelpdemelo/file-sharing-app.git
```

Go to the project directory

```bash
  cd file-sharing-app
```

Install dependencies inside both backend/ and frontend/ directories

```bash
  yarn install
```

Start the server inside both backend/ and frontend/ directories

```bash
  npm start
```


### Second one:
## Running with Docker



Clone the project

```bash
  git clone https://github.com/rafaelpdemelo/file-sharing-app.git
```

Go to the project directory

```bash
  cd file-sharing-app
```

Change the username inside the whole ```rerun.sh``` script for your username (This is good if you want to publish this image later on Dockerhub)
For exemple:

```bash
  docker buildx build -t [username]/node-app:latest -f node.Dockerfile .
  docker buildx build -t rafaelpdemelo/node-app:latest -f node.Dockerfile .
```

Now, let's run the script ```rerun.sh``` to execute the creation of the docker image and also run the container with the application.

```bash
  sh rerun.sh
```

### Note

You may need administrator permission for your operating system.

if you use linux, you can use it to turn the file into an executable file. (in case the command above doesn't work '-')

```bash
  chmod a+x rerun.sh 
```

And after

```bash
  ./rerun.sh 
```

### Finally...

Now if you access your ```localhost:80``` , you will see the React application. If you access ```localhost:3001```, you will see that the server has also gone up (Informed by the message ```Cannot get / ```).
# More

In case you are running the application locally, you can see the uploads performed inside the uploads folder that was generated inside ```backend/src/uploads```

If you are running with Docker, you can also view the files that are being uploaded.

Just Run and go to the same path ```backend/src/uploads```

```bash
 docker exec -it [container-id] /bin/bash
```

user -> user
password -> password 

### PS: Play with Curl. I created the interface to make it easier during development. 


## Authors

- [@rafaelpdemelo](https://www.github.com/rafaelpdemelo)

