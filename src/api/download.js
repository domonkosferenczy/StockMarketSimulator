const serverAPI = "http://localhost:3000/api/";

export const downloadReport = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ history: { data } }),
  };
  console.log(data);
  const response = await fetch(`${serverAPI}downloadReport`, requestOptions);
  const json = await response.json();

  downloadFile(json.fileName);
};

const downloadFile = (fileName) => {
  const link = document.createElement("a");
  link.href = `${serverAPI}download/${fileName}`;
  link.setAttribute("download", fileName);
  link.click();
};
