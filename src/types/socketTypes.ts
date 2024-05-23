export type INITIAL_STATE = {
  vid_url: string;
  image_url: string;
  code_async: any;
  code_evaulated: any;
  connected: boolean;
  pending: boolean;
  vid_url_fetching: boolean;
  image_url_fetching: boolean;
};
export type INIT = {
  username: string;
  assessment_type: string;
  assessment_id: string;
};

export type PROCTOR_INIT = {
  assessmentId: string;
  assessmentType: string;
  metaData: {
    fingerprint: {
      id: string;
      components: {
        browser: any; // for backward compatibility with central
      };
    };
  };
  token: string;
};

export type CODE_ASYNC_RESPONSE = {
  cputime: string;
  description: string;
  evaluation_ended: string;
  evaluation_started: string;
  log: string;
  memory_usage: string;
  output: string;
  running_time: string;
  sid: string;
  sockmeta: {
    connid: string;
    wid: string;
    sockid: string;
  };
  status: string;
};
