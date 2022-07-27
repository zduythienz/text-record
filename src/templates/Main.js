import React from 'react';

import Navbar from '../components/Navbar';


const Main = (props) => (
  <div className="relative">
    <Navbar />
    <div className="w-full bg-slate-200 md:bg-slate-50 px-0 md:px-1 antialiased">

      <div className="mx-auto">
        <div className="py-5">{props.children}</div>
      </div>
    </div>
  </div>
);

export { Main };
