<script>
export default {
  data() {
    return {
      app_name: "Pump Rock",
      username: "",
      usernameInput: "",
      pumps: [],
    };
  },

  methods: {
    addPump() {
      this.pumps.splice(0, 0, {
        id: this.pumps.length + 1,
        username: this.username,
        timestamp: new Date(),
      });
    },
    setUsername(value) {
      this.username = value.trim();
    },
  },

  mounted() {
    document.title = "Pump Rock | millrdev";
    const link =
      document.querySelector("link[rel='icon']") ||
      document.createElement("link");
    link.rel = "icon";
    link.href = "/apps/pump-favicon.svg";
    document.head.appendChild(link);
  },
};
</script>

<template>
  <header>
    <div>
      <h1>Welcome to {{ app_name }}</h1>
      <h2 style="font-style: italic" ;>Who can rock the most pumps?</h2>
    </div>
    <section>
      <h3>Username: {{ username || "Not set" }}</h3>
    </section>
    <section>
      <input type="text" placeholder="Enter username" v-model="usernameInput" />
      <button :disabled="!usernameInput" @click="setUsername(usernameInput)">
        Set username
      </button>
    </section>
  </header>
  <section v-if="username">
    <button @click="addPump">Add pump to {{ username }}</button>
  </section>
  <article>
    <h2 style="font-weight: bold" ;>Pump Leaderboard</h2>
    <ul>
      <li v-for="pump in pumps" :key="pump.id">
        {{ pump.username }} has had a pump at
        {{ pump.timestamp.toLocaleString() }}
      </li>
    </ul>
  </article>
</template>
