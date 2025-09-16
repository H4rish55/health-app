const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const { spawn } = require('child_process')
const fs = require('fs')

const authRoutes = require('./router/auth.route')
const predictRoutes = require('./router/predict.route')
const doctorRoutes = require('./router/doctor.route')
const bmiRoutes = require('./router/bmi.route')
const chatRoutes = require('./router/chat.route')

const { NODE_ENV, PORT } = require('./config/envVars')
const connectDB = require('./config/db')

const app = express()

const port = PORT || 4000
const CLIENT_ORIGIN = 'http://localhost:5173'
const ROOT_DIR = path.resolve(__dirname, '../../')

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

app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: [CLIENT_ORIGIN, 'http://localhost:5173'],
    credentials: true,
  })
)

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/predict', predictRoutes)
app.use('/api/v1/doctor', doctorRoutes)
app.use('/api/v1/bmi', bmiRoutes)
app.use('/api/v1/chat', chatRoutes)

const distPath = path.resolve(__dirname, '../../frontend/dist');
console.log('Serving static from:', distPath, 'exists:', fs.existsSync(distPath));

app.use(express.static(distPath));

app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
    console.log("Server is running on port", port)
    connectDB()
})
