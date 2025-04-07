import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../../component/navbar/NavBar';
import Dashboard from '../dashboard/Dashboard';
import { useAppDispatch } from '../../features/RDXHook';
import { setSuppliers } from '../../features/slices/SupplierSlice';
import SupplierList from '../../api/supplier-list.json';
import './Home.scss';

const Home: React.FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const typedSupplierData: any = SupplierList;
    dispatch(setSuppliers(typedSupplierData));
  }, [dispatch]);

  return (
    <div className="main-home">
      <NavBar />
      <div className="main-components">
        <Outlet />
        {pathname === '/' && <Dashboard />}
      </div>
    </div>
  );
};

export default Home;
