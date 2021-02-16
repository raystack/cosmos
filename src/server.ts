import Composer from './config/composer'

const main = async () => {
    try {
      const server = await Composer();
      const signalHandler = async () => {
        try {
          await server.stop({ timeout: 30000 });
          process.exit(0);
        } catch (e) {
          console.error(e);
          process.exit(1);
        }
      };
      process.on('SIGINT', signalHandler);
      process.on('SIGTERM', signalHandler);
      await server.start();
      console.log(`Started the Server on port:`, `${server.info.port}`);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };

main()