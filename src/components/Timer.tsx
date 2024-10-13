import React from "react";

interface TimerProps {
  secondsLeft: number;
}

const Timer: React.FC<TimerProps> = ({ secondsLeft }) => {
  return (
    <div className="text-right mb-4">
      <span className="text-lg font-semibold">{secondsLeft} saniye kaldı</span>
    </div>
  );
};

export default React.memo(Timer);
