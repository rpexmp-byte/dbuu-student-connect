/**
 * Server Entry Point
 * Initialize and start the Express server with Socket.io
 */

import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import connectDB from './config/db.js';
import { configureCloudinary } from './config/cloudinary.js';
import { initializeSocketHandlers } from './sockets/socketHandlers.js';
import { authenticateSocket } from './middleware/auth.js';

// Load environment variables
dotenv.config();

/**
 * Validate required environment variables
 */
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars.join(', '));
  console.error('Please create a .env file based on .env.example');
  process.exit(1);
}

/**
 * Set port
 */
const PORT = process.env.PORT || 5000;

/**
 * Initialize and start server
 */
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Configure Cloudinary (optional - only if credentials provided)
    if (process.env.CLOUDINARY_CLOUD_NAME) {
      configureCloudinary();
    } else {
      console.warn('⚠️  Cloudinary not configured - image uploads will fail');
      console.warn('   Add CLOUDINARY_* variables to .env to enable image uploads');
    }

    // Create HTTP server
    const server = createServer(app);

    const allowedSocketOrigins = [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      process.env.FRONTEND_URL,
    ].filter(Boolean);

    // Initialize Socket.io with connection limits and timeouts
    const io = new Server(server, {
      cors: {
        origin: allowedSocketOrigins,
        credentials: true,
        methods: ['GET', 'POST']
      },
      transports: ['websocket', 'polling'],
      allowEIO3: true,
      // Connection management settings
      pingTimeout: 60000, // 60s - how long to wait for pong before disconnect
      pingInterval: 25000, // 25s - interval between ping packets
      connectTimeout: 45000, // 45s - connection timeout before giving up
      maxHttpBufferSize: 1e6, // 1MB - max message size
      allowUpgrades: true,
      perMessageDeflate: false, // Disable compression for better performance
    });

    console.log('🔌 Socket.io server initialized');
    console.log('📡 CORS origin:', process.env.FRONTEND_URL || 'http://localhost:3000');

    // Socket.io authentication middleware
    io.use(authenticateSocket);

    // Socket.io error handling
    io.engine.on('connection_error', (err) => {
      console.error('❌ Socket.io connection error:', err.message);
      console.error('Error code:', err.code);
      console.error('Error context:', err.context);
    });

    // Monitor Socket.io engine for potential issues
    io.engine.on('initial_headers', (headers, req) => {
      // Log connection attempts for debugging
      console.log(`🔍 New connection attempt from ${req.socket.remoteAddress}`);
    });

    // Track total connections for monitoring
    let totalConnections = 0;
    io.on('connection', () => {
      totalConnections++;
      console.log(`📊 Total connections since start: ${totalConnections}`);
    });

    // Make io accessible globally for controllers
    app.set('io', io);

    // Initialize socket event handlers
    initializeSocketHandlers(io);
    
    console.log('✅ Socket.io event handlers initialized');

    // Periodic memory and connection monitoring (every 5 minutes)
    setInterval(async () => {
      const used = process.memoryUsage();
      const connectedSockets = io.sockets.sockets.size;
      
      console.log('\n📊 ========== SYSTEM HEALTH CHECK ==========');
      console.log(`🔌 Active Socket Connections: ${connectedSockets}`);
      console.log(`💾 Memory Usage:`);
      console.log(`   - RSS: ${Math.round(used.rss / 1024 / 1024)} MB`);
      console.log(`   - Heap Used: ${Math.round(used.heapUsed / 1024 / 1024)} MB`);
      console.log(`   - Heap Total: ${Math.round(used.heapTotal / 1024 / 1024)} MB`);
      console.log(`   - External: ${Math.round(used.external / 1024 / 1024)} MB`);
      
      // Get online users count from socketHandlers
      const { getOnlineUsers } = await import('./sockets/socketHandlers.js');
      const onlineUsersCount = getOnlineUsers().length;
      console.log(`👥 Online Users: ${onlineUsersCount}`);
      console.log('============================================\n');
      
      // Warn if memory usage is high
      if (used.heapUsed / 1024 / 1024 > 500) {
        console.warn('⚠️  WARNING: High memory usage detected! Consider restarting the server.');
      }
      
      // Warn if too many connections
      if (connectedSockets > 1000) {
        console.warn('⚠️  WARNING: High number of socket connections! Monitor for potential issues.');
      }
    }, 5 * 60 * 1000); // 5 minutes

    // Start server
    server.listen(PORT, () => {
      console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 DBUU Student Connect API Server                     ║
║                                                           ║
║   ✅ Server running on port ${PORT}                        ║
║   ✅ Environment: ${process.env.NODE_ENV || 'development'}                      ║
║   ✅ MongoDB Connected                                    ║
║   ${process.env.CLOUDINARY_CLOUD_NAME ? '✅' : '⚠️ '} Cloudinary ${process.env.CLOUDINARY_CLOUD_NAME ? 'Configured' : 'Not Configured'}                       ║
║   ✅ Socket.io Initialized                                ║
║                                                           ║
║   📍 Base URL: http://localhost:${PORT}                    ║
║   📍 Health Check: http://localhost:${PORT}/health         ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
      `);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.error('❌ UNHANDLED REJECTION! Shutting down...');
      console.error(err);
      server.close(() => {
        process.exit(1);
      });
    });

    // Handle SIGTERM signal
    process.on('SIGTERM', () => {
      console.log('👋 SIGTERM RECEIVED. Shutting down gracefully...');
      server.close(() => {
        console.log('✅ Process terminated!');
      });
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();
