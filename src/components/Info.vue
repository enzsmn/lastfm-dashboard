<template>
  <small>Refreshed {{ difference }} seconds ago</small>
</template>

<script>
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export default {
  name: "Info",
  props: ["sync"],
  data() {
    return {
      timer: null,
      difference: 0
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      this.difference = dayjs().diff(dayjs.unix(this.sync), "second");
    }, 1000);
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>
