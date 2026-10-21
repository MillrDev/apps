<template>
  <div class="xp-theme">
    <header class="header">
      <div class="logo-container prevent-select">
        <img
          src="/src/assets/myspace/myspace-favicon.png"
          alt="MySpace Logo"
          style="width: 45px; height: 45px"
        />
        <div class="logo">
          <h1>myspace.com</h1>
          <h3>a place for friends</h3>
        </div>
      </div>

      <div class="divider"></div>

      <div>
        <label for="2" class="prevent-select">MySpace</label>
        <input
          type="radio"
          name="search"
          id="2"
          v-model="searchType"
          value="myspace"
        />
      </div>

      <div>
        <label for="1" class="prevent-select">The Web</label>
        <input
          type="radio"
          name="search"
          id="1"
          v-model="searchType"
          value="web"
        />
      </div>

      <input type="text" v-model="searchField" />
      <button @click="search">Search</button>
      <img src="../../assets/myspace/google.png" alt="Google" />

      <div style="display: flex; width: 30px"></div>

      <div class="prevent-select">Sign Up</div>
    </header>

    <div ref="root" class="root">
      <!-- ============ Window 1: chat ============ -->
      <div class="xp-window msn-blue" ref="chat">
        <div class="xp-titlebar">
          <span class="xp-title">Chat - Oliver Flink (Rexiie)</span>
          <div class="xp-controls">
            <button class="min" aria-label="Minimize"></button>
            <button class="max" aria-label="Maximize"></button>
            <button class="close" aria-label="Close"></button>
          </div>
        </div>
        <div class="xp-banner">
          <h1>my page</h1>
          <span class="tool">Contacts</span>
          <span class="tool">Nudge</span>
          <span class="tool">Help</span>
        </div>

        <div class="xp-body">
          <div class="xp-cols">
            <!-- Contact list (works as a "Top 8") -->
            <div>
              <ul class="contacts">
                <li>
                  <span class="avatar">A</span
                  ><span
                    ><span class="name" style="color: #1a1a8c"
                      >*~*cool_coder*~*</span
                    ><span class="status">:)</span></span
                  >
                </li>
                <li>
                  <span
                    class="avatar"
                    style="
                      background: linear-gradient(135deg, #f08ac0, #b03a80);
                    "
                    >P</span
                  ><span
                    ><span class="name" style="color: #a02a8a"
                      >[OooO] Princess</span
                    ><span class="status">listening to music... brb</span></span
                  >
                </li>
                <li>
                  <span
                    class="avatar"
                    style="
                      background: linear-gradient(135deg, #7cc934, #38700d);
                    "
                    >G</span
                  ><span
                    ><span class="name" style="color: #2a7a1a">game_night</span
                    ><span class="status">who's in? ;)</span></span
                  >
                </li>
                <li>
                  <span
                    class="avatar"
                    style="
                      background: linear-gradient(135deg, #ffc066, #a34d00);
                    "
                    >F</span
                  ><span
                    ><span class="name" style="color: #c26a00">friday_bar</span
                    ><span class="status">&lt;3</span></span
                  >
                </li>
              </ul>
              <br />
              <div class="nowplaying">
                <span class="cover"></span>
                <span
                  >Alex :D is listening to:<br /><b>Some Song Title</b></span
                >
              </div>
            </div>

            <!-- Conversation -->
            <div>
              <div class="xp-panel">
                <div class="xp-panel-header">
                  <span class="avatar lg">A</span>
                  <span
                    ><span class="who">Alex :D</span><br /><span class="msg"
                      >(Away) - I love music! &lt;3</span
                    ></span
                  >
                </div>
                <div class="chat">
                  <div class="bubble them">hey wats up?</div>
                  <div class="bubble me">not much, hbu? :P</div>
                  <div class="bubble them">
                    want to join our coding night? :D
                  </div>
                  <div class="bubble me">omg yes ;)</div>
                  <div class="bubble them">:)</div>
                </div>
              </div>
              <br />
              <textarea placeholder="Type a message..."></textarea>
              <p style="margin: 6px 0 0; text-align: right">
                <button @click="nudge()">Nudge!</button>
                <input type="submit" value="Send" />
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- ============ Window 2: controls ============ -->
      <div class="xp-window">
        <div class="xp-titlebar">
          <span class="xp-title">Form controls</span>
          <div class="xp-controls">
            <button class="min" aria-label="Minimize"></button>
            <button class="max" aria-label="Maximize"></button>
            <button class="close" aria-label="Close"></button>
          </div>
        </div>
        <div class="xp-body">
          <ul class="xp-tabs">
            <li class="active">About me</li>
            <li>Top 8</li>
            <li>Contact</li>
          </ul>
          <div class="xp-tabpanel">
            <fieldset>
              <legend>Profile</legend>
              <p>
                <label
                  >Name<br /><input
                    type="text"
                    size="30"
                    placeholder="Your name"
                /></label>
              </p>
              <p>
                <label
                  >Mood<br />
                  <select>
                    <option>Happy :)</option>
                    <option>Chill</option>
                    <option>Caffeinated</option>
                  </select>
                </label>
              </p>
              <p>
                <label><input type="checkbox" checked /> I like coding</label
                ><br />
                <label><input type="checkbox" /> I like early mornings</label>
              </p>
              <p>
                <label><input type="radio" name="r" checked /> Sofa</label>
                <label><input type="radio" name="r" /> Kitchen</label>
              </p>
            </fieldset>

            <p>
              <button>OK</button>
              <button>Cancel</button>
              <button class="xp-btn default">Apply</button>
              <span class="badge">NEW!</span>
            </p>

            <div class="progress"><span style="width: 65%"></span></div>
            <br />
            <table>
              <tr>
                <th>#</th>
                <th>Thing I will bring</th>
              </tr>
              <tr>
                <td>1</td>
                <td>Coding nights</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Waffles on Sundays :D</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Board games 8)</td>
              </tr>
            </table>
            <p>Emoticons: :) :D :P ;) :( :O 8) &lt;3</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../emoticons.js";

export default {
  name: "MyPage",
  data() {
    return {
      searchField: "",
      searchType: "web",
    };
  },
  mounted() {
    window.Emoticons.parse(this.$refs.root);
  },
  methods: {
    nudge() {
      const w = this.$refs.chat;
      w.classList.remove("nudge");
      void w.offsetWidth;
      w.classList.add("nudge");
    },
    search() {
      if (this.searchType === "web") {
        window.location.href = `https://google.com/search?q=${this.searchField}`;
      } else {
        window.location.href = "https://myspace.com/";
      }
    },
  },
};
</script>

<style scoped src="../../assets/myspace/myspace-style.css"></style>
