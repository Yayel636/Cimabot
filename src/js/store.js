
import { createStore } from 'framework7/lite';

const store = createStore({
  state: {
    alumnos: [
      {
        id: '1111',
        correo: 'ale@uabc.edu.mx',
        name: 'Alejandra.',
        tutor: 'Marcela'
      },
      {
        id: '2',
        correo: 'a111991@uabc.edu.mx',
        name: 'Velit'
      },
      {
        id: '3',
        correo: 'cositabonita@uabc.edu.mx',
        name: 'Expedita.'
      },
    ]
  },
  getters: {
    alumnos({ state }) {
      return state.alumnos;
    }
  },
  actions: {
    addProduct({ state }, product) {
      state.alumnos = [...state.alumnos, product];
    },
  },
})
export default store;
