import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const Payments = () => {
  const [cedula, setCedula] = useState('');
  const [monto, setMonto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Pago registrado:', { cedula, monto });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl grid grid-cols-1 gap-4 ">
      <Input placeholder="Cédula del Cliente" value={cedula} onChange={(e) => setCedula(e.target.value)} />
      <Input placeholder="Monto" value={monto} onChange={(e) => setMonto(e.target.value)} />
      <Button type="submit">Registrar Pago</Button>
    </form>
  );
};

export default Payments;