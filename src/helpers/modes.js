export const APP_STAGES = {
  BLANK: 'blank',
  LOADING: 'loading',
  LOADED_PRODUCT_DETAILS: 'loaded product details',
  LOADED_WITH_USER: 'loaded with user',
  LOADED_WITH_RECOMMENDATIONS: 'loaded with recommendations',
  LOADED_FULL: 'loaded full',
  STREAMED_HEADER: 'streamed header',
  STREAMED_PRODUCT_DETAILS: 'streamed product details',
  STREAMED_HEADER_NOT_LOADED: 'streamed header not loaded',
  STREAMED_PRODUCT_DETAILS_NOT_LOADED: 'streamed product details not loaded',
  STREAMED_RECOMMENDATIONS_NOT_LOADED: 'streamed recommendations not loaded',
};

export function getResourceStageFromTime(resources, time) {
  let currentResourceStage = resources.find(
    (resource) =>
      time >= resource.time && time <= resource.time + resource.duration,
  );

  if (!currentResourceStage)
    currentResourceStage = resources[resources.length - 1];

  let subState = currentResourceStage.subStates
    ? currentResourceStage.subStates.find(
        (state) => time >= state.time && time <= state.time + state.duration,
      )
    : null;

  return subState || currentResourceStage;
}

export function getStateForStage(stage) {
  switch (stage.state) {
    case APP_STAGES.BLANK:
      return {
        blank: true,
        headerLoaded: false,
        productDetailsLoaded: false,
        recommendationsLoaded: false,
      };
    case APP_STAGES.LOADING:
      return {
        blank: false,
        headerLoaded: false,
        productDetailsLoaded: false,
        recommendationsLoaded: false,
      };
    case APP_STAGES.LOADED_PRODUCT_DETAILS:
      return {
        blank: false,
        headerLoaded: false,
        productDetailsLoaded: true,
        recommendationsLoaded: false,
      };
    case APP_STAGES.LOADED_WITH_USER:
      return {
        blank: false,
        headerLoaded: true,
        productDetailsLoaded: true,
        recommendationsLoaded: false,
      };
    case APP_STAGES.LOADED_WITH_RECOMMENDATIONS:
      return {
        blank: false,
        headerLoaded: false,
        productDetailsLoaded: true,
        recommendationsLoaded: true,
      };
    case APP_STAGES.LOADED_FULL:
      return {
        blank: false,
        headerLoaded: true,
        productDetailsLoaded: true,
        recommendationsLoaded: true,
      };
    case APP_STAGES.STREAMED_HEADER:
      return {
        blank: false,
        headerLoaded: true,
        productDetailsHidden: true,
        recommendationsHidden: true,
        productDetailsLoaded: false,
        recommendationsLoaded: false,
      };
    case APP_STAGES.STREAMED_PRODUCT_DETAILS:
      return {
        blank: false,
        headerLoaded: true,
        productDetailsHidden: false,
        recommendationsHidden: true,
        productDetailsLoaded: true,
        recommendationsLoaded: false,
      };

    case APP_STAGES.STREAMED_HEADER_NOT_LOADED:
      return {
        blank: false,
        headerLoaded: false,
        productDetailsHidden: true,
        recommendationsHidden: true,
        productDetailsLoaded: false,
        recommendationsLoaded: false,
      };
    case APP_STAGES.STREAMED_PRODUCT_DETAILS_NOT_LOADED:
      return {
        blank: false,
        headerLoaded: false,
        productDetailsHidden: false,
        recommendationsHidden: true,
        productDetailsLoaded: false,
        recommendationsLoaded: false,
      };
    case APP_STAGES.STREAMED_RECOMMENDATIONS_NOT_LOADED:
      return {
        blank: false,
        headerLoaded: false,
        productDetailsHidden: false,
        recommendationsHidden: false,
        productDetailsLoaded: false,
        recommendationsLoaded: false,
      };
  }

  return {
    blank: true,
    headerLoaded: false,
    productDetailsLoaded: false,
    recommendationsLoaded: false,
  };
}

export const MODES = [
  {
    name: 'Client Side Rendering',
    description:
      'Traditional "single page app" where all rendering happens on the client. Perceived performance is limited. Bots cannot read markup without executing JavaScript.',
    resources: [
      {
        label: 'index.html',
        message: 'The server hosts out a blank page.',
        time: 0,
        duration: 75,
        state: APP_STAGES.BLANK,
      },
      {
        label: 'script.js',
        message:
          'All JavaScript has to load before meaningful content is shown.',
        time: 75,
        duration: 75,
        state: APP_STAGES.BLANK,
      },
      {
        label: 'data.json',
        message: 'Data requested can be unique per user and very dynamic.',
        time: 150,
        duration: 100,
        state: APP_STAGES.LOADING,
      },
      {
        time: 250,
        state: APP_STAGES.LOADED_FULL,
      },
    ],
  },
  {
    name: 'Server Side Rendering',
    description:
      'The first response from the server includes meaningful content. Takes longer to return the initial server response.',
    resources: [
      {
        label: 'index.html',
        message:
          'Nothing is shown to the user while the server renders the page',
        time: 0,
        duration: 150,
        state: APP_STAGES.BLANK,
      },
      {
        label: 'script.js',
        message:
          'Scripts must download and execute before any of the page is interactive',
        time: 150,
        duration: 75,
        state: APP_STAGES.LOADED_FULL,
      },
      {
        time: 225,
        duration: 100,
        state: APP_STAGES.LOADED_FULL,
      },
    ],
  },
  {
    name: 'Partial Server Side Rendering',
    description:
      'Rendering everything on the server is hard to scale. If, for example, personalized content renders in the client, the server response can be cached more easily.',
    resources: [
      {
        label: 'index.html',
        message:
          'Nothing is shown to the user while the server renders the page',
        time: 0,
        duration: 150,
        state: APP_STAGES.BLANK,
      },
      {
        label: 'script.js',
        message:
          'Scripts must download and execute before any of the page is interactive',
        time: 150,
        duration: 75,
        state: APP_STAGES.LOADED_PRODUCT_DETAILS,
      },
      {
        label: 'data.json',
        message:
          'Request extra data necessary to render the cart and recommendations on the client',
        time: 225,
        duration: 75,
        state: APP_STAGES.LOADED_PRODUCT_DETAILS,
      },
      {
        time: 300,
        duration: 100,
        state: APP_STAGES.LOADED_FULL,
      },
    ],
  },
  {
    name: 'Streaming Server Side Rendering',
    description:
      'Immediately stream content that is meaningful. The page progressively loads as the server streams the content.',
    resources: [
      {
        label: 'index.html',
        message:
          'Nothing is shown to the user while the server starts rendering the page',
        time: 0,
        duration: 150,
        state: APP_STAGES.BLANK,
        subStates: [
          {
            label: 'index.html',
            time: 25,
            duration: 25,
            state: APP_STAGES.STREAMED_HEADER,
          },
          {
            label: 'index.html',
            time: 50,
            duration: 50,
            state: APP_STAGES.STREAMED_PRODUCT_DETAILS,
          },
          {
            label: 'index.html',
            time: 100,
            duration: 50,
            state: APP_STAGES.LOADED_FULL,
          },
        ],
      },
      {
        label: 'script.js',
        message:
          'Scripts must download and execute before any of the page is interactive',
        time: 150,
        duration: 75,
        state: APP_STAGES.LOADED_FULL,
      },
      {
        time: 225,
        duration: 100,
        state: APP_STAGES.LOADED_FULL,
      },
    ],
  },

  {
    name: 'React Suspense with Server Components',
    description:
      'Immediately stream content that is meaningful. The page progressively loads as the server streams the content. The app can progressively hydrate, and become interactive before the entire page has downloaded. Note the components fully load out of order.',
    resources: [
      {
        label: 'index.html',
        message:
          'As the app loads, it also progressively hydrates becomes interactive',
        time: 0,
        duration: 150,
        state: APP_STAGES.BLANK,
        subStates: [
          {
            label: 'index.html',
            time: 25,
            duration: 20,
            state: APP_STAGES.STREAMED_HEADER_NOT_LOADED,
          },
          {
            label: 'index.html',
            time: 45,
            duration: 20,
            state: APP_STAGES.STREAMED_PRODUCT_DETAILS_NOT_LOADED,
          },
          {
            label: 'index.html',
            time: 65,
            duration: 20,
            state: APP_STAGES.STREAMED_RECOMMENDATIONS_NOT_LOADED,
          },
          {
            label: 'index.html',
            time: 85,
            duration: 30,
            state: APP_STAGES.LOADED_PRODUCT_DETAILS,
          },
          {
            label: 'index.html',
            time: 115,
            duration: 35,
            state: APP_STAGES.LOADED_WITH_USER,
          },
        ],
      },
      {
        time: 150,
        duration: 100,
        state: APP_STAGES.LOADED_FULL,
      },
    ],
  },
];
