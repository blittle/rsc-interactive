export function BrowserShell({children}) {
  return (
    <div className="app">
      <div className="browser-header">
        <div className="controls">
          <div className="control close"></div>
          <div className="control minify"></div>
          <div className="control expand"></div>
        </div>
      </div>
      {children}
    </div>
  );
}
