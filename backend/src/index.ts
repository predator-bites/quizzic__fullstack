import 'dotenv/config';
import createServer from './createServer';

const PORT = process.env['PORT'] ?? 3000;

const app = createServer();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});