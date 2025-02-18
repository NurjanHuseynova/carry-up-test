import React, { useEffect, useState } from 'react'
import styles from '@/assets/css/profile/profileCarryList.module.css'
import Image from 'next/image';
import brush from "@/assets/img/brush.svg";
import trash from "@/assets/img/trash.svg";
import toast from 'react-hot-toast';
import { formatDate } from '@/utils/formatDate';
import Pagination from '../Pagination/Pagination';
import ProfileSendModal from '../ProfileModal/ProfileSendModal';
import { mapCurrencyType } from '@/utils/enumsToData';
import { deleteApi, postApi } from '@/services/api';
import { useRouter } from 'next/navigation';
import SendModal from '../Modal/SendModal';

interface MySends {
  id: number;
  catchDate: string;
  title: string;
  desc: string;
  createdDate: string;
  price: number;
  count: number;
  currency: string;
  from: string;
  to: string;
  deadline: string;
}

function SendList() {
  const [sends, setSends] = useState<MySends[]>([]);
  const [selectedSend, setSelectedSend] = useState<MySends | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    fetchSends(currentPage);
  }, [currentPage]);

  const handleRowClick = (send: MySends) => {
    setSelectedSend(send);
    toggleModal();
  };

  const handleEdit = (e: React.MouseEvent, tripId: number) => {
    e.stopPropagation(); // Prevent row click event
    router.push(`/edit-send?id=${tripId}`);
  };

  const handleDelete = async (id: number) => {
    // const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    // if (!confirmDelete) return;

    setIsLoading(true);

    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log(accessToken);

      if (!accessToken) {
        toast.error("User credentials is missing.");
        setIsLoading(false);
        return;
      }

      const resData = await deleteApi(`Send/Delete/${id}`, accessToken);


      if (resData?.errors && resData?.errors.length > 0) {
        resData?.errors.forEach((error: string) => {
          toast.error(error);
        });
        return;
      }

      if (resData?.success) {
        toast.success("Item deleted successfully.");
      }


      // Remove the deleted trip from the state
      setSends((prevSends) => prevSends.filter((send) => send.id !== id));
    }
    catch (error: any) {
      toast.error("Error deleting item: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }


  async function fetchSends(page: number) {
    setIsLoading(true);

    try {
      let userId = JSON.parse(localStorage.getItem('user') || "")?.id;
      console.log(userId);
      const accessToken = localStorage.getItem('accessToken');

      if (!userId || !accessToken) {
        setIsLoading(false);

        toast.error("User credentials is missing.");
        return;
      }

      let payload = {
        pageSize: 7,
        currentPage: page,
        value: {
          userId: userId
        }
      }


      const responseData = await postApi(`Send/GetSendsByUserId`, payload, accessToken);

      // console.log('Response: ', responseData);

      if (responseData?.list) {
        const mappedSends = responseData.list.map((send: any) => {
          const details = send.sendPlaceDetails[0] || {};
          return {
            id: send.id,
            catchDate: formatDate(details.catchDate),
            title: send.title,
            desc: send.description,
            createdDate: formatDate(send.createDate),
            price: send.package.price,
            count: send.package.count,
            currency: mapCurrencyType(send.package.currency),
            from: details.fromPlace || "N/A",
            to: details.toPlace || "N/A",
            deadline: formatDate(send.package?.deadline || "N/A"),
          };
        });

        setSends(mappedSends);
        setTotalPages(Math.ceil(responseData.totalCount / payload.pageSize));

      } else {
        setSends([]);

        toast.error("No sends found.");
      }
    } catch (error: any) {
      toast.error('Error fetching sends: ' + error)
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className={styles.container}
      style={{
        justifyContent: isLoading ? 'center' : '', // Deactivate justify-content when loading
        alignItems: isLoading ? 'center' : '', // Deactivate justify-content when loading
      }}>
      {isLoading ? (
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 animate-spin  fill-purple-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr >
                <th>Catch date</th>
                <th>Created date</th>
                <th>From</th>
                <th>To</th>
                <th>Deadline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sends.length != 0 ? sends?.map((send, i) => (
                <tr key={i} onClick={() => handleRowClick(send)}>
                  <td>{send.catchDate}</td>
                  <td>{send.createdDate}</td>
                  <td>{send.from}</td>
                  <td>{send.to}</td>
                  <td>{send.deadline}</td>
                  <td>
                    <button
                      title="Edit"
                      onClick={(e) => handleEdit(e, send.id)}
                    >
                      <Image
                        src={brush}
                        className={""}
                        alt={'edit'}
                      />
                    </button>
                    <button
                      title="Delete"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the row click handler
                        handleDelete(send.id);
                      }}
                    >
                      <Image
                        src={trash}
                        className={""}
                        alt={'delete'}
                      />
                    </button>
                  </td>
                </tr>
              )) :
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center' }}>
                    No information available.
                  </td>
                </tr>
              }
            </tbody>
          </table>
          {sends.length > 0 && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page: number) => setCurrentPage(page)}
              activetab="carry"
            />)}
        </>
      )
      }
      {/* {isModalOpen && <SendModal toggle={toggleModal} isOpen={isModalOpen} setModal={setIsModalOpen} detailList={selectedSend}/>} */}
    </div >
  )
}

export default SendList
