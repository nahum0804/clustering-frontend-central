import React, { useEffect, useState } from 'react';

const ShipmentHistory = () => {
  const [envios, setEnvios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnvios = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/historial_general_envios/');
        if (!response.ok) throw new Error('Error al cargar el historial de envíos');
        const data = await response.json();
        setEnvios(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnvios();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Historial General de Envíos</h2>

      {loading && <p className="text-center">Cargando envíos...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && envios.length === 0 && (
        <p className="text-center text-gray-500">No hay envíos registrados.</p>
      )}

      {!loading && envios.length > 0 && (
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">ID</th>
              <th className="border p-2">Fecha</th>
              <th className="border p-2">Estado</th>
              <th className="border p-2">IP Nodo</th>
              <th className="border p-2">Costo</th>
              <th className="border p-2">QR</th>
            </tr>
          </thead>
          <tbody>
            {envios.map((envio) => (
              <tr key={envio.id_envio} className="hover:bg-gray-50">
                <td className="border p-2">{envio.id_envio}</td>
                <td className="border p-2">{new Date(envio.fecha_envio).toLocaleString()}</td>
                <td className="border p-2">{envio.estado}</td>
                <td className="border p-2">{envio.ip_nodo}</td>
                <td className="border p-2">₡{parseFloat(envio.costo_envio).toFixed(2)}</td>
                <td className="border p-2 break-all text-xs">{envio.qr_codigo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShipmentHistory;
