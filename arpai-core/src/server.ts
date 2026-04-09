import { app } from './app';
import { env } from './config/env';

app.listen(env.PORT, () => {
  console.log(`arpai-core listening on port ${env.PORT}`);
});
