const inst = Vue.createApp({
    data() {
        return {
            personajes: [],
            personajesFiltrados: [],
            seleccionarCategoria: 'All',
            busquedaNombre: ''
        }
    },
    created() {
        this.cargarPersonajes();
    },
    methods: {
        cargarPersonajes() {
            axios.get("https://rickandmortyapi.com/api/character?100")
                .then(respuesta => {
                    this.personajes = respuesta.data.results.map(p => ({
                        id: p.id,
                        name: p.name,
                        ki: Math.floor(Math.random() * 100) + 50, // valor inventado
                        race: p.species,
                        status: p.status,
                        image: p.image
                    }));
                    this.personajesFiltrados = this.personajes;
                })
                .catch(error => console.error("Error al cargar API:", error));
        },
        filtrarPorCategorias(categoria) {
            this.seleccionarCategoria = categoria;
            if (categoria === 'All') {
                this.personajesFiltrados = this.personajes.filter(p => p.name.toLowerCase().includes(this.busquedaNombre.toLowerCase()));
            } else {
                this.personajesFiltrados = this.personajes.filter(p =>
                    p.race === categoria && p.name.toLowerCase().includes(this.busquedaNombre.toLowerCase())
                );
            }
        },
        calcularPeleas(ki) {
            return Math.floor(ki / 10);
        }
    },
    watch: {
        busquedaNombre() {
            this.filtrarPorCategorias(this.seleccionarCategoria);
        }
    }
});

inst.mount("#contenedor");
