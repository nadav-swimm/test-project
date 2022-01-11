<template>
  <section
    class="stats
          wrapper
          flex
          flex-align-center
          row
          cb-content
          cb-background-primary
          "
  >
    <ul class="flex row stats__container cb-site-width">
      <li class="flex col">
        <cb-text
          huge
          bold
          center
        >
          1M+
        </cb-text>
        <cb-text
          normal
          center
        >
          Google forms turned to interactive chat bots
        </cb-text>
      </li>

      <li class="flex col">
        <cb-text
          huge
          center
          bold
        >
          15M+
        </cb-text>
        <cb-text
          normal
          center
        >
          chat-forms unique conversations
        </cb-text>
      </li>

      <li class="flex col">
        <cb-text
          huge
          bold
          center
        >
          50%
        </cb-text>
        <cb-text
          normal
          center
        >
          increase in form submission by your audience
        </cb-text>
      </li>

      <li class="flex col">
        <cb-text
          huge
          bold
          center
        >
          80%
        </cb-text>
        <cb-text
          normal
          center
        >
          increase in users experiance ranking
        </cb-text>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
}
</script>

<style lang="scss" scoped>
.stats{
  height: 185px;
  .stats__container cb-site-width {
    flex: 1;
    justify-content: stretch;
    align-items: flex-start;
    >li {
      flex: 1;

      padding: 0 20px;
    }
  }
  * {
  color: #fff;
  }
}
@media only screen and (max-width: $ipad) {
.stats{
  height: auto;
  padding: 0 !important;
  .stats__container {
    flex-wrap: wrap;
    > li {
      width: 50%;
      height: 200px;
      border: 1px solid rgba(255,255,255, 0.05);
      padding-top: 30px;
      padding-left: 10px;
      padding-right: 10px;
      flex: auto;
    }
    br {
      display: none;
    }
    .normal {
      font-size: 16px;
      max-width: 220px;
      align-self: center;
    }
  }
}
}

@media only screen and (min-width: $mobile) and (max-width: $ipad) {
  .stats{

  }
}
</style>
