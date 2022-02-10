<template>
  <div>
    <button @click="websockGetData()">mockAdd</button>
    <button @click="removeChild()">remove</button>
    <div ref="container" id="container" class="container"></div>
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
      removeChildInterval: null, // 移除项定时器
    };
  },
  methods: {
    websockGetData() {
      this.generateData();
      const elementCount = this.$refs.container.childElementCount;

      if (this.removeChildInterval === null && elementCount) {
        this.removeChildInterval = setInterval(() => { this.removeChild(); }, 3000);
      }
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
      if (elementCount <= 5) {
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
      const obj = this.$refs.container;
      const elementCount = this.$refs.container.childElementCount;
      console.log('removeChild', elementCount, this.unshownArr.length);

      // 容器内节点数为 0时，且没有要添加的元素时，停止定时器
      if (elementCount === 0 && this.unshownArr.length === 0 && this.removeChildInterval) {
        window.clearInterval(this.removeChildInterval);
        this.removeChildInterval = null;
        console.log('clearInterval');
      }
      // 添加进新的一个元素等待上移
      if (this.unshownArr.length > 0) {
        const item = this.unshownArr[0];
        const tInnerHtml = `<div class="item" id="panelItem${item.id}" style="top:600px;">id:${item.id}  name: ${item.name}</div>`;

        this.$refs.container.insertAdjacentHTML('beforeend', tInnerHtml);
        this.unshownArr.shift();
      }
      if (obj.children.length > 0) {
        // 第一个在视觉上消失
        obj.children[0].style = 'top:0;animation: 1s linear 0s running itemDisappear;';
        // 整体上移
        setTimeout(() => {
          // 移除最上面的那一个真实 DOM 节点
          obj.children[0].remove();
          for (let i = 0; i < obj.children.length; i++) {
            const ele = obj.children[i];
            ele.style = `transition: transform 1s;transform: translateY(${-600 + (i * 125)}px);`;
          }
        }, 900);
      }
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

@keyframes itemDisappear {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
