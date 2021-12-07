# NodeJS selenium testing
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

### Building the test container:
- navigate to `NodeJS` folder 
```bash
cd NodeJS
```
- build the docker container:
```bash
docker compose up --build
```
## After the building process

#### Search by the docker image `nodejs_node` and check your own docker log terminal for better viewing result, use the following command to find the specific container id
```bash
docker ps
```
and execute
```bash
docker logs <CONTAINER_ID> --follow
```

## OR

access your local port 8080 to see a full display of the tests that have been made, created by the mochawesome tool

E.g.
`http://localhost:8080`

The Selenium Grid web GUI can be found at port :4444

E.g.
`http://localhost:4444`
