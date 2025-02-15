import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
// import styles from '@/assets/css/profileCarryModal/profileCarryModal.module.css'
import '@/assets/css/profileModal/profileModal.css'
import megaphone from '@/assets/img/megaphone.svg'
// import star1 from '@/assets/img/star1.svg'
import Image from 'next/image';

interface CarryModalProps {
    toggle: () => void;  // Function to toggle the modal visibility
    isOpen: boolean;     // Boolean to control if the modal is open
    trip: {
        createdDate: string;
        from: string;
        title: string;
        desc: string;
        price: number;
        count: number;
        currency: string;
        to: string;
        transport: string;
        deadline: string;
    } | null;  // The selected trip or null if no trip is selected
}

function ProfileCarryModal({ toggle, isOpen, trip }: CarryModalProps) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    let { name, surname, email, point } = user;
    let fullname = name + ' ' + surname;



    return (
        <Modal isOpen={isOpen} toggle={toggle} centered size="lg">
            <ModalHeader toggle={toggle}>For Carry Details</ModalHeader>
            <ModalBody>
                <div className={'flexRow alignStart'}>
                    <div className={'flexCol'}>
                        <div className={'flexRow title border'}>
                            <div className={'iconDiv'}>
                                <Image
                                    src={megaphone}
                                    alt={'megaphone'}
                                    className={'icon'}
                                />
                            </div>
                            <span>Elanın başlıq adı: {trip?.title}</span>
                            <div className='currency'>
                                <span>
                                    {trip?.currency === "USD" ? "$" : trip?.currency === "AZN" ? "₼" : ""}
                                </span>
                                <span>{trip?.price}</span>
                            </div>

                        </div>
                        <div className={'details border'}>
                            <h3 className='modal-h3'>Details</h3>
                            <div className={'flexRow parent'}>
                                <div className={'flexRow'}>
                                    <div className={'iconDiv'}>
                                        <Image
                                            src={megaphone}
                                            alt={'megaphone'}
                                            className={'icon'}
                                        />
                                    </div>
                                    <div>
                                        <p className='details-bold'>{trip?.from}</p>
                                        <p className='details-text'>From</p>
                                    </div>
                                </div>
                                <div className={'flexRow'}>
                                    <div className={'iconDiv'}>
                                        <Image
                                            src={megaphone}
                                            alt={'megaphone'}
                                            className={'icon'}
                                        />
                                    </div>
                                    <div>
                                        <p className='details-bold'>{trip?.count}</p>
                                        <p className='details-text'>Count of Documents</p>
                                    </div>
                                </div>
                            </div>
                            <div className={'flexRow parent'}>
                                <div className={'flexRow'}>
                                    <div className={'iconDiv'}>
                                        <Image
                                            src={megaphone}
                                            alt={'megaphone'}
                                            className={'icon'}
                                        />
                                    </div>
                                    <div>
                                        <p className='details-bold'>{trip?.to}</p>
                                        <p className='details-text'>To</p>
                                    </div>
                                </div>
                                <div className={'flexRow'}>
                                    <div className={'iconDiv'}>
                                        <Image
                                            src={megaphone}
                                            alt={'megaphone'}
                                            className={'icon'}
                                        />
                                    </div>
                                    <div>
                                        <p className='details-bold'>{`${trip?.price} ${trip?.currency}`}</p>
                                        <p className='details-text'>Price</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={'userInfo border'}>
                        <div className={'flexRow'}>
                            <div className={'iconDiv'}>
                                <Image
                                    src={megaphone}
                                    alt={'megaphone'}
                                    className={'icon'}
                                />
                            </div>
                            <div>
                                <p className='users-bold'>{fullname || 'N/A'}</p>
                                <p className='users-text'>Name, surname, points</p>
                            </div>
                            <div>
                                <span>{point}⭐</span>
                            </div>
                        </div>
                        <div className={'flexRow'}>
                            <div className={'iconDiv'}>
                                <Image
                                    src={megaphone}
                                    alt={'megaphone'}
                                    className={'icon'}
                                />
                            </div>
                            <div>
                                <p className='users-bold'>{email || 'N/A'}</p>
                                <p className='users-text'>Email adress</p>
                            </div>
                        </div>
                        <div className={'flexRow'}>
                            <div className={'iconDiv'}>
                                <Image
                                    src={megaphone}
                                    alt={'megaphone'}
                                    className={'icon'}
                                />
                            </div>
                            <div>
                                <p className='users-bold'>{trip?.createdDate}</p>
                                <p className='users-text'>Publication date</p>
                            </div>
                        </div>
                        <div className={'flexRow'}>
                            <div className={'iconDiv'}>
                                <Image
                                    src={megaphone}
                                    alt={'megaphone'}
                                    className={'icon'}
                                />
                            </div>
                            <div>
                                <p className='users-bold'>{trip?.deadline}</p>
                                <p className='users-text'>Late date to apply</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'flexRow alignStart'}>
                    <div className={'desc border'}>
                        <h3 className='modal-h3'>Description</h3>
                        <p>{trip?.desc}</p>

                    </div>
                    <div className={'comments border'}>
                        <h3 className='modal-h3'>Points details</h3>

                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
}

export default ProfileCarryModal;
