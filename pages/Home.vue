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

<template>
  <main>
    <h1>Welcome</h1>
    <RouterLink to="/pump-rock">Go to Pump Rock</RouterLink>
  </main>
</template>
