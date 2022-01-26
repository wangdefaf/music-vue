<template>
  <div class="LoadingCont">
    <div class="playerProgress">
      <div class="left">
        <div class="inner"></div>
      </div>
      <div class="right">
        <div class="inner"></div>
      </div>
    </div>
    <svg class="video_player_loading__logo">
      <use href="#video_player_loading"></use>
    </svg>
  </div>
</template>

<script>
export default {
  name: "loading",
}
</script>

<style scoped>
.playerProgress {
  position: relative;
  width: 58px;
  height: 58px;
  border: 3px solid rgba(255, 255, 255, .1);
  border-radius: 50%;
  box-sizing: border-box;
  margin: 22px auto 0
}

.left, .right {
  position: absolute;
  width: 29px;
  height: 58px;
  top: -3px;
  overflow: hidden
}

.left {
  left: -3px
}

.right {
  right: -3px
}

.inner {
  width: 58px;
  height: 58px;
  position: absolute;
  right: 0;
  top: 0;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 1);
  box-sizing: border-box;
  transition: transform .5s linear
}

.left .inner {
  left: 0;
  transition-delay: .5s;
  clip: rect(0, 58px, 58px, 29px)
}

.right .inner {
  right: 0;
  clip: rect(0, 29px, 58px, 0)
}

.Loading {
  position: absolute;
  left: 0;
  top: 0;
  display: table;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  box-sizing: border-box;
  padding: 0 3.33333%;
  z-index: 2
}

.LoadingCont {
  display: table-cell;
  vertical-align: middle;
  font-size: 0;
  margin: 0 200px
}

.video_player_loading__logo {
  display: block;
  width: 88px;
  height: 88px;
  fill: #fff;
  margin: -93px auto 80px;
  animation: playerLoad 1.2s infinite ease-in-out
}

.playerProgress {
  width: 98px;
  height: 98px;
  border-width: 6px;
  animation: playerCircle 1.2s infinite ease-in-out
}

.playerProgress .left, .playerProgress .right {
  width: 49px;
  height: 98px;
  top: -6px
}

.playerProgress .left {
  left: -6px
}

.playerProgress .right {
  right: -6px
}

.playerProgress .inner {
  transition: none;
  width: 98px;
  height: 98px;
  border-width: 6px;
  border-color: #2caf6f;
}

.playerProgress .left .inner {
  clip: rect(0, 98px, 98px, 49px)
}

.playerProgress .right .inner {
  clip: rect(0, 49px, 98px, 0);
  animation: playerCircleShow 1.2s infinite linear
}

@keyframes playerLoad {
  0%, 100% {
    opacity: .2
  }
  47%, 53% {
    opacity: .6
  }
}

@keyframes playerCircle {
  0% {
    transform: scaleX(-1) rotate(0) translateZ(0)
  }
  100% {
    transform: scaleX(-1) rotate(180deg) translateZ(0)
  }
}

@keyframes playerCircleShow {
  0% {
    transform: rotate(0) translateZ(0)
  }
  45%, 55% {
    transform: rotate(100deg) translateZ(0)
  }
  100% {
    transform: rotate(360deg) translateZ(0)
  }
}
</style>