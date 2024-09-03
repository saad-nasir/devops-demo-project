# Project Overview
I created this repo, `devops-demo-project`, to play around with a simple web application, written in Node.js, that is containerized using Docker and deployed using a CI/CD pipeline configured in GitHub Actions.

## Repo Structure
  - `app/` Directory:
    - contains the source code for the web application
    - for Node.js, it includes `index.js`, `package.json`, and `package-lock.json`.
 
## Dockerfile
  - defines the steps to create a Docker image of the web app
  - specifies the base image (Node.js), copies application files and installs dependancies
  - exposes the port the app will run on (in this case port `3000`)
  - sets the command to run the app

## GitHub Actions Workflow
  - automates the CI/CD process, ensuring that every change pushed to the repo is built, tested, and deployed automatically
  - file location: `.github/workflows/ci-cd.yml`

    ### How it works
      - Triggers (`on`):
        - the workflow triggers on every push to the `main` branch
        - it also triggers on pull requests targeting the `main` branch
       
      - Jobs (`jobs`):
        - `build-and-deploy`: the main jobs that runs on an `ubuntu-latest` runner
       
      - Steps (`steps`):
        1. Checkout code: 
          - `actions/checkout@v3`: checks out the code from the repo so that it can be used in the subsequent steps

        2. Setup Docker Buildx:
           - `docker/setup-buildx-action@v2`: prepares Docker Buildx, which is used for building Docker images

        3. Login to Docker Hub:
           - `docker/login-action@v2`: authenticates the Docker Hub using the username and password stored in GitHub Secrets
           - make sure to generate Access Tokens from DockerHub beforehand with the appropriate permissions so that the runner can both log in and push the Docker image 

        4. Build and Push Docker Image:
           - `docker/build-push-action@v4`: builds the Docker image from the `Dockerfile` and pushes it to Docker Hub
           - the build context is set to the root of the repo (`.`)
           - along with the Docker Hub username, the image is tagged with `latest` and pushed to the Docker Hub repo. (However, as a best practice, use versioning numbers as tags instead of `latest` to avoid confusion)
          
## Further Improvements
  - Deploy the docker container on a cloud platform like Heroku or AWS Elastic Beanstalk. The latter can be done by using AWS Actions. 
  - Implement automated testing by adding test steps in the workflow
  - Integrate monitoring and logging tools
