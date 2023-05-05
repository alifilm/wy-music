import { h } from 'vue';

const DynamicTit = (props: any, context: any) => {
  return h('div', 
    { class: 'bar' },
    [
      h('span', 'hello')
    ]
  )
}

DynamicTit.props = ['level']

export default DynamicTit;