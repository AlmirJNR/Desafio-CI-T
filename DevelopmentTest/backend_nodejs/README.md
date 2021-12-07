# NodeJS API with unit testing
This repository contains a complete test session that implements mocha, supertest and nodejs inside a Docker container

# What's used

* **Docker-compose** [version 2.2 | specification 3.9]
* **Docker** [version 20.10.11 ]
* **PostgreSQL** [version 14]
* **NodeJS** [version latest]
* **TypeScript** [version 4.4.4+]
* **Pnpm** [version 6.23.3+]

# What's Included

Development utilities:
* **dotenv**
  * Loads environment variables from a `.env` file into `process.env`
* **eslint**
  * A powerful linting tool
* **mocha**
  * Flexible testing framework
* **mochawesome**
  * A custom reporter for use with testing framework
* **supertest**
  * A powerful tool for testing HTTP assertions

This project is build and meant to be used within docker compose
```bash
docker compose
```

### Building the container:
- build the docker container:
```bash
docker compose up --build
```
## After the building process

## Checking the test results

#### Search by the docker image `backend_nodejs_node` and check your own docker log terminal for better viewing result, use the following command to find the specific container id
```bash
docker ps
```
and execute
```bash
docker logs <CONTAINER_ID> --follow
```

#### Check the test results with an interface
- navigate to mochawesome-report folder:
```bash
cd mochawesome-report
```
open `index.html` to see all executed tests and their codes
