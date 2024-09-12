import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setOpen } from '../../redux/features/admin/drawerSlice';

const DrawerButtonComponent = () => {
  const open = useAppSelector((state) => state.drawer.open);
  const dispatch = useAppDispatch();
  const toogleDrawer = (value: boolean) => {
    dispatch(setOpen(value));
  };
  return (
    <button className="mr-5 " onClick={() => toogleDrawer(true)}>
      <FontAwesomeIcon icon={faBars} className="text-white size-5" />
    </button>
  );
};
export default DrawerButtonComponent;
