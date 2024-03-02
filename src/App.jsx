import { useState } from "react";
import "./styles.css";

function Cell({ filled, onClick, isDisable, label }) {
  return (
    <button
      type="button"
      aria-lable={label}
      disabled={isDisable}
      onClick={onClick}
      className={filled ? "cell cell-activated" : "cell"}
    />
  );
}
export default function App() {
  const [order, setOrder] = useState([]);
  const [isDeactivate, setIsDeactivate] = useState(false);
  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];
  const deactivateCells = () => {
    setIsDeactivate(true);
    const timer = setInterval(() => {
      setOrder((originalOrder) => {
        const newOrder = originalOrder.slice();
        newOrder.pop();
        if (newOrder.length === 0) {
          clearInterval(timer);
          setIsDeactivate(false);
        }
        return newOrder;
      });
    }, 300);
  };
  const activateCell = (index) => {
    const newOrder = [...order, index];
    setOrder(newOrder);
    if (newOrder.length === config.flat(1).filter(Boolean).length) {
      deactivateCells();
    }
  };
  return (
    <div className="wrapper">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${config[0].length}, 1fr)`,
        }}
      >
        {config.flat(1).map((value, index) => {
          return value ? (
            <Cell
              key={index}
              label={`Cell${index}`}
              filled={order.includes(index)}
              onClick={() => activateCell(index)}
              isDisable={order.includes(index) || isDeactivate}
            />
          ) : (
            <span />
          );
        })}
      </div>
    </div>
  );
}
