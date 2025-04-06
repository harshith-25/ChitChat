import { lazy, Suspense, useEffect } from 'react'
import { useAppStore } from '@/store/Index'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import HypnoticLoader from '@/utils/HypnoticLoader';
const ContactsContainer = lazy(() => import('./components/contacts-container/ContactsContainer'));
const EmptyChatContainer = lazy(() => import('./components/empty-chat-container/EmptyChatContainer'));
const ChatContainer = lazy(() => import('./components/chat-container/ChatContainer'));

function Chat() {
	const { userInfo, selectedChatType, isUploading, isDownloading, fileUploadProgress, fileDownloadProgress } = useAppStore();
	const navigate = useNavigate();

	useEffect(() => {
		if (!userInfo.profileSetup) {
			toast('Please setup profile to continue.');
			navigate('/profile');
		}
	}, [userInfo, navigate]);

	return (
		<Suspense fallback={<HypnoticLoader />}>
			<div className='flex h-[100vh] text-white overflow-hidden'>
				{
					isUploading && <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg">
						<h5 className='text-5xl animate-pulse'>Uploading Files</h5>
						{fileUploadProgress}%
					</div>
				}
				{
					isDownloading && <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg">
						<h5 className='text-5xl animate-pulse'>Downloading Files</h5>
						{fileDownloadProgress}%
					</div>
				}
				<ContactsContainer />
				{
					selectedChatType === undefined ? (
						<EmptyChatContainer />
					) : (
						<ChatContainer />
					)
				}
			</div>
		</Suspense>
	)
}

export default Chat;