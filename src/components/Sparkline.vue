<template>
  <svg
    class="sparkline"
    :width="width"
    :height="height + 20"
    :stroke-width="stroke"
  >
    <g>
      <path
        class="sparkline--line"
        :d="shape"
        fill="none"
      />
      <path
        class="sparkline--fill"
        :d="[shape, fillEndPath].join(' ')"
        stroke="none"
      />
      <text
        v-for="(point, index) in coordinates"
        :key="index"
        :x="point.x"
        :y="point.y - 10"
        class="sparkline--label"
      >
        {{ data[index] }}°
      </text>
    </g>
    <g>
      <text
        v-for="(point, index) in bottomLabelCoordinates"
        :key="'bottom-' + index"
        :x="point.x"
        :y="height + 20"
        class="sparkline--label sparkline--bottom-label"
      >
        {{ point.label }}
      </text>
    </g>
  </svg>
</template>

<script>
import { ref, computed } from "vue";

export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const stroke = ref(3);
    const width = ref(420);
    const height = ref(80); // Increased the height to 120

    const coordinates = computed(() => {
      const data = props.data || [];
      const highestPoint = Math.max(...data);
      const points = [];
      const totalPoints = data.length - 1;

      data.forEach((item, n) => {
        const x = (n / totalPoints) * width.value + stroke.value;
        const y =
          height.value - (item / highestPoint) * height.value + stroke.value;

        points.push({ x, y });
      });

      return points;
    });

    const bottomLabelCoordinates = computed(() => {
      const totalPoints = props.data.length;
      const labels = [];

      coordinates.value.forEach((point, index) => {
        const x = point.x;
        const label = ((index * (totalPoints - 1)) / (totalPoints - 1)).toFixed(0);
        labels.push({ x, label });
      });

      return labels;
    });

    const shape = computed(() => {
      if (!coordinates.value[0]) {
        return (
          "M 0 " +
          stroke.value +
          " L 0 " +
          stroke.value +
          " L " +
          width.value +
          " " +
          stroke.value
        );
      }

      const path = [];

      coordinates.value.forEach((point) =>
        path.push(["L", point.x, point.y].join(" "))
      );

      return ["M" + coordinates.value[0].x, coordinates.value[0].y, ...path].join(
        " "
      );
    });

    const fillEndPath = computed(
      () => `V ${height.value} L 4 ${height.value} Z`
    );

    return {
      stroke,
      width,
      height,
      shape,
      fillEndPath,
      coordinates,
      bottomLabelCoordinates,
    };
  },
};
</script>

<style lang="sass" scoped>
svg
  stroke: #1f8ceb
  fill: rgba(31, 140, 235, 0.06)
  transition: all 1s ease-in-out

svg path
  box-sizing: border-box

.sparkline--label
  font-size: 12px
  stroke: none
  fill: initial

.sparkline--bottom-label
  text-anchor: middle
  stroke: none
  fill: initial

</style>

