import Server from '@/Server';

const port = Number(process.env.EXPRESS_PORT) || 8080;

// Start the server on the specified port
Server.listen(port, () => {
  console.info(`Server is up and listening on 'http://localhost:${port}'`);
});
