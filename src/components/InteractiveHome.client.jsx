import {useState} from 'react';
import Timeline from './Timeline.client';
import AppPreview from './AppPreview.client';
import InteractiveExample from './InteractiveExample.client';

export default function InteractiveHome({modes}) {
  const [selectedMode, setSelectedMode] = useState(modes[0].name);

  return (
    <>
      <div style={{textAlign: 'center', marginBottom: '1rem'}}>
        <label htmlFor="mode">Select mode:</label>
        <select
          name="mode"
          onChange={(e) =>
            setSelectedMode(
              modes.find((mode) => mode.name === e.target.value).name,
            )
          }
          value={selectedMode}
        >
          {modes.map((mode) => (
            <option key={mode.name} value={mode.name}>
              {mode.name}
            </option>
          ))}
        </select>
      </div>

      <InteractiveExample
        mode={modes.find((mode) => mode.name === selectedMode)}
      />
    </>
  );
}
