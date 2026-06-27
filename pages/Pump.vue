<script>
import { supabase } from "./../src/supabase.js";

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
    async addPump() {
      const { data, error } = await supabase
        .from("pumps")
        .insert({ username: this.username, timestamp: new Date() })
        .select()
        .single();

      if (error) {
        console.error("Error adding pump:", error);
        return;
      }

      this.pumps.splice(0, 0, {
        id: this.pumps.length + 1,
        username: this.username,
        timestamp: new Date(),
      });
    },

    async setUsername(value) {
      const trimmed = value.trim();

      await supabase
        .from("users")
        .upsert({ username: trimmed }, { onConflict: "username" });

      this.username = trimmed;
      document.cookie = `username=${trimmed}; path=/; max-age=31536000`;
    },

    async loadPumps() {
      const { data, error } = await supabase
        .from("pumps")
        .select("*")
        .order("timestamp", { ascending: false });

      if (error) {
        console.error("Error loading pumps:", error);
        return;
      }

      this.pumps = data.map((pump) => ({
        ...pump,
        timestamp: pump.timestamp,
      }));
    },
  },

  mounted() {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("username="));
    if (cookie) {
      this.username = cookie.split("=")[1];
    }

    this.loadPumps();

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
      <h2 style="font-style: italic">Who can rock the most pumps?</h2>
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
    <h2 style="font-weight: bold">Pump Timeline</h2>
    <ul>
      <li v-for="pump in pumps" :key="pump.id">
        {{ pump.username }} has had a pump at
        {{ pump.timestamp.toLocaleString() }}
      </li>
    </ul>
  </article>
</template>
