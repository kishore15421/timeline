import PropTypes from "prop-types";
import Accordion from "./Accordion";

const TimelineEntry = ({
  children,
  label,
  accordionIcon,
  close,
  createdAt,
  status,
}) => {
  const getActivityLogColor = () => {
    let name = "";

    switch (status) {
      case "success":
        name = "green";
        break;
      case "danger":
        name = "red";
        break;
      case "update":
        name = "blue";
        break;
      case "warning":
        name = "yellow";
        break;
      case "default":
        name = "grey";
        break;
      default:
        name = "";
    }

    return name;
  };

  const renderHeader = () => (
    <div className="timeline-accordion-header">
      <span>{label}</span>
      <span className="timeline-date">{createdAt}</span>
    </div>
  );

  return (
    <li className="timeline-entry">
      <div className="timeline-header">
        <div
          className={`timeline-step-marker timeline-step-marker--${getActivityLogColor()}`}
        />
        <Accordion
          accordionIcon={accordionIcon}
          close={close}
          label={renderHeader()}
        >
          {children}
        </Accordion>
      </div>
    </li>
  );
};

export default TimelineEntry;

TimelineEntry.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  accordionIcon: PropTypes.node,
  close: PropTypes.bool,
  createdAt: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
