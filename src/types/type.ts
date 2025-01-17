
import { ChangeEvent } from "react";

export interface FormData {
    createDate: string;
    title: string;
    travelType: string;
    minPrice: string;
    maxPrice: string;
    category: string;
    fromPlace: string;
    toPlace: string;
    fromTripDate: string;
    toTripDate: string;
    currency: string;
  }

  export interface SendFormData {
    createDate: string;
    title: string;
    minPrice: string;
    maxPrice: string;
    category: string;
    fromPlace: string;
    toPlace: string;
    currency: string;
    catchDate:string;
  }

  export interface CarrySidebarProps {
    handleSubmit: (event: React.FormEvent) => void;
    handleInputChange: (
      event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
    formData: Record<string, any>;
    fetchTrips: (currentPage: number) => void;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    clearForm: () => void;
    tripCurrentPage: number;
  }

  export interface SendSidebarProps {
    handleSubmit: (event: React.FormEvent) => void;
    handleInputChange: (
      event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
    sendFormData: Record<string, any>;
    fetchSends: (currentPage: number) => void;
    setSendFormData: React.Dispatch<React.SetStateAction<SendFormData>>;
    sendClearForm: () => void;
    sendCurrentPage: number;
  }

  export interface Send {
    description: string;
    departure: string;
    arrival: string;
    price: string;
    applyDate: string;
    title: string;
    sendPlaceDetails: {
      fromPlace: string;
      toPlace: string;
      createDate: string;
      toTripDate: string;
      catchDate:string;
      id:string;
      sendId:string;
    }[];
    package: {
      price: string;
    };
  }
  
  export interface MainSendListProps {
    sends: Send[];
  }

  export interface Trip {
    description: string;
    departure: string;
    arrival: string;
    price: string;
    applyDate: string;
    title: string;
    tripPlaceDetails: {
      fromPlace: string;
      toPlace: string;
      createDate: string;
      toTripDate: string;
    }[];
    package: {
      price: string;
    };
  }
  
 export interface MainCarryListProps {
    trips: Trip[];
  }

  export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    activetab:string;
  }