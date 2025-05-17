import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const ClientForm = () => {
  const [form, setForm] = useState({ nombre: '', cedula: '', telefono: '', correo: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Cliente registrado:', form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl">
      {['nombre', 'cedula', 'telefono', 'correo'].map((field) => (
        <Input
          key={field}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={form[field]}
          onChange={handleChange}
        />
      ))}
      <Button type="submit">Registrar Cliente</Button>
    </form>
  );
};

export default ClientForm;
