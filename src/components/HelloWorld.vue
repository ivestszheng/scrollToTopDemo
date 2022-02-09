<template>
  <div>
    <button @click="websockGetData()">mock</button>
    <div ref="container" class="container"></div>
  </div>
</template>

<script>

export default {
  name: 'ScrollToTop',
  data() {
    return {
      newIncreaingSet: new Set(), // 所有新增集合
      unshownArr: [], // 未展示的新增元素集合
      cssVars: {
        containerDetails: { height: 600 },
        itemDetails: { height: 100 },
      },
      n: 0,
      isAddDuration: false, // 如果在新增则不执行向上滚动画
    };
  },
  methods: {
    websockGetData() {
      this.generateData();
    },
    generateData() {
      this.n = this.n + 1;
      let mockData = [];
      switch (this.n) {
        case 1:
          mockData = [
            { id: 1, name: 'wush1' },
          ];
          break;
        case 2:
          mockData = [
            { id: 2, name: 'wush2' },
            { id: 3, name: 'wush3' },
            { id: 4, name: 'wush4' },
            { id: 5, name: 'wush5' },
            { id: 6, name: 'wush6' },
            { id: 7, name: 'wush7' },
          ];
          break;
        case 3:
          mockData = [
            { id: 8, name: 'wush8' },
            { id: 9, name: 'wush9' },
            { id: 10, name: 'wush10' },
          ];
          break;
        case 4:
          mockData = [
            { id: 11, name: 'wush11' },
            { id: 12, name: 'wush12' },
            { id: 13, name: 'wush13' },
          ];
          break;
        default:
          break;
      }
      mockData.forEach((item) => {
        if (item.id && this.newIncreaingSet.has(item.id) === false) {
          this.newIncreaingSet.add(item.id);
          this.addDomToContainer(item);
        }
      });
    },
    addDomToContainer(item) {
      const elementCount = this.$refs.container.childElementCount;
      if (elementCount < 5) {
        const tInnerHtml = `<div class="item" id="panelItem${item.id}" style="top:600px;">id:${item.id}  name: ${item.name}</div>`;

        this.$refs.container.insertAdjacentHTML('beforeend', tInnerHtml);
        setTimeout(() => {
          document.querySelector(`#panelItem${item.id}`).style = `transition: transform 2s;transition-delay: ${elementCount * 0.5}s;transform: translateY(${-600 + (elementCount * 125)}px);`;
        }, 0);
      } else {
        this.unshownArr.push(item);
        console.log('len > 5', this.unshownArr);
      }
    },
    removeChild() {
      // 将最上方的节点移除

    },
  },
};
</script>

<style>
.container {
  width: 800px;
  height: 600px;
  border: 1px solid gray;
  overflow: hidden;
  position: relative;
}
.item {
  width: 600px;
  height: 100px;
  background: goldenrod;
  position: absolute;
  top: 600px;
}
</style>
