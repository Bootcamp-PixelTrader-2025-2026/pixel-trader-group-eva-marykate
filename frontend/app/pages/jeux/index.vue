<script setup>
import { ref, onMounted } from "vue";
import { useApi } from "~/composables/useApi";
import JeuxTable from "~/components/JeuxTable.vue";

const { request } = useApi();
const jeux = ref([]);

const loadJeux = async () => {
  jeux.value = await request("/jeux");
};

const deleteJeu = async (id) => {
  if (confirm("Supprimer ce jeu ?")) {
    await request(`/jeux/${id}`, { method: "DELETE" });
    loadJeux();
  }
};

onMounted(loadJeux);
</script>

<template>
  <div class="jeux-page">
    <h1>Catalogue des jeux</h1>
    <JeuxTable :jeux="jeux" @delete="deleteJeu" />
  </div>
</template>

<style scoped lang="scss">
.jeux-page {
  display: flex;
  flex-direction: column;
  gap: 30px;

  h1 {
    color: #00ffc3;
    font-size: 2em;
    margin-bottom: 20px;
    border-bottom: 2px solid #00ffc3;
    padding-bottom: 15px;
  }
}
</style>
