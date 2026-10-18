<template>
  <div class="theme">
    <h1 class="mono">apps</h1>
    <button>
      <RouterLink to="/pump-rock">Pump Rock</RouterLink>
    </button>
    <button>
      <RouterLink to="/myspace">MySpace</RouterLink>
    </button>
  </div>
</template>

<script>
export default {
  name: "Home",

  mounted() {
    document.title = "Apps | millrdev";
    const link =
      document.querySelector("link[rel='icon']") ||
      document.createElement("link");
    link.rel = "icon";
    link.href = "/apps/favicon.svg";
    document.head.appendChild(link);
  },
};
</script>

<style scoped src="../../assets/home/home-style.css"></style>
