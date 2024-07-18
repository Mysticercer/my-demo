<template>
  <section class="cc-table">
    <el-table
      :cell-style="cellStyle"
      :data="tableData"
      :row-key="rowKey"
      :row-class-name="rowClass"
      @selection-change="handleSelectionChange"
      header-align="center"
      :span-method="spanMethod"
      :default-sort="{ order: 'descending' }"
      @row-click="handleRowClick"
      @sort-change="handleSortChange"
      @select="handleTableSelect"
      height="100%"
      stripe
      :border="false"
      ref="ccTable"
    >
      <el-table-column
        v-if="selectionArr"
        :reserve-selection="rowKey !== ''"
        :selectable="selectable"
        type="selection"
        width="55"
      />

      <el-table-column
        v-if="hasIndex"
        type="index"
        label="序号"
        align="center"
        width="60"
        :fixed="indexFixed"
      />

      <template v-for="item in tableColumn">
        <slot :name="item.slot" v-if="item.slot"></slot>

        <el-table-column
          v-else-if="item.type === 'index'"
          align="center"
          :label="item.label"
          :key="item.label + 'index'"
          type="index"
          width="60"
        />

        <el-table-column
          :resizable="true"
          :formatter="item.formatter || defaultFormatter"
          :key="item.prop"
          :label="item.label"
          :sortable="item.sortable"
          :sort-by="setVal(item.sortBy, undefined)"
          :prop="item.prop"
          :fixed="item.fixed"
          :show-overflow-tooltip="setVal(item.tooltip, true)"
          :width="item.width"
          :min-width="item.minWidth"
          align="center"
          v-else
        >
        </el-table-column>
      </template>
    </el-table>
    <pagination
      v-if="hasPagination"
      v-model:total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      :pageSizes="queryParams.pageSizes"
      @pagination="handleQuery"
      :layout="pageLayout"
    />
  </section>
</template>

<script>
import pagination from './Pagination/index.vue'
export default {
  name: 'cc-table',
  props: {
    tableData: { type: Array, required: true },
    tableColumn: { type: Array, required: true },

    // 是否添加序号列，默认不添加
    hasIndex: { type: Boolean, default: false },

    indexFixed: { type: Boolean, default: false },
    // 表格选中数组
    selectionArr: { type: Array },

    // 默认启用小型单元格
    isShortCell: { type: Boolean, default: true },

    // 行样式
    rowClass: { type: [String, Function], default: '' },

    // 行id
    rowKey: { type: String, default: '' },

    // 是否使用迷你分页，默认不适用
    isMiniPagination: { type: Boolean, default: false },
    // 是否使用分页器，默认不适用
    hasPagination: { type: Boolean, default: false },
    // 分页数据
    pageData: {
      type: Object,
      default() {
        return {
          total: 0,
          pageNum: 1,
          pageSize: 20
        }
      }
    },
    pageSizes: {
      type: Array,
      default() {
        return []
      }
    },
    cellStyle: { type: Function },
    isFixIndex: { type: Boolean },
    spanMethod: { type: Function },
    pageLayout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  setup(props, { emit }) {
    const total = ref(props.pageData.total)
    const queryParams = reactive({
      pageNum: props.pageData.pageNum,
      pageSize: props.pageData.pageSize,
      pageSizes: props.pageSizes
    })

    function handleQuery({ page, limit }) {
      emit('changePage', { pageNum: page, pageSize: limit })
    }
    return {
      total,
      queryParams,
      handleQuery
    }
  },
  methods: {
    defaultFormatter(row, column, cellValue, index) {
      if (_isArray(cellValue)) {
        return cellValue.length > 0 ? cellValue.join(',') : '--'
      }
      return cellValue || '--'
    },
    selectable(row) {
      return !row.disableSelect
    },
    handleSelectionChange(val) {
      this.$emit('update:selectionArr', val)
    },
    handleTableSelect(selection, val) {
      this.$emit('tableSelect', selection, val)
    },
    handleRowClick(row, column) {
      this.$emit('rowClick', row, column)
    },
    handleSortChange(obj) {
      this.$emit('sortChange', obj)
    },
    setVal(val, defaultVal = '') {
      return val ?? defaultVal
    },
    clearSelection() {
      this.$refs.ccTable.clearSelection()
    },
    setCurrentRow(row) {
      this.$refs.ccTable.toggleRowSelection(row)
    }
  },
  watch: {
    tableData: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.$refs.ccTable.doLayout()
        })
      }
    },
    'pageData.total': {
      deep: true,
      handler(newVal) {
        this.total = newVal
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cc-table {
  width: 100%;
  height: 100%;
  border: 0;
  display: flex;
  flex-direction: column;
  // background-color: #04314a;
  background-color: rgba($color: #000000, $alpha: 0.3);
  :deep(.el-table) {
    // .el-table--border .el-table__inner-wrapper::after{
    //   height: 0 !important;
    // }
    .el-table__inner-wrapper::before {
      content: none;
      height: 0 !important;
    }

    background: none;
    flex: 1;
    height: 0;
    tr,
    th,
    td {
      // background-color: transparent !important;
      background: none;
      color: $theme-font-color !important;
    }
    tr {
      background: rgba(36, 76, 120, 0.15);
      // background-color: rgb(4, 49, 74);
      // background-color: #05324d;
    }
    tr:hover > td.el-table__cell {
      background-color: hsla(0, 0%, 100%, 0.1) !important;
    }
    td,
    th.is-leaf {
      border: none;
    }
    td {
      .el-button {
        font-size: 24px;
        padding-top: 0;
        padding-bottom: 0;
      }
    }
    .el-table-column--selection {
      .cell {
        padding-left: 14px;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.cc-table {
  height: 100%;
}
.cc-table :deep(.el-table) {
  .el-table--striped .el-table__body tr.el-table__row--striped td,
  .el-table--striped .el-table__body tr.el-table__row--striped td {
    background: none;
  }
  .el-table--striped .el-table__body tr {
    background: rgba($color: #244c78, $alpha: 0.15);
  }
  .el-table--striped .el-table__body tr.el-table__row--striped {
    background: linear-gradient(
      to left,
      rgba($color: #244c78, $alpha: 0),
      rgba($color: #326091, $alpha: 0.3)
    );
  }
  .el-table__header {
    tr,
    th.el-table__cell {
      border: 1px solid transparent;
      background-color: rgb(3, 34, 50) !important;
    }
    th:hover {
      border-color: rgba($color: #fff, $alpha: 0.4) !important;
      // border-left: 1px solid rgba($color: #28a0d5, $alpha: 0.8);
      // border-right: 1px solid rgba($color: #28a0d5, $alpha: 0.8);
    }
  }
  .el-table__cell {
    padding: 6px 0;
  }
  .el-table td,
  .el-table th {
    padding: 12px 0;
  }

  .el-table__body .el-table__row.hover-row td,
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: rgba($color: #fff, $alpha: 0.1) !important;
    .cell {
      background-color: transparent !important;
    }
  }
  .el-table__body .el-table__row.hover-row td {
    // background-color: rgba($color: #fff, $alpha: 0.2) !important;
    .cell {
      // background-color: transparent !important;
      background: none;
    }
  }
  .el-table--border .el-table__inner-wrapper::after,
  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    height: 0 !important;
    content: none !important;
  }
  .el-checkbox__inner {
    background-color: rgb(79, 80, 102);
  }
  .el-table__fixed-right::before,
  .el-table__fixed::before {
    // background-color:;
    background: none;
  }
  .el-table--border,
  .el-table--group {
    border: none;
  }
  // 解决滚动条上方的白色横线bug
  .el-table--border th.gutter:last-of-type {
    border-color: transparent;
  }
  // 解决嵌套表头的边框问题
  .el-table--border th {
    border: 0;
  }

  // -----------------------分页
  .el-pager {
    li.active,
    li:hover {
      color: var(--font-active-color);
    }
  }
  .el-pager li.btn-quicknext,
  .el-pager li.btn-quickprev,
  .el-pagination .btn-next,
  .el-pagination .btn-prev {
    background-color: transparent;
    color: white;
  }

  .el-pager li.btn-quicknext:hover,
  .el-pager li.btn-quickprev:hover,
  .el-pagination button:hover {
    color: var(--font-active-color);
  }
  .el-pagination button:disabled {
    color: #999999;
  }
  .el-pagination__total,
  .el-pagination__jump {
    color: white;
  }
  .el-pagination {
    width: 100%;
    padding: 10px 0;
    color: white;
    .el-pager li {
      background-color: transparent;
    }
    text-align: center;
  }
  .el-select:hover .el-input__inner {
    border: 1px solid rgba($color: #00a8ff, $alpha: 0.8);
  }
  .el-table--striped .el-table__body tr.el-table__row--striped td,
  .el-table--striped .el-table__body tr.el-table__row--striped td {
    background-color: rgba($color: #005e88, $alpha: 0.15);
  }
  // -----------------------分页结束
}
:deep(.pagination) {
  display: flex;
  flex-direction: row-reverse;
  .el-pager {
    li {
      box-shadow: 0 0 0 1px var(--el-border-color) inset;
      background-color: rgba(0, 0, 0, 0);
      &.is-active {
        background-color: #015478 !important;
      }
    }
  }
  .btn-prev,
  .btn-next {
    box-shadow: 0 0 0 1px var(--el-border-color) inset;
    background-color: rgba(0, 0, 0, 0);
  }
}
</style>
