<template>
  <a :href="`https://www.last.fm/user/${username}/`" target="_blank">
    <div>
      <span>Yesterday</span>
      <span>{{ tracksYesterday }}</span>
    </div>
    <div>
      <span>Today</span>
      <span>{{ tracksToday }}</span>
    </div>
  </a>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "TodayYesterday",
  props: {
    plays: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      username: process.env.VUE_APP_LAST_FM_USER
    };
  },
  computed: {
    tracksYesterday() {
      const yesterday = dayjs()
        .subtract(1, "day")
        .format("YYYY-MM-DD");
      const plays = this.plays.find(p => p.date === yesterday);
      return plays ? plays.count : 0;
    },
    tracksToday() {
      const today = dayjs().format("YYYY-MM-DD");
      const plays = this.plays.find(p => p.date === today);
      return plays ? plays.count : 0;
    }
  }
};
</script>
