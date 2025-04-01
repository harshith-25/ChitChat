import React, { useEffect } from 'react'
import ProfileInfo from './components/profile-info/ProfileInfo';
import NewDm from './components/new-dm/NewDm';
import { apiClient } from '@/lib/api-client';
import { GET_DM_CONTACTS_ROUTES } from '@/utils/constants';

function ContactsContainer() {
  useEffect(() => {
    async function getContacts() {
      const response = await apiClient.get(GET_DM_CONTACTS_ROUTES, {withCredentials: true});
      if(response.data.contacts) {
        console.log(response.data.contacts);
      }
    };
    
    getContacts();
  }, [])
  return (
    <aside className='relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full'>
        <div className="p-3">
          <Logo />
        </div>
        <div className="my-5">
          <div className="flex items-center justify-between pr-10 cursor-pointer">
            <Title text='Direct Messages' />
            <NewDm />
          </div>
        </div>
        <div className="my-5">
          <div className="flex items-center justify-between pr-10 cursor-pointer">
            <Title text='Channels' />
          </div>
        </div>
        <ProfileInfo />
      </aside>
  )
}

export default ContactsContainer;

function Logo() {
  return (
    <div className="flex p-5  justify-start items-center gap-2">
      <svg
        id="logo-38"
        width="78"
        height="32"
        viewBox="0 0 78 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <path
          d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z"
          className="ccustom"
          fill="#8338ec"
        ></path>{" "}
        <path
          d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z"
          className="ccompli1"
          fill="#975aed"
        ></path>{" "}
        <path
          d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z"
          className="ccompli2"
          fill="#a16ee8"
        ></path>{" "}
      </svg>
      <span className="text-3xl font-semibold ">Syncronus</span>
    </div>
  );
};

function Title({ text }) {
  return (
    <h6 className='uppercase tracking-widest text-neutral-400 pl-10 font-light top-opacity-90 text-sm'>{text}</h6>
  )
}