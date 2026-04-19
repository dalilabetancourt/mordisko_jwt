import express from 'express'
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import exphbs from 'express-handlebars'
import jwt from 'jsonwebtoken'; 
import mordiskoRoter from './routes/mordiskoRoutes.js'
import db from './config/db.js'
import path from 'path'

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 4007;

// 1. Middlewares de parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Indispensable para JWT

// 2. Configuración de Express-fileUpload
app.use(fileUpload({
    createParentPath: true, 
    limits: { fileSize: 2 * 1024 * 1024 }, 
    abortOnLimit: true,
    responseOnLimit: "El tamaño del archivo ha superado el límite permitido"
}));

// 3. Archivos estáticos
app.use(express.static(path.join(process.cwd(), 'src', 'public')));

// 4. Middleware de JWT para res.locals
app.use((req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            // Decodificamos el token para que {{user}} funcione en .hbs
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'palabra_secreta_provisional');
            res.locals.user = decoded; 
        } catch (error) {
            res.locals.user = null;
        }
    } else {
        res.locals.user = null;
    }
    next();
});

// 5. Handlebars
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "src/views/layouts"), 
    extname: ".hbs",
    helpers: {
      eq: (a, b) => a === b
    }
  }),
);

// 6. Rutas
app.use('/', mordiskoRoter);

// 7. DB Connection & Server Start
async function startServer() {
    try {
        await db.authenticate();
        await db.sync({ alter: true }); 
        console.log('✅ Conexión a la DB lista');
        
        app.listen(PORT, () => {
            console.log(`🚀 Servidor en: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ No se pudo conectar:', error);
    }
}

startServer();