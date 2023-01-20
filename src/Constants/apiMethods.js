import { toast } from "react-toastify";

const baseURL = "http://localhost:3005/";

export const Get = (Url, token, data) => {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        data ? `${baseURL}${Url}${data}` : `${baseURL}${Url}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          method: "GET",
        }
      ).then((res) => res.json());
      if (response.success) {
        resolve(response);
      } else {
        reject(response);
        if (response.statusCode == 401) {
          return (window.location.href = "/#/login");
        }
      }
    } catch (error) {
      toast.error(error.mesage);
    }
  });
};

export const Post = (Url, token, data) => {
  console.log(data)

  return new Promise(async (resolve, reject) => {
    try {
      
      const response = await fetch(`${baseURL}${Url}`, {
        body: data ? JSON.stringify(data) : "",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        method: "POST",
      }).then((res) => res.json());
      if (response.statusCode === 201) {
        resolve(response);
      } else {
        
        reject(response);
      }
    } catch (error) {
      
      toast.error(error.message);
    }
  });
};

export const Post2 = (Url, token, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${baseURL}${Url}`, {
        body: data ? data : "",
        headers: {
          Accept: "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        method: "POST",
      }).then((res) => res.json());
      if (response.success) {
        resolve(response);
      } else {
        reject(response);
      }
    } catch (error) {
      toast.error(error.mesage);
    }
  });
};

export const Put = (Url, data, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${baseURL}${Url}`, {
        body: data ? JSON.stringify(data) : "",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token ? token : "",
        },
        method: "PUT",
      }).then((res) => res.json());
      if (response.statusCode === 201) {
        resolve(response);
      } else {
        reject(response);
      }
    } catch (error) {
      toast.error(error.mesage);
    }
  });
};

export const Delete = (Url, token, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${baseURL}${Url}`, {
        body: data ? JSON.stringify(data) : "",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token ? token : "",
        },
        method: "DELETE",
      }).then((res) => res.json());
      if (response.success) {
        resolve(response);
      } else {
        reject(response);
      }
    } catch (error) {
      toast.error(error.mesage);
    }
  });
};

export const Delete2 = (Url, token, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        data ? `${baseURL}${Url}${data}` : `${baseURL}${Url}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          method: "DELETE",
        }
      ).then((res) => res.json());
      if (response.success) {
        resolve(response);
      } else {
        reject(response);
        if (response.statusCode == 401) {
          window.location.href = "/#/login";
        }
      }
    } catch (error) {
      toast.error(error.mesage);
    }
  });
};
