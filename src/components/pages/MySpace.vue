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
      <!-- ============ Window: pfp ============ -->
      <div class="profile-container area-left">
        <div class="profile-info">
          <h1>Vincent Molenaar</h1>
          <div class="pfp-info">
            <img src="../../assets/myspace/pfp.JPEG" alt="Profile Picture" />
            <div>
              <div style="font-size: 15px">"Hello, World! :)"</div>
              <br />
              <h2>Male</h2>
              <h2>23 years old</h2>
              <p>
                Denmark, Copenhagen <br />
                Amager
              </p>
              <div class="online-status">
                <img src="../../assets/myspace/online.png" />
                <div>Online Now!</div>
              </div>
              <br />
              <br />
              <div class="listening-status" v-if="listeningStatus">
                Listening to: <br />{{ listeningStatus }}
              </div>
            </div>
          </div>

          <div class="profile-url">
            MySpace URL:
            <br />
            https://millr.dev/apps/#/myspace
          </div>

          <!-- ============ Window: friend space ============ -->
          <div
            class="xp-window"
            style="margin: 0; border-radius: 3px 3px 3px 3px; border: 0px"
          >
            <div class="xp-body">
              <div class="friend-space">Vincent Molenaar's Friend Space</div>
              <br />
              <div style="font-weight: bold">
                Vincent Molenaar has
                <span style="color: red">130</span> Friends.
              </div>
              <br />
              <ul class="xp-tabs">
                <li class="active">Top 8</li>
              </ul>
              <div class="xp-tabpanel">
                <div class="top-8-grid">
                  <div class="friend-card">
                    <h2>Oliver Flinck (Rexiie)</h2>
                    <img
                      src="../../assets/myspace/olli.png"
                      class="friend-card-pfp"
                    />
                    <div class="online-status">
                      <img src="../../assets/myspace/online.png" />
                      <div style="font-weight: normal">Online Now!</div>
                    </div>
                  </div>

                  <div class="friend-card">
                    <h2>xX_shtaro_Xx</h2>
                    <img
                      src="../../assets/myspace/shtaro.png"
                      class="friend-card-pfp"
                    />
                  </div>

                  <div class="friend-card">
                    <h2>Oliver Flinck (Rexiie)</h2>
                    <img
                      src="../../assets/myspace/olli.png"
                      class="friend-card-pfp"
                    />
                    <div class="online-status">
                      <img src="../../assets/myspace/online.png" />
                      <div style="font-weight: normal">Online Now!</div>
                    </div>
                  </div>

                  <div class="friend-card">
                    <h2>Oliver Flinck (Rexiie)</h2>
                    <img
                      src="../../assets/myspace/olli.png"
                      class="friend-card-pfp"
                    />
                    <div class="online-status">
                      <img src="../../assets/myspace/online.png" />
                      <div style="font-weight: normal">Online Now!</div>
                    </div>
                  </div>

                  <div class="friend-card">
                    <h2>Oliver Flinck (Rexiie)</h2>
                    <img
                      src="../../assets/myspace/olli.png"
                      class="friend-card-pfp"
                    />
                    <div class="online-status">
                      <img src="../../assets/myspace/online.png" />
                      <div style="font-weight: normal">Online Now!</div>
                    </div>
                  </div>

                  <div class="friend-card">
                    <h2>Oliver Flinck (Rexiie)</h2>
                    <img
                      src="../../assets/myspace/olli.png"
                      class="friend-card-pfp"
                    />
                    <div class="online-status">
                      <img src="../../assets/myspace/online.png" />
                      <div style="font-weight: normal">Online Now!</div>
                    </div>
                  </div>

                  <div class="friend-card">
                    <h2>Oliver Flinck (Rexiie)</h2>
                    <img
                      src="../../assets/myspace/olli.png"
                      class="friend-card-pfp"
                    />
                    <div class="online-status">
                      <img src="../../assets/myspace/online.png" />
                      <div style="font-weight: normal">Online Now!</div>
                    </div>
                  </div>

                  <div class="friend-card">
                    <h2>Oliver Flinck (Rexiie)</h2>
                    <img
                      src="../../assets/myspace/olli.png"
                      class="friend-card-pfp"
                    />
                    <div class="online-status">
                      <img src="../../assets/myspace/online.png" />
                      <div style="font-weight: normal">Online Now!</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ============ Window: posts ============ -->
      <div class="xp-window area-main">
        <div class="xp-titlebar">
          <span class="xp-title">Vincent's Blurbs</span>
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

      <!-- ============ Window: Music player ============ -->
      <div class="music-window">
        <div class="profile-container">
          <h1>Some of my favourite songs atm! :D</h1>
        </div>
        <player
          @listening-status="listeningStatus = $event"
          :playlist="songs"
          class="area-bottom"
        ></player>
      </div>

      <!-- ============ Window: Photo Slidehow ============ -->
      <div class="xp-window area-topright slideshow">
        <div class="xp-titlebar">
          <span class="xp-title"> Photo Slidehow </span>
          <div class="xp-controls">
            <button class="min" aria-label="Minimize"></button>
            <button class="max" aria-label="Maximize"></button>
            <button class="close" aria-label="Close"></button>
          </div>
        </div>

        <div class="xp-body">
          <slideshow></slideshow>
        </div>
      </div>

      <!-- ============ Window: chat ============ -->
      <div class="xp-window msn-blue area-bottomright" ref="chat">
        <div class="xp-titlebar">
          <span class="xp-title">Chat - Oliver Flinck (Rexiie)</span>
          <div class="xp-controls">
            <button class="min" aria-label="Minimize"></button>
            <button class="max" aria-label="Maximize"></button>
            <button class="close" aria-label="Close"></button>
          </div>
        </div>
        <div class="xp-banner">
          <h1 class="prevent-select">chats</h1>
          <span class="tool prevent-select">Contacts</span>
          <span class="tool prevent-select">Nudge</span>
          <span class="tool prevent-select">Help</span>
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
                      >xX_shtaro_Xx</span
                    ><span class="status"
                      >listen to my beat :) beat.mp3</span
                    ></span
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
                    ><span class="name" style="color: #2a7a1a"
                      >Peter (Shonix)</span
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
                    ><span class="name" style="color: #c26a00">gert</span
                    ><span class="status">&lt;3</span></span
                  >
                </li>
              </ul>
              <br />
              <div class="nowplaying">
                <span class="cover"
                  ><img
                    src="/src/assets/myspace/after-cover.png"
                    alt="Now Playing"
                /></span>
                <span
                  >Oliver Flinck (Rexiie) is listening to:<br /><b
                    >Blow Out the Candle - After</b
                  ></span
                >
              </div>
            </div>

            <!-- Conversation -->
            <div>
              <div class="xp-panel">
                <div class="xp-panel-header">
                  <span class="avatar lg"
                    ><img src="/src/assets/myspace/olli.png" alt="Avatar"
                  /></span>
                  <span
                    ><span class="who">Oliver Flinck (Rexiie)</span><br /><span
                      class="msg"
                      >(Away) - I love music! &lt;3</span
                    ></span
                  >
                </div>
                <div class="chat">
                  <div class="bubble them">
                    heya, did you apply for Tietgen yet?
                  </div>
                  <div class="bubble me">working on it as we speak! :P</div>
                  <div class="bubble them">
                    aws!! wanna join codiing night later? :D
                  </div>
                  <div class="bubble them">*coding... epic fail XD</div>
                  <div class="bubble me">LOL! omg yes ;)</div>
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
    </div>
  </div>
</template>

<script>
import "../emoticons.js";
import Player from "/src/components/myspace/Player.vue";
import Slideshow from "/src/components/myspace/Slideshow.vue";
import freestyler from "../../assets/myspace/freestyler.mp3";
import after from "../../assets/myspace/after.mp3";
import ripples from "../../assets/myspace/ripples.mp3";
import script from "../../assets/myspace/script.mp3";
import todd from "../../assets/myspace/todd.mp3";
import keane from "../../assets/myspace/keane.mp3";

export default {
  name: "MyPage",

  components: {
    Player,
    Slideshow,
  },

  data() {
    return {
      searchField: "",
      searchType: "web",
      listeningStatus: "",
      songs: [
        {
          title: "Freestyler",
          artist: "Bomfunk MC's",
          src: freestyler,
        },
        {
          title: "300 dreams",
          artist: "After",
          src: after,
        },
        {
          title: "Ripples",
          artist: "beabadoobee",
          src: ripples,
        },
        {
          title: "Everybody's Changing",
          artist: "Keane",
          src: keane,
        },
        {
          title: "The Man Who Can't Be Moved",
          artist: "The Script",
          src: script,
        },
        {
          title: "X's & O's",
          artist: "Malcolm Todd",
          src: todd,
        },
      ],
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
