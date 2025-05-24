import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { QRCodeCanvas } from 'qrcode.react';

const ShipmentRegistry = () => {
  const [clientes, setClientes] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [estado, setEstado] = useState('');
  const [ipNodo, setIpNodo] = useState('');
  const [costoEnvio, setCostoEnvio] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [envioRespuesta, setEnvioRespuesta] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch('http://172.24.104.248:8000/api/clientes/');
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const data = await response.json();
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

    if (!selectedCliente?.value) return setError('Seleccione un cliente válido');
    if (!estado.trim()) return setError('Ingrese un estado válido');
    if (!ipNodo.trim()) return setError('Ingrese una IP de nodo válida');
    if (!costoEnvio || isNaN(costoEnvio) || parseFloat(costoEnvio) <= 0)
      return setError('Ingrese un costo de envío válido');

    setIsLoading(true);
    setError(null);
    setSuccess(false);
    setEnvioRespuesta(null);

    const envioData = {
      cliente: selectedCliente.value,
      estado,
      ip_nodo: ipNodo,
      costo_envio: parseFloat(costoEnvio),
    };

    try {
      const response = await fetch('http://172.24.104.248:8000/api/historial_envios/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(envioData),
      });

      if (!response.ok) {
        const data = await response.json();
        const errorMsg = data.detail || data.message || 'Error al registrar el envío';
        throw new Error(errorMsg);
      }

      const data = await response.json();
      setSuccess(true);
      setEnvioRespuesta(data);
      setSelectedCliente(null);
      setEstado('');
      setIpNodo('');
      setCostoEnvio('');
    } catch (err) {
      console.error('Error al registrar envío:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clienteOptions = clientes.map((cliente) => ({
    value: cliente.id_cliente,
    label: `${cliente.cedula} - ${cliente.nombre_completo}`,
  }));

  return (
    <div className="flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Cliente</label>
            <Select
              options={clienteOptions}
              value={selectedCliente}
              onChange={setSelectedCliente}
              placeholder="Buscar cliente..."
              isSearchable
              noOptionsMessage={() => 'No se encontraron clientes'}
            />
          </div>

          <Input
            label="Estado del envío"
            placeholder="Ej. En tránsito"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />

          <Input
            label="IP del nodo"
            placeholder="Ej. 192.168.1.100"
            value={ipNodo}
            onChange={(e) => setIpNodo(e.target.value)}
          />

          <Input
            label="Costo del envío"
            type="number"
            step="0.01"
            min="0"
            placeholder="Ej. 2500.00"
            value={costoEnvio}
            onChange={(e) => setCostoEnvio(e.target.value)}
          />

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Registrando...' : 'Registrar Envío'}
          </Button>

          {error && (
            <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
              {error}
            </div>
          )}

          {success && envioRespuesta && (
            <div className="mt-6 bg-green-100 border border-green-400 text-green-800 p-4 rounded text-sm">
              <h3 className="text-lg font-semibold mb-2 text-center">Envío registrado exitosamente</h3>
              <p><strong>ID:</strong> {envioRespuesta.id_envio}</p>
              <p><strong>Fecha:</strong> {new Date(envioRespuesta.fecha_envio).toLocaleString()}</p>
              <p><strong>Estado:</strong> {envioRespuesta.estado}</p>
              <p><strong>IP Nodo:</strong> {envioRespuesta.ip_nodo}</p>
              <p><strong>Costo:</strong> ₡{parseFloat(envioRespuesta.costo_envio).toFixed(2)}</p>

              <div className="mt-4 flex justify-center">
                <QRCodeCanvas
                  value={envioRespuesta.qr_codigo}
                  size={160}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="H"
                  includeMargin
                />
              </div>

              <p className="mt-2 text-center break-words text-xs text-gray-600">
                Código QR: {envioRespuesta.qr_codigo}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ShipmentRegistry;
