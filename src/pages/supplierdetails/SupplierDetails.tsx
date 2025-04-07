import React, { useState, useEffect } from "react";
import { useParams, useLocation, Outlet } from "react-router-dom";
import DetailsNavBar from "../../component/detailsnavbar/DetailsNavBar";
import Loader from "../../component/loader/Loader";
import "./SupplierDetails.scss";

const SupplierDetailsPage: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();


  const currentPath = location.pathname.split("/")[3];
  const [activeLink, setActiveLink] = useState<string>(currentPath || "overview");
  const [record, setRecord] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const storedRecord = localStorage.getItem("record");
      if (storedRecord) {
        setRecord(JSON.parse(storedRecord));
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setActiveLink(currentPath || "overview");
  }, [currentPath]);

  if (loading) {
    return <Loader />
  }
  return (
    <div className="supplier-details-page">
      <DetailsNavBar activeLink={activeLink} setActiveLink={setActiveLink} id={id} record={record} />
      <Outlet />
    </div>
  );
};

export default SupplierDetailsPage;
