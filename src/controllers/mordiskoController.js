

const home = (req, res) => {
    try {
        res.render('home', {
            pageTitle: 'inicio'
        })
    } catch (error) {
        console.log('Error al cargar pagina home', error)
    }
}

export {
    home
}