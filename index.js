import PropTypes from "prop-types";
import TimelineEntry from "./TimelineEntry";
import './timeline.scss'
const Timeline = ({ list }) => (
  <div className="timeline-wrapper">
    <ul className="timeline">
      {list.map((el, i) => (
        <TimelineEntry
          key={i}
          label={el.label}
          accordionIcon={el.accordionIcon}
          close={el.close}
          createdAt={el.createdAt}
          status={el.status}
        >
          {el.content}
        </TimelineEntry>
      ))}
    </ul>
  </div>
);

export default Timeline;

Timeline.propTypes = {
  list: PropTypes.array.isRequired,
};
