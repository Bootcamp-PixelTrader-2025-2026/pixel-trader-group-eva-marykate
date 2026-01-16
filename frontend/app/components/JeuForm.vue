<template>
  <form @submit.prevent="$emit('save', jeu)">
    <input v-model="jeu.titre" placeholder="Titre" required />
    <input v-model.number="jeu.annee_sortie" placeholder="Année" type="number" required />
    <input v-model="jeu.etat" placeholder="État" required />
    <input v-model.number="jeu.valeur_estimee" placeholder="Valeur estimée" type="number" required />
    <input v-model.number="jeu.prix_achat" placeholder="Prix achat" type="number" required />
    <button type="submit">Enregistrer</button>
  </form>
</template>

<script setup>
defineProps({ jeu: Object })
</script>
