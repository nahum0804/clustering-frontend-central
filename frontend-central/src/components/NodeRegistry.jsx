import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const NodeRegistry = () => {
  const [ip, setIp] = useState('');

  const validateIp = (ip) => /^\\d{1,3}(\\.\\d{1,3}){3}$/.test(ip);

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = validateIp(ip);
    alert(valid ? 'IP válida registrada.' : 'IP inválida');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl">
      <Input placeholder="IP del Nodo" value={ip} onChange={(e) => setIp(e.target.value)} />
      <Button type="submit">Registrar Nodo</Button>
    </form>
  );
};

export default NodeRegistry;
