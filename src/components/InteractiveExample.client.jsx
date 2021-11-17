import {useEffect, useState} from 'react';
import Timeline from './Timeline.client';
import AppPreview from './AppPreview.client';

export default function InteractiveExample({mode}) {
  const [time, setTime] = useState(0.1);

  useEffect(() => {
      setTime(.1);
  }, [mode])

  return (
    <>
      <div style={{display: 'flex'}}>
        <div style={{marginRight: 10}}>
          <h2>{mode.name}</h2>
          <p style={{width: 500}}>{mode.description}</p>
          <Timeline mode={mode} time={time} setTime={setTime} />
        </div>
        <div>
          <AppPreview mode={mode} time={time} />
        </div>
      </div>
    </>
  );
}
