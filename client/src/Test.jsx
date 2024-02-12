import React from 'react';
import { IKContext, IKImage, IKUpload } from 'imagekitio-react';

const publicKey = 'public_sf2BSHg1HDw4TCb9ZrQWCIsh0+g=';
const urlEndpoint = 'https://ik.imagekit.io/uwei6az6zu/';
const authenticator =  async () => {
    try {
        const response = await fetch('http://localhost:3000/auth');

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

const onError = err => {
  console.log("Error", err);
};

const onSuccess = res => {
  console.log("Success", res);
};

function Test() {
  return (
    <div className="App">
      <h1>ImageKit React quick start</h1>
      <IKContext 
        publicKey={publicKey} 
        urlEndpoint={urlEndpoint} 
        authenticator={authenticator} 
      >
        <p>Upload an image</p>
        <IKUpload
          fileName="test-upload.png"
          onError={onError}
          onSuccess={onSuccess}
        />
      </IKContext>
      
    </div>
  );
}

export default Test;