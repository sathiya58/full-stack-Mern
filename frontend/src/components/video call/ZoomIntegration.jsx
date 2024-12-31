
import PropTypes from 'prop-types';

const ZoomIntegration = ({ meetingNumber, passcode }) => {
  const zoomMeetingUrl = `https://zoom.us/wc/join/${meetingNumber}?pwd=${passcode}`;

  return (
    <div className="zoom-integration-container">
      <h3>Join Zoom Meeting</h3>
      <iframe
        title="Zoom Meeting"
        src={zoomMeetingUrl}
        width="100%"
        height="500px"
        allow="microphone; camera"
        style={{ border: 'none' }}
      ></iframe>
    </div>
  );
};

ZoomIntegration.propTypes = {
  meetingNumber: PropTypes.string.isRequired,
  passcode: PropTypes.string.isRequired,
};

export default ZoomIntegration;
