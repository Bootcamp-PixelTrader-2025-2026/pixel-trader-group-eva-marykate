<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useApi } from "~/composables/useApi";
import JeuForm from "~/components/JeuForm.vue";

const route = useRoute();
const router = useRouter();
const { request } = useApi();
const id = route.params.id;

const jeu = ref({
  titre: "",
  annee_sortie: "",
  etat: "",
  id_emplacement: 1,
  valeur_estimee: 0,
  prix_achat: 0,
});

onMounted(async () => {
  if (id !== "new") {
    const data = await request(`/jeux/${id}`);
    Object.assign(jeu.value, data);
  }
});

const saveJeu = async (data) => {
  if (id === "new") {
    await request("/jeux", { method: "POST", body: data });
  } else {
    await request(`/jeux/${id}`, { method: "PUT", body: data });
  }
  router.push("/jeux");
};
</script>

<template>
  <div class="jeu-page">
    <h1>{{ id === "new" ? "Ajouter un jeu" : "Modifier un jeu" }}</h1>
    <JeuForm :jeu="jeu" @save="saveJeu" />
  </div>
</template>

<style scoped lang="scss">
.jeu-page {
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
