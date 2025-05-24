import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const NodeRegistry = () => {
  const [ip, setIp] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const validateIp = (ip) =>
    /^(\d{1,3}\.){3}\d{1,3}$/.test(ip) &&
    ip.split('.').every(num => parseInt(num, 10) >= 0 && parseInt(num, 10) <= 255);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validateIp(ip)) {
      setError('IP inválida. Debe estar en formato IPv4 (ej: 192.168.1.1)');
      return;
    }

    if (!name.trim()) {
      setError('El nombre del nodo es obligatorio.');
      return;
    }

    setIsLoading(true);

    const dataToSend = {
      ip_nodo: ip,
      name_nodo: name.trim(),
    };

    console.log('Enviando nodo al backend:', dataToSend);

    try {
      const response = await fetch('http://172.24.104.248:8000/api/nodos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const text = await response.text();
      let json = {};
      try {
        json = text ? JSON.parse(text) : {};
      } catch (err) {
        console.error('Respuesta no es JSON:', text);
        throw new Error('Respuesta inválida del servidor');
      }

      if (!response.ok) {
        console.error('Error del backend:', json);
        throw new Error(json.detail || 'Error al registrar nodo');
      }

      setSuccess(true);
      setIp('');
      setName('');
    } catch (err) {
      console.error('Error al enviar nodo:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl">
      <Input
        placeholder="IP del Nodo (ej: 192.168.0.1)"
        value={ip}
        onChange={(e) => setIp(e.target.value)}
      />
      <Input
        placeholder="Nombre del Nodo"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Registrando...' : 'Registrar Nodo'}
      </Button>

      {error && (
        <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-2 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
          Nodo registrado exitosamente.
        </div>
      )}
    </form>
  );
};

export default NodeRegistry;