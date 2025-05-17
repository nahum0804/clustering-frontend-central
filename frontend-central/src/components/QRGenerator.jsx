import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import Input from '../ui/Input';

const QRGenerator = () => {
  const [data, setData] = useState('');

  return (
    <div className="bg-white p-6 rounded-2xl text-center">
      <Input placeholder="Datos del envío" value={data} onChange={(e) => setData(e.target.value)} />
      <QRCodeCanvas value={data} size={128} className='mt-5 mx-5 mx-auto'/>
    </div>
  );
};

export default QRGenerator;
