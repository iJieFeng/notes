<template>
  <div class="total-sales-container">
    <common-card title="累计销售额" value="32,039,652">
      <template v-slot:chart>
        <div class="percent">
          <div>
            <span>日同比</span>
            <span>7.3%</span>
          </div>
          <div>
            <span>月同比</span>
            <span>9.1%</span>
          </div>
        </div>
      </template>
    </common-card>
  </div>
</template>

<script>
import commonCardMixin from "../../mixins/commonCardMixin";

export default {
  mixins: [commonCardMixin],
};
</script>

<style lang="scss" scoped>
.percent {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > div {
    display: flex;
    align-items: center;
    &:nth-child(1)::after {
      content: "";
      width: 0;
      height: 0;
      border-width: 6px;
      border-style: solid;
      border-color: transparent transparent red transparent;
      margin-bottom: 6px;
      margin-left: 6px;
    }
    &:nth-child(2)::after {
      content: "";
      width: 0;
      height: 0;
      border-width: 6px;
      border-style: solid;
      border-color: green transparent transparent transparent;
      margin-top: 6px;
      margin-left: 6px;
    }
  }
}
</style>
