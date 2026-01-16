<template>
  <div>
    <div class="filters">
      <input type="text" placeholder="Rechercher..." v-model="search" />
      <select v-model="plateforme">
        <option value="">All</option>
        <option>NES</option>
        <option>SNES</option>
        <option>PlayStation</option>
        <option>Saturn</option>
      </select>
      <select v-model="emplacement">
        <option value="">All</option>
        <option>Rayon A1</option>
        <option>Rayon B2</option>
        <option>Réserve B1</option>
      </select>
      <button @click="resetFilters">Réinitialiser</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Titre</th>
          <th>Année</th>
          <th>État</th>
          <th>Plateformes</th>
          <th>Emplacement</th>
          <th>Valeur ¥</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="jeu in jeux" :key="jeu.id_jeux">
          <td>{{ jeu.titre }}</td>
          <td>{{ jeu.annee_sortie }}</td>
          <td>
            <span
              class="badge"
              :class="{
                excellent: jeu.etat === 'Excellent',
                bon: jeu.etat === 'Bon',
                neuf: jeu.etat === 'Neuf',
                acceptable: jeu.etat === 'Acceptable'
              }"
            >
              {{ jeu.etat }}
            </span>
          </td>
          <td>{{ jeu.plateformes }}</td>
          <td>{{ jeu.emplacement }}</td>
          <td>¥{{ jeu.valeur_estimee }}</td>
          <td>
            <button class="modify" @click="$emit('edit', jeu.id_jeux)">Modifier</button>
            <button class="delete" @click="$emit('delete', jeu.id_jeux)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const search = ref('')
const plateforme = ref('')
const emplacement = ref('')
const jeux = defineProps(['jeux'])

const resetFilters = () => {
  search.value = ''
  plateforme.value = ''
  emplacement.value = ''
}
</script>
