import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Select from 'react-select';

const Payments = () => {
  const [clientes, setClientes] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [monto, setMonto] = useState('');
  const [medioPago, setMedioPago] = useState('SINPE Movil');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch('http://172.24.104.248:8000/api/clientes/');
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        console.log('Clientes cargados:', data);
        setClientes(data);
      } catch (err) {
        console.error('Error al obtener clientes:', err);
        setError('No se pudieron cargar los clientes');
      }
    };

    fetchClientes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCliente || !selectedCliente.value) {
      setError('Por favor seleccione un cliente válido');
      return;
    }

    if (!monto || isNaN(monto) || parseFloat(monto) <= 0) {
      setError('Por favor ingrese un monto válido');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      console.log('selectedCliente:', selectedCliente);

      const pagoData = {
        monto: parseFloat(monto),
        medio_pago: medioPago,
        cliente: selectedCliente.value,
      };

      console.log('Enviando datos al servidor:', pagoData);

      const response = await fetch('http://172.24.104.248:8000/api/historial_pagos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pagoData),
      });

      const text = await response.text();
      console.log('Respuesta cruda del servidor (text):', text);

      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        console.error('Error al parsear JSON:', parseError);
        throw new Error('Respuesta inválida del servidor');
      }

      console.log('JSON parseado de la respuesta:', data);

      if (!response.ok) {
        const errorMsg = data.detail || data.message || Object.values(data).flat().join(', ') || 'Error al registrar el pago';
        throw new Error(errorMsg);
      }

      console.log('Pago registrado exitosamente:', data);
      setSuccess(true);
      setSelectedCliente(null);
      setMonto('');
    } catch (err) {
      console.error('Error al registrar pago:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clienteOptions = clientes.map(cliente => ({
    value: cliente.id_cliente,
    label: `${cliente.cedula} - ${cliente.nombre_completo}`,
  }));

  console.log('Opciones de cliente:', clienteOptions);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl">
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Cliente</label>
        <Select
          options={clienteOptions}
          value={selectedCliente}
          onChange={setSelectedCliente}
          placeholder="Buscar por cédula o nombre..."
          isSearchable
          noOptionsMessage={() => "No se encontraron clientes"}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>

      <Input
        placeholder="Monto"
        type="number"
        step="0.01"
        min="0"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
      />

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Medio de Pago</label>
        <select
          value={medioPago}
          onChange={(e) => setMedioPago(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="SINPE Movil">SINPE Móvil</option>
          <option value="Efectivo">Efectivo</option>
          <option value="Tarjeta">Tarjeta</option>
          <option value="Transferencia">Transferencia Bancaria</option>
        </select>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Registrando...' : 'Registrar Pago'}
      </Button>

      {error && (
        <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-2 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
          Pago registrado exitosamente!
        </div>
      )}
    </form>
  );
};

export default Payments;
