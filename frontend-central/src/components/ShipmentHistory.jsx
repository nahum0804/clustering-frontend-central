import React from 'react';

const ShipmentHistory = () => {
  const data = [
    { id: 1, cliente: 'Juan', fecha: '2025-05-17', destino: 'Bogotá' },
    { id: 2, cliente: 'Ana', fecha: '2025-05-16', destino: 'Medellín' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl">
      <h3 className="text-lg font-bold mb-4">Historial de Envíos</h3>
      <ul className="space-y-2">
        {data.map((envio) => (
          <li key={envio.id} className="border-b py-2">
            {envio.cliente} - {envio.destino} ({envio.fecha})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShipmentHistory;