/** Api Fetch V 2.0.1 by Phoxer.com */
const buildDataToSend = data => {
    const formData = new FormData();
    const createFormData = (obj, namespace = '') => {
      let formKey;
      if(typeof obj !== 'object'){
        formData.append(namespace, obj);
      }else{
          for (let prop in obj) {
            formKey = namespace ? `${namespace}[${prop}]` : prop;
            if(typeof obj[prop] === 'object'){
              if (obj[prop] instanceof Array) {
                // eslint-disable-next-line no-loop-func
                obj[prop].forEach((element, index) =>{
                  createFormData(element, `${formKey}[${index}]`,true)
                });
              }else if (obj[prop] instanceof Date) {
                formData.append(formKey, obj[prop].toISOString());
              }else if (obj[prop] instanceof File) {
                formData.append(formKey, obj[prop]);
              }else{
                createFormData(obj[prop],formKey);
              }
            }else{
              if(obj[prop]!==undefined){
                formData.append(formKey, obj[prop]);
              } 
            }
        }
      }
    };
    createFormData(data);
    return formData;
};

const serverCall = async (url, config, type) => {
    return await fetch(url, config).then((rsp) => {
        if(type === 'text'){
          console.log('tex',rsp);
          return rsp.text();
        }
        return rsp.json();
    }).then((data) => {
        return data;
    }).catch((error) => {
        return { error: error.message };
    });
};

const fetchData = {
    get: async (endPoint, data = null) => {
      const urlParams = data ? `${endPoint}?${new URLSearchParams(data).toString()}` : endPoint;
      return await serverCall(urlParams, {
        method: 'GET',
        credentials: 'same-origin'
      });
    },
    post: async (endPoint, data) => {
        return await serverCall(endPoint, {
          method: 'POST',
          credentials: 'same-origin',
          body: buildDataToSend(data)
        });
    },
    json: async (url) =>{
      return await serverCall(url, {
        method: 'GET',
        credentials: 'same-origin'
      });
    },
    text: async (url) =>{
      return await serverCall(url, {
        method: 'GET',
        credentials: 'same-origin'
      }, 'text');
    }
}

export default fetchData;