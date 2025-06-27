import React, { useState, useEffect } from 'react';

const getGoal = () => Number(localStorage.getItem('waterbell_goal') || 2000);
const getUnit = () => localStorage.getItem('waterbell_unit') || 'ml';
const getStep = () => Number(localStorage.getItem('waterbell_step') || 250);
const getRemindTimes = () => JSON.parse(localStorage.getItem('waterbell_remind_times') || '["10:00","14:00","18:00"]');

const Settings: React.FC = () => {
  const [goal, setGoal] = useState(getGoal());
  const [step, setStep] = useState(getStep());
  const [unit, setUnit] = useState(getUnit());
  const [remindTimes, setRemindTimes] = useState<string[]>(getRemindTimes());
  const [newTime, setNewTime] = useState('');

  useEffect(() => {
    setGoal(getGoal());
    setStep(getStep());
    setUnit(getUnit());
    setRemindTimes(getRemindTimes());
  }, []);

  const save = () => {
    localStorage.setItem('waterbell_goal', String(goal));
    localStorage.setItem('waterbell_step', String(step));
    localStorage.setItem('waterbell_unit', unit);
    localStorage.setItem('waterbell_remind_times', JSON.stringify(remindTimes));
    alert('设置已保存');
  };

  const addTime = () => {
    if (newTime && !remindTimes.includes(newTime)) {
      setRemindTimes([...remindTimes, newTime]);
      setNewTime('');
    }
  };

  const removeTime = (t: string) => {
    setRemindTimes(remindTimes.filter(time => time !== t));
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ color: 'var(--primary-color)' }}>设置</h2>
      <div className="card">
        <div style={{ marginBottom: 8 }}>
          每日目标：<input type="number" value={goal} min={500} max={5000} onChange={e => setGoal(Number(e.target.value))} style={{ width: 80 }} /> {unit}
        </div>
        <div style={{ marginBottom: 8 }}>
          单次饮水量：<input type="number" value={step} min={50} max={1000} onChange={e => setStep(Number(e.target.value))} style={{ width: 80 }} /> {unit}
        </div>
        <div style={{ marginBottom: 8 }}>
          单位：
          <select value={unit} onChange={e => setUnit(e.target.value)}>
            <option value="ml">ml</option>
            <option value="oz">oz</option>
          </select>
        </div>
        <div style={{ marginBottom: 8 }}>
          提醒时间段：
          <ul style={{ paddingLeft: 20 }}>
            {remindTimes.map(t => (
              <li key={t} style={{ marginBottom: 4 }}>
                {t} <button onClick={() => removeTime(t)} style={{ color: '#4FC3F7', border: 'none', background: 'none', cursor: 'pointer' }}>删除</button>
              </li>
            ))}
          </ul>
          <input type="time" value={newTime} onChange={e => setNewTime(e.target.value)} />
          <button onClick={addTime} style={{ marginLeft: 8 }}>添加</button>
        </div>
        <button className="btn-primary" style={{ width: '100%', marginTop: 16 }} onClick={save}>
          保存设置
        </button>
      </div>
    </div>
  );
};

export default Settings; 