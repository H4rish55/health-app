const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

const authRoutes = require('./router/auth.route');
const predictRoutes = require('./router/predict.route');
const doctorRoutes = require('./router/doctor.route');
const bmiRoutes = require('./router/bmi.route');
const chatRoutes = require('./router/chat.route');

const { NODE_ENV, PORT, CLIENT_ORIGIN, ML_BASE_URL } = require('./config/envVars');
const connectDB = require('./config/db');

const app = express();
const port = PORT || 4000;

app.use(express.json());
app.use(cookieParser());

const allowed = new Set([CLIENT_ORIGIN]);
if (NODE_ENV !== 'production') allowed.add('http://localhost:5173');

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowed.has(origin)) return cb(null, true);
      return cb(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
  })
);

if (
  NODE_ENV !== 'production' &&
  (!ML_BASE_URL || /127\.0\.0\.1|localhost/.test(ML_BASE_URL))
) {
  const { spawn } = require('child_process');
  const pyCmd = process.platform === 'win32' ? 'python' : 'python3';
  const ML_DIR = path.join(__dirname, 'ml');

  const mlProc = spawn(pyCmd, ['ml_server.py'], { cwd: ML_DIR, stdio: 'inherit' });
  mlProc.on('exit', (code, signal) => {
    console.log(`[ML] exited with code=${code} signal=${signal}`);
  });

  const stopML = () => {
    if (mlProc && !mlProc.killed) {
      try { mlProc.kill('SIGTERM'); } catch {}
    }
  };
  process.on('SIGINT',  () => { stopML(); process.exit(0); });
  process.on('SIGTERM', () => { stopML(); process.exit(0); });
  process.on('exit', stopML);
}

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/predict', predictRoutes);
app.use('/api/v1/doctor', doctorRoutes);
app.use('/api/v1/bmi', bmiRoutes);
app.use('/api/v1/chat', chatRoutes);

if (NODE_ENV === 'production') {
  const distPath = path.resolve(__dirname, '../../frontend/dist');
  app.use(express.static(distPath));
  // any non-API route → index.html
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port} (env=${NODE_ENV})`);
  connectDB();
});
