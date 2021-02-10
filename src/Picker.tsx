import React, { FC, useEffect, useRef, useState } from 'react'
import './Picker.css';

interface Column {
  label: string;
  value: string;
  children?: Column[];
}

interface Props {
  columns: Column[];
  value?: string[];
  level?: number;
  onChange: (value: string[]) => void;
}

const HEIGHT = 40;

function getNextIndex(top: number) {
  if (top >= HEIGHT / 2 ) return 0;
  return Math.ceil(Math.abs((top - HEIGHT / 2) / HEIGHT));
}

const Picker: FC<Props> = (props) => {
  const {
    columns,
    onChange,
    value,
  } = props;
  const level = props.level || 0;
  const currentValue = (value || [])[level];
  const index = React.useMemo(() => columns.findIndex(column => column.value === currentValue), [currentValue, columns]);
  const childColumns = columns[index === -1 ? 0 : index].children;
  const [top, setTop] = useState(index * -HEIGHT + HEIGHT);
  
  useEffect(() => {
    setTop(index * -HEIGHT + HEIGHT);
  }, [index]);

  const ref = useRef({ startY: 0, top });

  function handleTouchStart(e: any) {
    ref.current = {
      startY: e.touches[0].clientY,
      top,
    }
  }

  function handleTouchMove(e: any) {
    const startY = e.touches[0].clientY;
    setTop(ref.current.top + startY - ref.current.startY);
  }

  function handleTouchEnd() {
    let nextIndex = getNextIndex(top);
    nextIndex = nextIndex > columns.length - 1 ? columns.length - 1 : nextIndex;
    
    if (nextIndex === index) {
      setTop(index * -HEIGHT + HEIGHT);
      return;
    }
    const newValue = [...(props.value || [])];
    newValue.splice(level, newValue.length);
    newValue.push(columns[nextIndex].value);

    let child = columns[nextIndex].children;
    while (Array.isArray(child) && child.length) {
      newValue.push(child[0].value);
      child = child[0].children;
    }

    onChange(newValue);
  }

  return (
    <React.Fragment>
        <div
          className="colums-picker"
          style={{ top }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {columns.map((column) => {
            return (<p
              key={column.value}
              className={`colums-item ${column.value === currentValue ? 'checked' : ''}`}>
                {column.label}
              </p>);
          })}
        </div>
        {
          Array.isArray(childColumns)
            ? <Picker
                value={value}
                columns={childColumns}
                level={level + 1}
                onChange={onChange}
              />
            : null
        }
    </React.Fragment>
  )
}

export default Picker
