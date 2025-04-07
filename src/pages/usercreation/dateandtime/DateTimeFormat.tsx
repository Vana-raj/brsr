import { useState } from 'react';
import { Select, Button } from 'antd';
import { format } from 'date-fns';
import './DateTimeFormat.scss';
import { dateFormatOptions, timeFormatOptions } from '../../../utils/Options';

const DateTimeFormat: React.FC = () => {
    const [selectedDateFormat, setSelectedDateFormat] = useState('MMM. d, yyyy');
    const [currentDateFormat, setCurrentDateFormat] = useState('MMM. d, yyyy');


    const [selectedTimeFormat, setSelectedTimeFormat] = useState('12h');
    const [currentTimeFormat, setCurrentTimeFormat] = useState('12h');


    const sampleDate = new Date(2025, 0, 1);
    const sampleTime = new Date(2025, 0, 1, 6, 0);

    const formatTime = (date: Date) => {
        if (currentTimeFormat === '12h') {
            return format(date, 'hh:mm a');
        }
        return format(date, 'HH:mm');
    };

    return (
        <div className="datetime-format-container">
            <div className="format-section">
                <div className="format-row">
                    <Select
                        value={selectedDateFormat}
                        onChange={(value) => setSelectedDateFormat(value)}
                        options={dateFormatOptions}
                        style={{ width: 300 }}
                    />
                    <Button
                        type="primary"
                        onClick={() => setCurrentDateFormat(selectedDateFormat)}
                    >
                        Save Date Format
                    </Button>
                </div>
                <div className="current-format">
                    Current Date Format: {format(sampleDate, currentDateFormat)}
                    <span className="example"> (e.g., {format(sampleDate, currentDateFormat)})</span>
                </div>
            </div>

            <div className="format-section">
                <div className="format-row">
                    <Select
                        value={selectedTimeFormat}
                        onChange={(value) => setSelectedTimeFormat(value)}
                        options={timeFormatOptions}
                        style={{ width: 300 }}
                    />
                    <Button
                        type="primary"
                        onClick={() => setCurrentTimeFormat(selectedTimeFormat)}
                    >
                        Save Time Format
                    </Button>
                </div>
                <div className="current-format">
                    Current Time Format: {currentTimeFormat === '12h' ? '12 Hr.' : '24 Hr.'}
                    <span className="example"> (e.g., {formatTime(sampleTime)})</span>
                </div>
            </div>
        </div>
    );
};

export default DateTimeFormat;