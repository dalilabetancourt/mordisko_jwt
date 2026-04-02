import express from 'express'
import exphbs from 'express-handlebars'
import mordiskoRoter from './routes/mordiskoRoutes.js'
import path from 'path'

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 3000;


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//static public
app.use(express.static(path.join(__dirname, 'src/public'))) 


//sincronizar con la base de datos


//rutas 
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src/views'));

app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'src/views/layouts'),
    extname: '.hbs'
}))

//rutas

app.use('/', mordiskoRoter);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});