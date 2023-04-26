import React from 'react';



function App() {
  return (
   <h1>Fuck my ass with 5 blck dicks</h1>
  )
}


const user = {
  name: 'Ronnie Coleman',
  imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/mh-3-23-coleman-1648059910.png?crop=0.5xw:1xh;center,top&resize=1200:*',
  imageSize: 500,
};

export default function  Profile() {
  return (
      <>
        <h1>{user.name}</h1>
        <img
            className="avatar"
            src={user.imageUrl}
            alt={'Photo of ' + user.name}
            style={{
              width: user.imageSize,
              height: user.imageSize
            }}
        />
      </>
  );
}

