<script setup>
import { ref, onMounted } from "vue";
import { useApi } from "~/composables/useApi";

const { request } = useApi();
const nbJeux = ref(0);
const valeurTotale = ref(0);

onMounted(async () => {
  const jeux = await request("/jeux");
  nbJeux.value = jeux.length;
  valeurTotale.value = jeux.reduce(
    (acc, j) => acc + Number(j.valeur_estimee),
    0
  );
});
</script>

<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <div class="stats">
      <div class="stat-card">
        <h2>Nombre de jeux</h2>
        <p class="stat-value">{{ nbJeux }}</p>
      </div>
      <div class="stat-card">
        <h2>Valeur totale</h2>
        <p class="stat-value">¥{{ valeurTotale }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
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

  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  .stat-card {
    background-color: #111;
    border: 2px solid #00ffc3;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 255, 195, 0.2);

    h2 {
      color: #00ffc3;
      margin-bottom: 15px;
      font-size: 1.1em;
    }

    .stat-value {
      color: #fff;
      font-size: 2.5em;
      font-weight: bold;
      text-shadow: 0 0 10px #00ffc3;
    }
  }
}
</style>
