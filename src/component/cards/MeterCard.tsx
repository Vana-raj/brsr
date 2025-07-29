import React from "react";
import { Card, Tooltip } from "antd";
import DropdownInput from "../dropdown/CustomDropDown";
import CircularChart from "../circlepercentagechart/CircleChart";
import BarChart from "../barchart/BarChart";
import MeterChart from "../meterchart/MeterChart";
import { InfoCircleTwoTone } from "@ant-design/icons";
import { bgColor } from "../../style/ColorCode";
import "./Card.scss";

interface MeterCardProps {
  title: string;
  options?: any;
  value?: string;
  compliantPercentage?: number;
  nonCompliantPercentage?: number;
  type?: string;
  record?: any;
  onChange?: (value: string) => void;
}

const MeterCard: React.FC<MeterCardProps> = ({
  title,
  options,
  compliantPercentage,
  nonCompliantPercentage,
  value,
  type,
  onChange,
  record,
}) => {

  return (
    <div className="normal-card">
      <Card bordered={false} className="card-whole">
        <div className="card-header">
          <div className="card-title">{title}

            {(title === "Risk Meter" || title === "Aeiforo Score") && (
              <Tooltip
                color={bgColor}
                title={
                  <div className="legend-content">
                    <div className="legend-item">
                      <span className="legend-color excellent"></span>
                      <div className="text-flex">
                        <div>Excellent</div>
                        <div> 81+</div>
                      </div>

                    </div>
                    <div className="legend-item">
                      <span className="legend-color good"></span>
                      <div className="text-flex">
                        <div>Good</div>
                        <div>61 - 80</div>
                      </div>

                    </div>
                    <div className="legend-item">
                      <span className="legend-color satisfactory"></span>
                      <div className="text-flex">
                        <div>Satisfactory</div>
                        <div>46 - 60</div>
                      </div>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color below-average"></span>
                      <div className="text-flex">
                        <div>Below Average</div>
                        <div> 21 - 45</div>
                      </div>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color requires-improvement"></span>
                      <div className="text-flex">
                        <div>Requires Improvement</div>
                        <div>{'<45'}</div>
                      </div>
                    </div>
                  </div>
                }
                placement="rightBottom"
                className="custom-tooltip"
              >
                <InfoCircleTwoTone className="info-tool" />
              </Tooltip>
            )}

          </div>

          {type === "overview" ? (
            ""
          ) : (
            <div className="dropdown">
              {<DropdownInput options={options} value={value} onChange={() => onChange} />}
            </div>
          )}

        </div>
        <div className="card-body">
          <div className="chart-container">
            {title === "Risk Meter" ? (
              <MeterChart record={record} />
            ) : (
              <CircularChart
                percentageCompleted={nonCompliantPercentage || 0}
                percentageRemaining={record?.riskScore || compliantPercentage}
                percentageMiddle={0}
                type={type}
                score={record?.riskScore}
              />
            )}
          </div>
          <div className="legend">
            {type === "overview" && title === "Aeiforo Score" ? (
              <BarChart record={record} />
            ) : title === "Risk Meter" ? null : (
              <>
                <div className="Legend-first">
                  <div className="first-box"></div>
                  <span className="legend-box-compliant"></span>Compliant
                </div>
                <div className="Legend-second">
                  <div className="second-box"></div>
                  <span className="legend-box-non-compliant"></span>Non-Compliant
                </div>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MeterCard;
