<template>
  <div class="item">
    <div>这是===={{ modelMsg }}</div>
    <input type="text" v-model="welInput"/>
    <div>
      <div>第二种方法实现组件上的v-model</div>
    </div>
    <i>
      <slot name="icon"></slot>
    </i>
    <div class="details">
      <h3>
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    modelMsg: String,
    modelModifiers: {
      default: () => {}
    },
    propE: {
      type: Object,
      default: function() {
        console.log(this)
        return { myq: '000' }
      }
    }
  },
  computed: {
    welInput: {
      get() {
        return this.modelMsg;
      },
      set(val: string) {
        this.$emit('update:modelMsg', val)
      }
    }
  },
  emits: ['update:modelMsg'],
  mounted() {
    console.log(this.modelModifiers)
  },
  methods: {
    handleInput(event: Event) {
      this.$emit('update:modelMsg', (event.target as HTMLInputElement).value)
    }
  }

})
</script>

<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
}

.details {
  flex: 1;
  margin-left: 1rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;

  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: " ";
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: " ";
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
