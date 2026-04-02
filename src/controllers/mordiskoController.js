

const home = (req, res) => {
    try {
      const products = [
            {
                id: 1,
                nombre: 'Helado de chocolate',
                descripcion: 'Cremoso y delicioso',
                precio: 3000,
                categoria: 'Leche'
            }
        ]
        res.render('home', {
            pageTitle: 'inicio',
            isExito: true,
            products
        })
    } catch (error) {
        console.log('Error al cargar pagina home', error)
    }
}

export {
    home
}