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

app.set('trust proxy', 1); 
app.use(express.json());
app.use(cookieParser());

const ALLOWED_ORIGINS = new Set(
  String(CLIENT_ORIGIN || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
);

if (NODE_ENV !== 'production') {
  ALLOWED_ORIGINS.add('http://localhost:5173');
}

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);

      try {
        const u = new URL(origin);
        const host = u.hostname;

        const isDev =
          host === "localhost" || host === "127.0.0.1";

        const isVitalIQ =
          host === "vitaliq.one" || host.endsWith(".vitaliq.one"); 

        if (isDev || isVitalIQ) return cb(null, true);
      } catch (_) {

      }

      console.error("CORS blocked:", origin);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
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

  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.get('/healthz', (_req, res) => res.status(200).send('ok'));

app.listen(port, () => {
  console.log(`Server is running on port ${port} (env=${NODE_ENV})`);
  console.log('CORS allowlist:', [...ALLOWED_ORIGINS]);
  console.log('ML_BASE_URL:', ML_BASE_URL || '(none/local)');
  connectDB();
});
