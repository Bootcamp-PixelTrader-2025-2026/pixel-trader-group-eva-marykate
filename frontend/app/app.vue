<template>
  <div class="app">
    <div class="app-content">
      <Sidebar />
      <div class="main-content">
        <Header />
        <NuxtPage />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Sidebar from "~/components/Sidebar.vue";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
</script>
