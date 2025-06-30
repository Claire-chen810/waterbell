import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const getTodayKey = () => 'waterbell_' + dayjs().format('YYYYMMDD');

const getGoal = () => Number(localStorage.getItem('waterbell_goal') || 2000);
const getUnit = () => localStorage.getItem('waterbell_unit') || 'ml';
const getStep = () => Number(localStorage.getItem('waterbell_step') || 250);

const Home: React.FC = () => {
  const [amount, setAmount] = useState(0);
  const [goal, setGoal] = useState(getGoal());
  const [unit, setUnit] = useState(getUnit());
  const [step, setStep] = useState(getStep());

  useEffect(() => {
    setGoal(getGoal());
    setUnit(getUnit());
    setStep(getStep());
    const today = localStorage.getItem(getTodayKey()) || '0';
    setAmount(Number(today));
  }, []);

  const handleDrink = () => {
    const newAmount = amount + step;
    setAmount(newAmount);
    localStorage.setItem(getTodayKey(), String(newAmount));
  };

  const percent = Math.min(100, Math.round((amount / goal) * 100));
  const remain = Math.max(0, goal - amount);

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '1.5rem' }}>
      <h2 style={{ color: 'var(--primary-color)' }}>喝水咯 · 今日喝水</h2>
      <div className="card">
        <div style={{ fontSize: 32, fontWeight: 700 }}>{amount}{unit}</div>
        <div style={{ color: '#888', marginBottom: 8 }}>目标：{goal}{unit}</div>
        <div style={{ background: 'var(--progress-bg)', borderRadius: 8, height: 16, marginBottom: 8 }}>
          <div style={{ width: percent + '%', background: 'var(--primary-color)', height: '100%', borderRadius: 8, transition: 'width 0.3s' }} />
        </div>
        <div style={{ color: '#4FC3F7', fontWeight: 500 }}>剩余 {remain}{unit}</div>
      </div>
      <button className="btn-primary" style={{ width: '100%', marginTop: 24 }} onClick={handleDrink}>
        喝水 +{step}{unit}
      </button>
      <div style={{ marginTop: 32, color: '#90caf9', fontSize: 14 }}>
        小贴士：保持规律饮水，身体更健康！
      </div>
    </div>
  );
};

export default Home; 