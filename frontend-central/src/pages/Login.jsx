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
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center">
          <Title className="mb-6">Iniciar Sesión</Title>
          <form onSubmit={handleLogin} className="w-full space-y-6">
            <Input 
              placeholder="Usuario" 
              className="text-black" 
            />
            <Input 
              type="password" 
              placeholder="Contraseña" 
              className="text-black"
            />
            <div className="flex justify-center">
              <Button type="submit">Entrar</Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Login;