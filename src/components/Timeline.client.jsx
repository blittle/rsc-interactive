import {useCallback, useEffect, useRef, useState} from 'react';
import useAnimationFrame from 'use-animation-frame';

export default function Timeline({mode, time, setTime}) {
  const [dragStart, setDragStart] = useState({});
  const [dragging, setDragging] = useState(false);
  const [paused, setPaused] = useState(true);

  useAnimationFrame(
    (e) => {
      if (time < 500 && !paused) {
        setTime((prevTime) => prevTime + 0.7);
      }
    },
    [mode, paused, time],
  );

  const currentResources = mode.resources.filter(
    (stage) => time > stage.time && stage.label,
  );

  let currentResourceStage = mode.resources.find(
    (resource) =>
      time >= resource.time && time <= resource.time + resource.duration,
  );

  return (
    <div style={{width: '100%', maxWidth: 500}}>
      <div
        onMouseUp={() => setDragging(false)}
        onMouseMove={(e) => {
          if (dragging) {
            setTime(dragStart.time + (e.clientX - dragStart.clientX));
          }
        }}
        className="timeline"
        style={{
          height: (mode.resources.length - 1) * 2 + 0.5 + 'rem',
          marginBottom: '1rem',
        }}
      >
        <div
          onMouseDown={(e) => {
            setDragStart({time, clientX: e.clientX});
            setDragging(true);
            setPaused(true);
          }}
          className="marker"
          style={{left: time + 'px'}}
        ></div>

        {currentResources.map((resource) => (
          <div
            key={resource.label || 'end'}
            style={{
              opacity: resource.label ? 1 : 0,
              marginLeft: resource.time + 'px',
              width:
                time >= resource.time + resource.duration
                  ? resource.duration + 'px'
                  : time - resource.time + 'px',
            }}
            className="resource"
            title={resource.label}
          >
            {resource.label}
          </div>
        ))}
      </div>

      <p style={{}}>
        {time > 0.1 && currentResourceStage
          ? currentResourceStage.message
          : mode.description}
      </p>
      <div style={{textAlign: 'center'}}>
        <button
          className="main-button"
          onClick={() => setPaused((paused) => !paused)}
        >
          {paused ? 'Play' : 'Pause'}
        </button>
      </div>
    </div>
  );
}
