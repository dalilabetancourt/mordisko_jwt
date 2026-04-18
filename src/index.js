import express from 'express'
import session from 'express-session'; // Solo este import aquí arriba
import exphbs from 'express-handlebars'
import mordiskoRoter from './routes/mordiskoRoutes.js'
import db from './config/db.js'
import path from 'path'

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 4007;

// 1. Middlewares de parseo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Archivos estáticos
app.use(express.static(path.join(__dirname, 'src/public')))

// 3. Configuración de Sesión (DEBE ir antes de las rutas)
app.use(session({
    secret: 'mordisko-key-2026',
    resave: false,
    saveUninitialized: false
}));

// 4. Pasar sesión a las vistas (res.locals)
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// 5. Handlebars
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutDir: path.join(__dirname, "src/views/layouts"),
    extname: ".hbs",
  }),
);

// 6. DB Connection
const connectDB = async () => {
    try {
        await db.sync()
        console.log('Conexión exitosa a la base de datos')
    } catch (error) {
        console.error('Error al conectar con base de datos', error)
    }
}
connectDB()

// 7. Rutas (Siempre al final)
app.use('/', mordiskoRoter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});