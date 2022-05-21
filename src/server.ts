/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import Appolo from './config/appolo';

const server = Appolo;

server.listen().then(({ url }) => {
  console.log(`Server running in ${url}`);
});
