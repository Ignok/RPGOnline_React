import { BlobServiceClient } from "@azure/storage-blob";
import { makeRequest } from "../../services/makeRequest";

async function getSasToken(uId) {
  return await makeRequest(`Posts/BlobToken/${uId}`, {
    method: "GET",
    withCredentials: true,
  });
}


async function createBlobInContainer (file, uId) {

  return await getSasToken(uId).then(async (res) => {
    const uploadUrl = `https://${res.storageAccountName}.blob.core.windows.net/?${res.sasToken}`;
    const blobService = new BlobServiceClient(uploadUrl);
    const containerClient = blobService.getContainerClient(res.containerName);
    const blobClient = containerClient.getBlockBlobClient(file.name);
    const options = { blobHTTPHeaders: { blobContentType: file.type } };

    return await blobClient.uploadData(file, options).then(res => res);
  })
};


const uploadFileToBlob = async (file, uId) => {
  if (!file || !uId) return;
  return await createBlobInContainer(file, uId).then(res => res);
};


export default uploadFileToBlob;