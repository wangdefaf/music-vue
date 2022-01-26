<template>
  <div class="More">
    <p>查看更多内容，请下载客户端</p>
    <a class="MoreButton" href="https://y.qq.com/download/download.html">
      <span>立即下载</span>
    </a>
  </div>

</template>

<script>
export default {
  name: "more"
}
</script>

<style lang="scss" scoped>
.More {
  text-align: center;

  p {
    margin: 40px 0 20px;
    font-size: 18px;
    color: #000;
  }

  .MoreButton {
    display: inline-block;
    text-align: center;
    width: 175px;
    height: 41px;
    border-radius: 30px;
    line-height: 41px;
    background: #31c27c;
    color: #fff;
    text-decoration: none;
    margin-bottom: 30px;

    span {
      font-size: 16px;
    }
  }

  .button:hover {
    background: #2caf6f;
  }
}
</style>