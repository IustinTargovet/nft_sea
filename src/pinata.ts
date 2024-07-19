import axios from 'axios';
import FormData from 'form-data';

const JWT = process.env.NEXT_PUBLIC_PINATA_JWT; // Read from environment variable

export const pinFileToIPFS = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const pinataMetadata = JSON.stringify({
    name: file.name,
  });
  formData.append('pinataMetadata', pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append('pinataOptions', pinataOptions);

  try {
    const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      maxBodyLength: 100000,
      headers: {
        'Content-Type': `multipart/form-data; boundary=${(formData as any)._boundary}`,
        Authorization: `Bearer ${JWT}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error uploading file to IPFS:', error);
    throw error;
  }
};

export const pinJSONToIPFS = async (json: object) => {
  const jsonData = JSON.stringify(json);

  try {
    const res = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', jsonData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWT}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error uploading JSON to IPFS:', error);
    throw error;
  }
};
