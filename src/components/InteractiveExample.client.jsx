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
      <div className="interactive-example">
        <div style={{padding: '0 10px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <AppPreview mode={mode} time={time} />
          <Timeline mode={mode} time={time} setTime={setTime} />
        </div>
      </div>
    </>
  );
}
