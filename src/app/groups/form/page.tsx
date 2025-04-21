'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm, FormProvider } from "react-hook-form";
import { FormInput } from '@/app/components/FormInput';
import { FormSelect } from '@/app/components/FormSelect';
import { FormRadioGroup } from '@/app/components/FormRadioGroup';
import { FormCheckbox } from '@/app/components/FormCheckbox';
import { FormDate } from '@/app/components/FormDate';
import { RoomSelection } from '@/app/components/RoomSelection';

interface ContactDetails {
  title: string;
  firstName: string;
  lastName: string;
}

interface BookingDetails {
  checkIn: string;
  checkOut: string;
  location: string;
}

interface RoomRequirements {
  totalRooms: number;
  hasChildren: boolean;
  notes: string;
}

type FieldName = "title" | "firstName" | "lastName" | "mobile" | "email" | "bookingType" | "stayType" | "hasYouth" | "reason" | "hotelName" | "companyName" | "checkIn" | "checkOut" | "packageType" | "totalRooms" | "hasChildren" | "hasAccessibleRoom" | "notes";

type bookingType = "business" | "personal" | "agent" | "operator";

export default function GroupBookingForm() {
  const [openSection, setOpenSection] = useState<string>('contact');
  const sectionOrder = ['contact', 'booking', 'rooms'];

  const methods = useForm({
    mode: 'onTouched',
    defaultValues: {
      title: '',
      firstName: '',
      lastName: '',
      mobile:'',
      email:'',
      bookingType: '',
      stayType:'',
      hasYouth: false,
      companyName: '',
      reason: '',
      hotelName: '',
      checkIn: '',
      checkOut: '',
      packageType: 'breakfast',
      singleRooms: 0,
      doubleRooms: 0,
      twinRooms: 0,
      totalRooms: 0,
      hasChildren: false,
      hasAccessibleRoom: false,
      notes: ''
    }
  });
  const { register, handleSubmit, trigger, watch, formState: { errors } } = methods;

  const bookingType = watch('bookingType');

  const handleContinue = async (section: string) => {
    let fields: FieldName[] = [];
    if (section === 'contact') fields = ['title', 'firstName', 'lastName', 'mobile', 'email'];
    if (section === 'booking') fields = ['bookingType', 'stayType', 'hasYouth', 'reason', 'hotelName', 'companyName', 'checkIn', 'checkOut', 'packageType'];
    if (section === 'rooms') fields = ['totalRooms'];
    const valid = await trigger(fields);
    if (valid) {
      const idx = sectionOrder.indexOf(section);
      if (idx < sectionOrder.length - 1) setOpenSection(sectionOrder[idx + 1]);
    }
  };

  const onSubmit = (data: any) => {
    // handle final submission
    console.log('Form data:', data);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <Image 
            src="https://www.premierinn.com/content/dam/pi/websites/desktop/icons/brand/pi-logo-rest-easy.svg" 
            alt="Premier Inn" 
            width={120} 
            height={40}
            priority
          />
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 w-[500px]">
        <h1 className="text-3xl font-bold text-[#4F2D7F] mb-4">Request a group booking</h1>
        <p className="text-gray-600 mb-8">
          Planning a group event and need 10 or more rooms? Fill out the form below! Once we've received your request, our group booking team will be in touch.
        </p>

        <FormProvider {...methods}>
        <form className="max-w-2xl" onSubmit={handleSubmit(onSubmit)}>
          <div className="border overflow-hidden mb-0">
            <button type="button" className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors" onClick={() => setOpenSection(openSection === 'contact' ? '' : 'contact')}>
              <span className="text-lg font-semibold text-gray-500">Contact details</span>
              <svg 
                className={`w-5 h-5 text-gray-500 transform transition-transform ${openSection === 'contact' ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`transition-all duration-300 ${openSection === 'contact' ? 'max-h-[auto] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-4">Your contact details</h3>
                <div className="space-y-2">
                  <FormSelect
                    label="Title"
                    name="title"
                    required
                    options={[
                      { value: "mr", label: "Mr" },
                      { value: "mrs", label: "Mrs" },
                      { value: "miss", label: "Miss" },
                      { value: "ms", label: "Ms" },
                      { value: "dr", label: "Dr" },
                    ]}
                    register={register}
                    error={errors.title}
                  />

                  <FormInput
                    label="First Name"
                    name="firstName"
                    required
                    register={register}
                    error={errors.firstName}
                  />
                  <FormInput
                    label="Last Name"
                    name="lastName"
                    required
                    register={register}
                    error={errors.lastName}
                  />
                  <FormInput
                    label="Mobile number"
                    name="mobile"
                    required
                    register={register}
                    error={errors.mobile}
                  />
                  <FormInput
                    label="Email"
                    name="email"
                    required
                    register={register}
                    error={errors.email}
                  />
                </div>
                <div className="flex mt-4">
                  <button type="button" className="w-full bg-[#00798e] text-white py-3 rounded" onClick={() => handleContinue('contact')}>Continue</button>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="border overflow-hidden mb-0">
            <button type="button" className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors" onClick={() => setOpenSection(openSection === 'booking' ? '' : 'booking')}>
              <span className="text-lg font-semibold text-gray-500">Booking details</span>
              <svg 
                className={`w-5 h-5 text-gray-500 transform transition-transform ${openSection === 'booking' ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`transition-all duration-300 ${openSection === 'booking' ? 'max-h-[auto] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <div className="p-4">
                {/* <h3 className="text-lg font-semibold mb-4">Your booking details</h3> */}
                <div className="space-y-4">
                  <FormRadioGroup
                    label="What type of booker are you?"
                    name="bookingType"
                    required
                    options={[
                      { value: "personal", label: "Personal" },
                      { value: "business", label: "Business" },
                      { value: "agent", label: "Travel Agent" },
                      { value: "operator", label: "Travel Operator" },
                    ]}
                    register={register}
                    error={errors.bookingType}
                  />
                  {bookingType && bookingType !=='personal' && (
                    <div className='mt-5'>
                      <input type="text" {...register('companyName')} placeholder="Company name" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4F2D7F] focus:border-transparent" />
                    </div>
                  )}

                  <div className='!mt-10'>
                    <FormRadioGroup
                      label="Is your group staying for Business or Leisure?"
                      name="stayType"
                      required
                      options={[
                        { value: "business", label: "Business" },
                        { value: "leisure", label: "Leisure" },
                      ]}
                      register={register}
                      error={errors.stayType}
                    />
                  </div>
                  
                  <FormCheckbox
                    label="Please tick this box if you are booking for a school or youth group."
                    name="hasYouth"
                    register={register}
                  />

                  <div className='!mt-10'>
                    <FormSelect
                      label="What is the reason for your group's visit?"
                      name="reason"
                      required
                      options={[
                        { value: "mr", label: "Mr" },
                        { value: "mrs", label: "Mrs" },
                        { value: "miss", label: "Miss" },
                        { value: "ms", label: "Ms" },
                        { value: "dr", label: "Dr" },
                      ]}
                      register={register}
                      error={errors.reason}
                    />
                  </div>

                  <div className='!mt-10'>
                    <label className="block text-lg font-semibold text-gray-700 mb-1">Booking details </label>
                    <p className="text-sm leading-5 text-gray-500 mb-2">Our team will try to accommodate your group’s preferences in terms of hotels and dates. If that’s not possible, we’ll do everything we can to offer the best alternatives.</p>
                    <FormInput
                      label=""
                      name="hotelName"
                      register={register}
                      error={errors.hotelName}
                    />
                    <FormDate
                      label="Check-in date"
                      name="checkIn"
                      className='mt-4'
                      required
                      register={register}
                      error={errors.checkIn}
                      minDate={new Date().toISOString().split('T')[0]} // Sets minimum date to today
                    />
                    <FormDate
                      label="Check-out date"
                      name="checkOut"
                      className='mt-4'
                      required
                      register={register}
                      error={errors.checkOut}
                      minDate={watch('checkIn')} // Makes check-out date dependent on check-in date
                    />
                  </div>
                  

                  <div className='!mt-10'>
                    <label className="block text-lg font-semibold text-gray-700 mb-1">Package type </label>
                    <p className="text-sm leading-5 text-gray-500 mb-4">Subject to availability. Room only not available for group bookings.</p>
                    <FormRadioGroup
                      label=""
                      name="packageType"
                      options={[
                        { value: "breakfast", label: "Premier Inn Breakfast" },
                        { value: "mealdeal", label: "Meal deal (dinner, drink and breakfast)" },
                      ]}
                      register={register}
                      error={errors.packageType}
                    />
                  </div>

                </div>
                <div className="flex mt-4">
                  <button type="button" className="w-full bg-[#00798e] text-white px-6 py-3 rounded" onClick={() => handleContinue('booking')}>Continue</button>
                </div>
              </div>
            </div>
          </div>


          {/* Room Requirements Section */}
          <div className="border overflow-hidden mb-0">
            <button type="button" className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors" onClick={() => setOpenSection(openSection === 'rooms' ? '' : 'rooms')}>
              <span className="text-lg font-semibold text-gray-500">Room requirements</span>
              <svg 
                className={`w-5 h-5 text-gray-500 transform transition-transform ${openSection === 'rooms' ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`transition-all duration-300 ${openSection === 'rooms' ? 'max-h-[auto] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-1">Rooms</label>
                    <p className="text-sm leading-5 text-gray-500">Select the maximum number of rooms required by room type and occupancy.</p>
                    <p className='my-2 underline'>See room types</p>
                  </div>
                  
                  <FormCheckbox
                    label="Travelling/staying with children (2-15 years)."
                    name="hasChildren"
                    register={register}
                  />

                  <FormCheckbox
                    label="Accessible room is needed."
                    name="hasAccessibleRoom"
                    register={register}
                  />

                  <RoomSelection
                    register={register}
                    setValue={methods.setValue}
                    watch={watch}
                  />

                  <div className='!mt-10'>
                    <label className="block text-lg font-medium text-gray-700 mb-1">Additional information (optional)</label>
                    <p className="text-sm leading-5 text-gray-500">Select the maximum number of rooms required by room type and occupancy.</p>
                    <p className="text-sm mt-4 leading-5 text-gray-500">If you do not require the same number of rooms on each night of your stay, please state below the number and type of rooms required each night.</p>
                    <textarea {...register('notes')} rows={4} placeholder="Any special requirements or additional information" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-4 focus:ring-2 focus:ring-[#4F2D7F] focus:border-transparent" />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button type="submit" className="w-full bg-[#00798e] text-white px-6 py-3 rounded">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </form>
        </FormProvider>
      </main>
    </div>
  );
}