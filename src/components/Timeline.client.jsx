import {useCallback, useEffect, useRef, useState} from 'react';
import useAnimationFrame from 'use-animation-frame';

export default function Timeline({mode, time, setTime}) {
  const [dragStart, setDragStart] = useState({});
  const [dragging, setDragging] = useState(false);
  const [paused, setPaused] = useState(true);

  useAnimationFrame(e => {
    if (time < 500 && !paused) {
      setTime((prevTime) => prevTime + .7);
    }
  }, [mode, paused, time])

  const currentResources = mode.resources.filter((stage) => time > stage.time);

  let currentResourceStage = mode.resources.find(
    (resource) =>
      time >= resource.time && time <= resource.time + resource.duration,
  );

  return (
    <>
    <div onMouseUp={() => setDragging(false)} onMouseMove={e => {
        if (dragging) {
          setTime(dragStart.time + (e.clientX - dragStart.clientX));
        }
      }} className="timeline" style={{height: (mode.resources.length * 2) + 'rem'}}>
      <div onMouseDown={e => {
        setDragStart({time, clientX: e.clientX});
        setDragging(true);
        setPaused(true); }} className="marker" style={{left: time + 'px'}}></div>

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
      {currentResourceStage && <div className="inlineMessage">{currentResourceStage.message}</div>}
    </div>
    <button onClick={() => setPaused(paused => !paused)}>{paused ? "Play" : "Pause"}</button>
    </>
  );
}
