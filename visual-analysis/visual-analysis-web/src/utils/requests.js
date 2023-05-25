import axios from "axios";

const getDomain = () => {
  let domain = process.env.REACT_APP_REQUEST_DOMAIN;
  if (domain === undefined) {
    domain = "172.26.131.39";
  }
  return domain;
};

export const sendRequest = (endpoint, params = null) => {
  let domain = getDomain();
  return axios.get(`http://${domain}:8000/api/v1${endpoint}`, {
    params: params,
  });
};
