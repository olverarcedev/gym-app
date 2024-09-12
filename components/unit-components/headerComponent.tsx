import { useSession, signIn, signOut } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
const HeaderComponent = () => {
  const { data: session } = useSession();
  return (
    <header>
      <nav className="flex justify-between items-center py-2 px-10 bg-slate-200">
        <div className="flex items-center">
          <img src="/assets/uta.png" alt="logo" width={20} />
          <p className="mx-3">
            <b>UtaSport</b>
          </p>
        </div>
        {session?.user ? (
          <div className="flex items-center">
            <Image
              className="m-1"
              src={session.user.image}
              alt="userIcon"
              width={40}
              height={40}
            />
            <h1>
              <b className="m-3">{session.user.name}</b>
            </h1>
            <button
              className="bg-blue-400 rounded-lg px-3 text-white h-10"
              onClick={async () => signOut()}
            >
              <b>Cerrar sesión</b>
            </button>
          </div>
        ) : (
          <>
            <nav className="flex">
              <button
                className="flex items-center mx-1 bg-blue-400 rounded-lg px-3 text-white h-10"
                onClick={() => signIn('google')}
              >
                <b>Login Estudiantes</b>
                <FontAwesomeIcon className="p-3" icon={faGoogle} />
              </button>
              <Link
                href="/auth/login"
                className="flex items-center mx-1 bg-red-400 rounded-lg px-3 text-white h-10"
              >
                <b>Login Admin</b>
                <FontAwesomeIcon className="p-3" icon={faSignInAlt} />
              </Link>
            </nav>
          </>
        )}
      </nav>
    </header>
  );
};
export default HeaderComponent;
