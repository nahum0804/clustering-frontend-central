import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const ClientForm = () => {
  const [form, setForm] = useState({ 
    nombre_completo: '', 
    cedula: '', 
    telefono: '', 
    correo: '', 
    saldo_actual: 0 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/clientes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Error al registrar el cliente');
      }

      const data = await response.json();
      console.log('Cliente registrado:', data);
      setSuccess(true);
      // Reset form after successful submission if needed
      setForm({ 
        nombre_completo: '', 
        cedula: '', 
        telefono: '', 
        correo: '', 
        saldo_actual: 0 
      });
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl">
      {['nombre_completo', 'cedula', 'telefono', 'correo'].map((field) => (
        <Input
          key={field}
          name={field}
          placeholder={field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          value={form[field]}
          onChange={handleChange}
        />
      ))}
      <Input
        name="saldo_actual"
        placeholder="Saldo Actual"
        type="number"
        value={form.saldo_actual}
        onChange={handleChange}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Registrando...' : 'Registrar Cliente'}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Cliente registrado exitosamente!</p>}
    </form>
  );
};

export default ClientForm;