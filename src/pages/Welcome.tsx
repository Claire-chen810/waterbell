import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const recommendGoal = (weight: number) => Math.round(weight * 30);

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [weight, setWeight] = useState(60);
  const [goal, setGoal] = useState(1800);
  const [step, setStep] = useState(250);
  const [unit, setUnit] = useState('ml');

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const w = Number(e.target.value);
    setWeight(w);
    setGoal(recommendGoal(w));
  };

  const handleStart = () => {
    localStorage.setItem('waterbell_goal', String(goal));
    localStorage.setItem('waterbell_step', String(step));
    localStorage.setItem('waterbell_unit', unit);
    navigate('/');
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ color: 'var(--primary-color)' }}>欢迎使用喝水咯</h2>
      <div className="card">
        <div style={{ marginBottom: 16 }}>根据体重智能推荐每日饮水目标</div>
        <div style={{ marginBottom: 8 }}>
          体重：<input type="number" value={weight} min={30} max={150} onChange={handleWeightChange} style={{ width: 80 }} /> kg
        </div>
        <div style={{ marginBottom: 8 }}>
          每日目标：<input type="number" value={goal} min={500} max={5000} onChange={e => setGoal(Number(e.target.value))} style={{ width: 80 }} /> ml/oz
        </div>
        <div style={{ marginBottom: 8 }}>
          单次饮水量：<input type="number" value={step} min={50} max={1000} onChange={e => setStep(Number(e.target.value))} style={{ width: 80 }} /> ml/oz
        </div>
        <div style={{ marginBottom: 8 }}>
          单位：
          <select value={unit} onChange={e => setUnit(e.target.value)}>
            <option value="ml">ml</option>
            <option value="oz">oz</option>
          </select>
        </div>
        <button className="btn-primary" style={{ width: '100%', marginTop: 16 }} onClick={handleStart}>
          开始喝水之旅
        </button>
      </div>
    </div>
  );
};

export default Welcome; 