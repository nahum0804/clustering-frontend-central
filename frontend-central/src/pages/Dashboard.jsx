import React from 'react';
import ClientForm from '../components/ClientForm';
import Payments from '../components/Payments';
import QRGenerator from '../components/QRGenerator';
import NodeRegistry from '../components/NodeRegistry';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-black text-[#0c0c16] p-6 space-y-8">
      <h1 className="text-3xl font-bold text-[#6860ff] mb-4">Panel de Control</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2 text-white"> Registro de Clientes</h2>
        <ClientForm />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2 text-white">Gestión de Pagos</h2>
        <Payments />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2 text-white">Generar Código QR para Envíos</h2>
        <QRGenerator />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2 text-white">Registro de Nodos Locales</h2>
        <NodeRegistry />
      </section>
    </div>
  );
};

export default Dashboard;
