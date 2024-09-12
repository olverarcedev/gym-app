import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField } from '@mui/material';
import { signIn } from 'next-auth/react';
import router from 'next/router';
import { useState } from 'react';
const LoginAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await signIn('credentials', {
      email,
      password,
      redirect: true,
    });
  };

  return (
    <div className="flex justify-center bg-blue-300 items-center h-screen">
      <div className="w-1/3 p-5 bg-slate-100 rounded-lg">
        <div className="flex justify-center">
          <img src="/assets/uta.png" alt="logo" width={40} />
        </div>
        <div className="flex items-center justify-center">
          <button onClick={() => router.push('/')} className="p-2  rounded-lg">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h1 className="m-5 text-xl text-center">
            Iniciar Sesión como administrador
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            <label>Email:</label>
            <TextField
              className="bg-white"
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              variant="outlined"
            />
          </div>
          <br />
          <div className="flex justify-between items-center">
            <label>Contraseña:</label>
            <TextField
              className="bg-white"
              type="password"
              label="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              variant="outlined"
            />
          </div>
          <br />
          <div className="flex justify-center">
            <button
              className="bg-slate-600 rounded-lg p-2 text-white"
              type="submit"
              onClick={() =>
                signIn('credentials', {
                  email,
                  password,
                })
              }
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginAdmin;
