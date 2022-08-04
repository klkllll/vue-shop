<template>
  <div class="pagination">
    <button @click="$emit('gotoPageNo', pageNo - 1)" :disabled="pageNo == 1">
      上一页
    </button>
    <!-- 左边 -->
    <button
      v-if="continuesStartAndEnd.start > 1"
      @click="$emit('gotoPageNo', 1)"
    >
      1
    </button>
    <button v-if="continuesStartAndEnd.start > 2">···</button>

    <!-- 中间部分 -->
    <button
      v-for="(page, index) in continuesStartAndEnd.end"
      :key="index"
      v-show="page >= continuesStartAndEnd.start"
      @click="$emit('gotoPageNo', page)"
    >
      {{ page }}
    </button>
    <!-- 右边 -->
    <button v-if="continuesStartAndEnd.end < totalPage - 1">···</button>
    <button
      v-if="continuesStartAndEnd.end < totalPage"
      @click="$emit('gotoPageNo', totalPage)"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('gotoPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 总页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 连续页码的起始和结束页数
    continuesStartAndEnd() {
      let start = 0;
      let end = 0;

      console.log(this.continues);
      // 总页数少于连续页码数
      if (this.continues > this.totalPage) {
        start = 1;
        end = this.totalPage;
      } else {
        start = this.pageNo - parseInt(this.continues / 2);
        end = this.pageNo + parseInt(this.continues / 2);
        // 排除start 为 -1、0 的情况
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        // 排除end大于总页数
        if (end > this.totalPage) {
          end = this.totalPage;
          start = this.totalPage - this.continues + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>