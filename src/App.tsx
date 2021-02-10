import React, { useState } from 'react'
import Picker from './Picker';

const columns = [
  {
    label: '浙江',
    value: '浙江',
    children: [
      {
        label: '杭州',
        value: '杭州',
        children: [{ label: '西湖区', value: '西湖区' }, { label: '余杭区', value: '余杭区' }],
      },
      {
        label: '温州',
        value: '温州',
        children: [{ label: '鹿城区', value: '鹿城区' }, { label: '瓯海区', value: '瓯海区' }],
      },
      {
        label: '宁波',
        value: '宁波',
        children: [{ label: '余姚区', value: '余姚区' }],
      },
    ],
  },
  {
    label: '福建',
    value: '福建',
    children: [
      {
        label: '福州',
        value: '福州',
        children: [{ label: '鼓楼区', value: '鼓楼区' }, { label: '台江区', value: '台江区' }],
      },
      {
        label: '厦门',
        value: '厦门',
        children: [{ label: '思明区', value: '思明区' }, { label: '海沧区', value: '海沧区' }],
      },
    ],
  },
];

const App = () => {
  const [value, setValue] = useState(['浙江', '温州', '鹿城区']);
  return (
    <div style={{ display: 'flex', height: 120, overflow: 'hidden', border: '1px solid' }}>
      <Picker columns={columns} value={value} onChange={setValue} />
    </div>
  )
}

export default App
