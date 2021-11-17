import TextLoading from './TextLoading.client';
import {getStateForStage, getResourceStageFromTime} from '../helpers/modes';
import {BrowserShell} from './BrowserShell.client';

export default function AppPreview({mode, time}) {
  let currentResourceStage = getResourceStageFromTime(mode.resources, time);

  const {
    blank,
    headerLoaded,
    productDetailsLoaded,
    recommendationsLoaded,
    productDetailsHidden,
    recommendationsHidden,
  } = getStateForStage(currentResourceStage);

  if (blank) return <BrowserShell />;

  return (
    <BrowserShell>
      <div className="header">
        <section>
          <div className="app-name">eCommerce</div>
          <div className="header-links">
            <div className="cart">
              <img src="/bag.webp" alt="cart" />
              {headerLoaded && <span>2</span>}
            </div>
            <div className="profile">
              <img src="/profile.webp" alt="cart" />
            </div>
          </div>
        </section>
      </div>
      {!productDetailsHidden && (
        <div className="product-details">
          <section>
            <div>
              {productDetailsLoaded ? (
                <img
                  src="/shirt.webp"
                  className="main-image"
                  alt="Main shirt"
                />
              ) : (
                <div className="main-image loading" />
              )}
            </div>
            <div>
              {productDetailsLoaded ? (
                <h1>Basic t-shirt</h1>
              ) : (
                <TextLoading
                  height="26"
                  width="200"
                  style={{margin: '.83rem 0'}}
                />
              )}
              {productDetailsLoaded ? (
                <h2>$11.99</h2>
              ) : (
                <TextLoading
                  height="26"
                  width="80"
                  style={{margin: '.83rem 0'}}
                />
              )}
              {productDetailsLoaded ? (
                <p>
                  Look your best with this simple, but stylish t-shirt. This
                  basic short-sleeve tee is made from a soft Cotton and
                  Polyester blend and is guaranteed not to shrink or fade.
                </p>
              ) : (
                <TextLoading
                  height="110"
                  width="200"
                  style={{margin: '1rem 0'}}
                />
              )}

              <div className="actions">
                <button disabled={!productDetailsLoaded}>Add to cart</button>
                <button disabled={!productDetailsLoaded}>Buy it now</button>
              </div>
            </div>
          </section>
        </div>
      )}
      {!recommendationsHidden && (
        <>
          <div className="recommendations">
            <h3>Recommendations</h3>
          </div>
          <div className="recommendation-images">
            <section>
              <div className="image">
                {recommendationsLoaded ? (
                  <img src="/shirt.webp" alt="Recommendation 1" />
                ) : (
                  <div />
                )}
              </div>
              <div className="image">
                {recommendationsLoaded ? (
                  <img src="/shirt.webp" alt="Recommendation 2" />
                ) : (
                  <div />
                )}
              </div>
              <div className="image">
                {recommendationsLoaded ? (
                  <img src="/shirt.webp" alt="Recommendation 3" />
                ) : (
                  <div />
                )}
              </div>
            </section>
          </div>
        </>
      )}
    </BrowserShell>
  );
}
