import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { makeStore } from '../../redux/store';
import DrawerComponent from '../../components/unit-components/drawerComponent';
import DrawerButtonComponent from '../../components/unit-components/drawerButtonComponent';

const AdminPageLayout = ({ children }) => {
  const router = useRouter();
  const store = makeStore();

  return (
    <Provider store={store}>
      <div>
        <nav className="flex justify-between items-center px-5 py-2 bg-slate-500 text-white">
          <div className="flex items-center">
            <DrawerButtonComponent />
            <p>Administración</p>
          </div>
          <button
            className="bg-blue-400 p-2 rounded-lg"
            onClick={async () => {
              await signOut({ redirect: false });
              router.push('/auth/login');
            }}
          >
            Cerrar sessión
          </button>
        </nav>
        <DrawerComponent />
        {children}
      </div>
    </Provider>
  );
};
export default AdminPageLayout;
