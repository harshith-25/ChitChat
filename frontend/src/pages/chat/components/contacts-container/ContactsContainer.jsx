import { lazy, Suspense, useEffect } from 'react'
import { apiClient } from '@/lib/api-client';
import { GET_DM_CONTACTS_ROUTES, GET_USER_CHANNELS_ROUTE } from '@/utils/constants';
import { useAppStore } from '@/store/Index';
import Logo from '@/utils/Logo';
import HypnoticLoader from '@/utils/HypnoticLoader';
const ProfileInfo = lazy(() => import('./components/profile-info/ProfileInfo'));
const NewDm = lazy(() => import('./components/new-dm/NewDm'));
const CreateChannel = lazy(() => import('./components/create-channel/CreateChannel'));
const ContactList = lazy(() => import('@/components/ContactList'));

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
    <Suspense fallback={<HypnoticLoader />}>
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
    </Suspense>
  )
}

export default ContactsContainer;

function Title({ text }) {
  return (
    <h6 className='uppercase tracking-widest text-neutral-400 pl-10 font-light top-opacity-90 text-sm'>{text}</h6>
  )
}