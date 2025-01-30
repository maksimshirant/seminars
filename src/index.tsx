import React from 'react';
import ReactDOM from 'react-dom/client';
import ParamEditor from './ParamEditor';


const params = [
  { id: 1, name: 'Назначение', type: 'string' },
  { id: 2, name: 'Длина', type: 'string' },
  { id: 3, name: 'Артикул', type: 'string' }
];

const model = {
  paramValues: [
    { paramId: 1, value: 'Повседневное' },
    { paramId: 2, value: 'Максимальная' },
    { paramId: 3, value: '1241241' }
  ],
  colors: ["красный", "синий", "зеленый"]
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ParamEditor params={params} model={model} />
);

