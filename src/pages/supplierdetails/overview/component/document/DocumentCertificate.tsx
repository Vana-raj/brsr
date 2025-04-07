import React from "react";
import './DocumentCertificate.scss';
import { CertificateIcon } from "../../../../../utils/CardIcons";
interface DocProps {
  record?: any
}
const DocumentCertificate: React.FC<DocProps> = ({ record }) => {

  return (
    <div className="document-certificate">
      <h4>Certification</h4>
      <ul>
        {record?.certification?.map((cert: any, index: any) => (
          <div key={index} className="cert-card">
            <div>
              <CertificateIcon />
            </div>
            <div className="cert-name">{cert.name}</div>
            <div className="cert-desc">{cert.certificate}</div>
          </div>
        ))}
      </ul>
      <button className="view-more">View More</button>
      <div className="certify-text">All certificates and Policies are up to date</div>
    </div>
  );
};

export default DocumentCertificate;
