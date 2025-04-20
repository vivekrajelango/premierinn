'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm, FormProvider } from "react-hook-form";

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
      totalRooms: 10,
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
            src="/premier-inn-logo.svg" 
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
                    <select {...register('title', { required: 'Title is required' })} className={`${errors.title ?'!border-red-500 ' : 'border-gray-300'} border w-48 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#4F2D7F] focus:border-transparent`}>
                      <option value="">Select...</option>
                      <option value="mr">Mr</option>
                      <option value="mrs">Mrs</option>
                      <option value="miss">Miss</option>
                      <option value="ms">Ms</option>
                      <option value="dr">Dr</option>
                    </select>
                    {errors.title && <span className="text-red-500 text-xs block mt-1">{errors.title.message}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
                    <input type="text" {...register('firstName', { required: 'First name is required' })} className={`${errors.firstName ? 'border-red-500 ' : 'border-gray-300'} w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4F2D7F] focus:border-transparent`} />
                    {errors.firstName && <span className="text-red-500 text-xs block mt-1">{errors.firstName.message}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
                    <input type="text" {...register('lastName', { required: 'Last name is required' })} className={`${errors.lastName ? 'border-red-500 ' : 'border-gray-300'} w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4F2D7F] focus:border-transparent`} />
                    {errors.lastName && <span className="text-red-500 text-xs block mt-1">{errors.lastName.message}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile number<span className="text-red-500">*</span></label>
                    <input type="text" {...register('mobile', { required: 'Mobile number is required' })} className={`${errors.mobile ? 'border-red-500 ' : 'border-gray-300'} w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4F2D7F] focus:border-transparent`} />
                    {errors.mobile && <span className="text-red-500 text-xs block mt-1">{errors.mobile.message}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email<span className="text-red-500">*</span></label>
                    <input type="text" {...register('email', { required: 'Email is required' })} className={`${errors.email ? 'border-red-500 ' : 'border-gray-300'} w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4F2D7F] focus:border-transparent`} />
                    {errors.email && <span className="text-red-500 text-xs block mt-1">{errors.email.message}</span>}
                  </div>
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
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-1">What type of booker are you? <span className="text-red-500">*</span></label>
                    <div className="flex border border-gray-300 px-3 py-4 items-center space-x-3">
                    <input 
                      type="radio"  
                      value="personal"
                      {...register('bookingType', {
                        required: 'Please select a type of booker before proceeding.'
                      })} 
                       /> 
                      <span>Personal</span>
                      </div>

                      <div className='flex border border-gray-300 px-3 py-4 items-center space-x-3'>
                        <input 
                          type="radio"  
                          value="business"
                          {...register('bookingType', {
                            required: 'Please select a type of booker before proceeding.'
                          })} 
                          />
                          <span> Business</span>
                      </div>

                      <div className='flex border border-gray-300 px-3 py-4 items-center space-x-3'>
                        <input 
                          type="radio"  
                          value="agent"
                          {...register('bookingType', {
                            required: 'Please select a type of booker before proceeding.'
                          })} 
                          />
                          <span>Travel Agent</span>
                      </div>

                      <div className='flex border border-gray-300 px-3 py-4 items-center space-x-3'>
                        <input 
                          type="radio"  
                          value="operator"
                          {...register('bookingType', {
                            required: 'Please select a type of booker before proceeding.'
                          })} 
                          />
                          <span>Travel Operator</span>
                      </div>
                    {errors.bookingType && <span className="text-red-500 text-xs block mt-1">{errors.bookingType.message}</span>}

                    {bookingType !=='personal' && (
                      <div className='mt-5'>
                        <input type="text" {...register('companyName')} placeholder="Company name" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4F2D7F] focus:border-transparent" />
                      </div>
                      )}
                  </div>

                  <div className='!mt-10'>
                    <label className="block text-lg font-semibold text-gray-700 mb-1">Is your group staying for Business or Leisure? <span className="text-red-500">*</span></label>
                    <div className="flex border border-gray-300 px-3 py-4 items-center space-x-3">
                    <input 
                      type="radio"  
                      value="business"
                      {...register('stayType', {
                        required: 'Please select the nature of your stay'
                      })} 
                       /> 
                      <span>Business</span>
                      </div>

                      <div className='flex border border-gray-300 px-3 py-4 items-center space-x-3'>
                        <input 
                          type="radio"  
                          value="leisure"
                          {...register('stayType', {
                            required: 'Please select the nature of your stay'
                          })} 
                          />
                          <span>Leisure</span>
                      </div>
                    {errors.stayType && <span className="text-red-500 text-xs block mt-1">{errors.stayType.message}</span>}
                  </div>
                  
                  <div>
                    <label className="flex flex-row items-start space-x-3 text-sm font-medium text-gray-700">
                      <input type="checkbox" {...register('hasYouth')} className="rounded border-gray-300 text-[#4F2D7F] focus:ring-[#4F2D7F] mt-1" />
                      <span>Please tick this box if you are booking for a school or youth group.</span>
                    </label>
                  </div>

                  <div className='!mt-10'>
                    <label className="block text-lg font-semibold text-gray-700 mb-1">What is the reason for your group's visit?  <span className="text-red-500">*</span></label>
                    <select {...register('reason', { required: 'Please select a reason before proceeding.' })} className={`${errors.reason ?'!border-red-500 ' : 'border-gray-300'} border w-full rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#4F2D7F] focus:border-transparent`}>
                      <option value="">Select a reason</option>
                      <option value="mr">Mr</option>
                      <option value="mrs">Mrs</option>
                      <option value="miss">Miss</option>
                      <option value="ms">Ms</option>
                      <option value="dr">Dr</option>
                    </select>
                    {errors.reason && <span className="text-red-500 text-xs block mt-1">{errors.reason.message}</span>}
                  </div>

                  <div className='!mt-10'>
                    <label className="block text-lg font-semibold text-gray-700 mb-1">Booking details </label>
                    <p className="text-sm leading-5 text-gray-500">Our team will try to accommodate your group’s preferences in terms of hotels and dates. If that’s not possible, we’ll do everything we can to offer the best alternatives.</p>

                    <input type="text" {...register('hotelName', { required: 'Please select the hotel you would like to make a booking.' })} placeholder="Enter a hotel" className="w-full mt-3 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4F2D7F] focus:border-transparent" />
                    {errors.hotelName && <span className="text-red-500 text-xs block mt-1">{errors.hotelName.message}</span>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-in date <span className="text-red-500">*</span></label>
                    <input type="date" {...register('checkIn', { required: 'Check-in date is required' })} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4F2D7F] focus:border-transparent" />
                    {errors.checkIn && <span className="text-red-500 text-xs block mt-1">{errors.checkIn.message}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-out date <span className="text-red-500">*</span></label>
                    <input type="date" {...register('checkOut', { required: 'Check-out date is required' })} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4F2D7F] focus:border-transparent" />
                    {errors.checkOut && <span className="text-red-500 text-xs block mt-1">{errors.checkOut.message}</span>}
                  </div>

                  <div className='!mt-10'>
                    <label className="block text-lg font-semibold text-gray-700 mb-1">Package type <span className="text-red-500">*</span></label>
                    <p className="text-sm leading-5 text-gray-500">Subject to availability. Room only not available for group bookings.</p>
                    
                    <div className="flex border border-gray-300 mt-3 px-3 py-4 items-center space-x-3">
                    <input 
                      type="radio"  
                      value="breakfast"
                      {...register('packageType')} 
                       /> 
                      <span>Premier Inn Breakfast</span>
                      </div>

                      <div className='flex border border-gray-300 px-3 py-4 items-center space-x-3'>
                        <input 
                          type="radio"  
                          value="mealdeal"
                          {...register('packageType',)} 
                          />
                          <span>Meal deal (dinner, drink and breakfast)</span>
                      </div>
                  </div>

                </div>
                <div className="flex mt-4">
                  <button type="button" className="w-full bg-[#00798e] text-white px-6 py-2 rounded" onClick={() => handleContinue('booking')}>Continue</button>
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

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of rooms <span className="text-red-500">*</span></label>
                    <input type="number" min="10" {...register('totalRooms', { required: 'Number of rooms is required', min: { value: 10, message: 'Minimum 10 rooms' } })} className="w-32 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4F2D7F] focus:border-transparent" />
                    {errors.totalRooms && <span className="text-red-500 text-xs block mt-1">{errors.totalRooms.message}</span>}
                  </div> */}

                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <input type="checkbox" {...register('hasChildren')} className="rounded border-gray-300 text-[#4F2D7F] focus:ring-[#4F2D7F]" />
                      <span>Travelling/staying with children (2-15 years).</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <input type="checkbox" {...register('hasAccessibleRoom')} className="rounded border-gray-300 text-[#4F2D7F] focus:ring-[#4F2D7F]" />
                      <span>Accessible room is needed.</span>
                    </label>
                  </div>

                  <div className='!mt-10'>
                    <label className="block text-lg font-medium text-gray-700 mb-1">Additional information (optional)</label>
                    <p className="text-sm leading-5 text-gray-500">Select the maximum number of rooms required by room type and occupancy.</p>
                    <p className="text-sm mt-4 leading-5 text-gray-500">If you do not require the same number of rooms on each night of your stay, please state below the number and type of rooms required each night.</p>
                    <textarea {...register('notes')} rows={4} placeholder="Any special requirements or additional information" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-4 focus:ring-2 focus:ring-[#4F2D7F] focus:border-transparent" />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button type="submit" className="w-full bg-[#00798e] text-white px-6 py-2 rounded">Submit</button>
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