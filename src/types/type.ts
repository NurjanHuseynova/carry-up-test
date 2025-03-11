
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
    id:string;
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
      count:number;
      currency:number;
    };
  }
  
  export interface MainSendListProps {
    sends: Send[];
    loading:boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  }

  export interface Trip {
    description: string;
    departure: string;
    arrival: string;
    price: string;
    applyDate: string;
    title: string;
    id:string;
    tripPlaceDetails: {
      fromPlace: string;
      toPlace: string;
      createDate: string;
      toTripDate: string;
      fromTripDate:string;
      travelType:number;
    }[];
    package: {
      price: string;
      currency:number;
    };
  }
  
 export interface MainCarryListProps {
    trips: Trip[];
    loading:boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  }

  export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    activetab:string;
  }