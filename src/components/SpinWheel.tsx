import { IonText } from '@ionic/react';
import './SpinWheel.css';

interface SpinWheelProps {
  options: string[];
  rotationDeg: number;
}

const wheelColors = [
  '#ff6b6b',
  '#ffd166',
  '#06d6a0',
  '#118ab2',
  '#9b5de5',
  '#f15bb5',
  '#00bbf9',
  '#00f5d4',
];

const SpinWheel: React.FC<SpinWheelProps> = ({ options, rotationDeg }) => {
  const wheelOptions = options.length > 0 ? options : ['Belum ada pilihan'];
  const segmentAngle = 360 / wheelOptions.length;

  const gradient = `conic-gradient(from -${segmentAngle / 2}deg, ${wheelOptions
    .map((_, index) => {
      const start = index * segmentAngle;
      const end = start + segmentAngle;
      const color = wheelColors[index % wheelColors.length];
      return `${color} ${start}deg ${end}deg`;
    })
    .join(', ')})`;

  return (
    <div className="spin-wheel-wrapper">
      <div className="wheel-pointer" />

      <div
        className="wheel-rotator"
        style={{ transform: `rotate(${rotationDeg}deg)` }}
      >
        <div className="wheel-circle" style={{ background: gradient }}>
          <div className="wheel-center">
            <IonText color="dark">
              <strong>SPIN</strong>
            </IonText>
          </div>
        </div>
      </div>

      <div className="wheel-legend">
        {wheelOptions.map((option, index) => (
          <div className="legend-item" key={`${option}-${index}`}>
            <span
              className="legend-color"
              style={{ backgroundColor: wheelColors[index % wheelColors.length] }}
            />
            <span className="legend-text">
            {option}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpinWheel;