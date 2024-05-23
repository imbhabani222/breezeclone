/* eslint-disable */
const URLS: any = {
  development: {
    API: {
      BaseURL: "https://central.dev.sg1.chsh.in",
      retryCodes: [502, 401, 500, 403],
    },
  },
  qa: {
    API: {
      BaseURL: "",
    },
  },
  stage: {
    API: {
      BaseURL: "",
    },
  },
  production: {
    API: {
      BaseURL: "",
    },
  },
};

export default URLS;
