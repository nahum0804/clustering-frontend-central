import React from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Title from '../ui/Title';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login simulado');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#e9e8ff] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <Title>Iniciar Sesión</Title>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input placeholder="Usuario" />
          <Input type="password" placeholder="Contraseña" />
          <Button type="submit">Entrar</Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
