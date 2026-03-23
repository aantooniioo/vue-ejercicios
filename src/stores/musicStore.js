// EJERCICIO 1: Estado con Pinia

import { defineStore } from 'pinia'

export const useMusicStore = defineStore('music', {
  state: () => ({
    artistas: [],
    discos: []
  }),

  actions: {
    addArtista(artista) {
      this.artistas.push(artista)
    },

    addDisco(disco) {
      this.discos.push(disco)
    }
  }
})