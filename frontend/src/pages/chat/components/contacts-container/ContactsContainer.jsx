import React, { useEffect } from 'react'
import ProfileInfo from './components/profile-info/ProfileInfo';
import NewDm from './components/new-dm/NewDm';
import { apiClient } from '@/lib/api-client';
import { GET_DM_CONTACTS_ROUTES, GET_USER_CHANNELS_ROUTE } from '@/utils/constants';
import { useAppStore } from '@/store/Index';
import ContactList from '@/components/ContactList';
import CreateChannel from './components/create-channel/CreateChannel';
import Logo from '@/utils/Logo';

function ContactsContainer() {
  const { setDirectMessagesContacts, directMessagesContacts, channels, setChannels } = useAppStore();
  useEffect(() => {
    async function getContacts() {
      const response = await apiClient.get(GET_DM_CONTACTS_ROUTES, { withCredentials: true });
      if (response.data.contacts) {
        setDirectMessagesContacts(response.data.contacts);
      }
    };

    async function getChannels() {
      const response = await apiClient.get(GET_USER_CHANNELS_ROUTE, { withCredentials: true });
      if (response.data.channels) {
        setChannels(response.data.channels);
      }
    };

    getContacts();
    getChannels();
  }, [setChannels, setDirectMessagesContacts]);
  
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
        <div className="max-h-[30vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={directMessagesContacts} />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10 cursor-pointer">
          <Title text='Channels' />
          <CreateChannel />
        </div>
        <div className="max-h-[30vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={channels} isChannel={true} />
        </div>
      </div>
      <ProfileInfo />
    </aside>
  )
}

export default ContactsContainer;

function Title({ text }) {
  return (
    <h6 className='uppercase tracking-widest text-neutral-400 pl-10 font-light top-opacity-90 text-sm'>{text}</h6>
  )
}