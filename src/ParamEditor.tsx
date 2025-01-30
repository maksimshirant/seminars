import React, { useState } from "react";
import './style.css';

interface Param {
  id: number;
  name: string;
  type: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: string[];
}

interface Props {
  params: Param[];
  model: Model;
}

const ParamEditor: React.FC<Props> = ({ params, model }) => {
  const [paramValues, setParamValues] = useState<ParamValue[]>(model.paramValues);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleInputChange = (id: number, newValue: string) => {
    const updatedParamValues = paramValues.map((param) =>
      param.paramId === id ? { ...param, value: newValue } : param
    );
    setParamValues(updatedParamValues);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(event.target.value);
  };

  const getModel = (): Model => {
    return {
      paramValues,
      colors: selectedColor ? [selectedColor] : []
    };
  };

  return (
    <div className="param-editor">
      <h2>Редактор параметров товара</h2>
      {params.map((param) => {
        const currentValue = paramValues.find((value) => value.paramId === param.id)?.value || "";

        return (
          <div className="param-item" key={param.id}>
            <label>{param.name}</label>
            <input
              type="text"
              value={currentValue}
              onChange={(e) => handleInputChange(param.id, e.target.value)}
            />
          </div>
        );
      })}

      {model.colors.length > 0 && (
        <div className="param-item">
          <label>Выберите цвет</label>
          <select className="param-editor1" onChange={handleColorChange} value={selectedColor || ""}>
            <option value="">Выберите цвет</option>
            {model.colors.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
      )}

      <button onClick={() => console.log(getModel())}>Получить модель</button>
    </div>
  );
};

export default ParamEditor;
